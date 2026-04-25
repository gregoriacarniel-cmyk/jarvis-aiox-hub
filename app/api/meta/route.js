import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'insights';
  const accountId = searchParams.get('accountId');
  const campaignId = searchParams.get('campaignId');
  const datePreset = searchParams.get('datePreset') || 'today';
  const token = process.env.META_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json({ error: 'Token ausente' }, { status: 400 });
  }

  try {
    const API_VERSION = 'v25.0'; // Upgrade para a versão mais estável

    // 1. LISTAR CONTAS DE ANÚNCIOS
    if (type === 'accounts') {
      const res = await fetch(`https://graph.facebook.com/${API_VERSION}/me/adaccounts?fields=name,id&access_token=${token}`);
      const data = await res.json();
      return NextResponse.json(data);
    }

    // 2. LISTAR CAMPANHAS DE UMA CONTA
    if (type === 'campaigns' && accountId) {
      const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${accountId}/campaigns?fields=name,status&limit=50&access_token=${token}`);
      const data = await res.json();
      return NextResponse.json(data);
    }

    // 3. BUSCAR INSIGHTS DETALHADOS (MAPEAMENTO SUPREMO V25)
    if (type === 'insights' && accountId) {
      const targetId = campaignId || accountId;
      
      // Insights de Adsets com granularidade máxima
      const url = `https://graph.facebook.com/${API_VERSION}/${targetId}/insights?fields=adset_id,adset_name,spend,reach,frequency,cpm,ctr,cpc,actions,action_values,purchase_roas&level=adset&date_preset=${datePreset}&access_token=${token}`;
      
      const res = await fetch(url);
      const rawData = await res.json();

      if (rawData.error) throw new Error(rawData.error.message);

      let totalSpend = 0;
      let totalSalesCount = 0;
      let totalSalesValue = 0;
      let totalCarts = 0;
      let totalCheckouts = 0;
      let totalReach = 0;
      let totalFreq = 0;

      const adsets = (rawData.data || []).map(ad => {
        const spend = parseFloat(ad.spend || 0);
        
        // Mapeamento de Vendas (Purchase)
        const sales = parseInt(ad.actions?.find(a => 
          a.action_type === 'purchase' || 
          a.action_type === 'offsite_conversion.fb_pixel_purchase' ||
          a.action_type === 'onsite_conversion.fb_pixel_purchase'
        )?.value || 0);

        // Mapeamento de Valor de Venda (Revenue)
        const revenue = parseFloat(ad.action_values?.find(a => 
          a.action_type === 'purchase' || 
          a.action_type === 'offsite_conversion.fb_pixel_purchase' ||
          a.action_type === 'onsite_conversion.fb_pixel_purchase'
        )?.value || 0);

        // Checkouts e Carts
        const checkouts = parseInt(ad.actions?.find(a => 
          a.action_type === 'initiate_checkout' || 
          a.action_type === 'offsite_conversion.fb_pixel_initiate_checkout'
        )?.value || 0);

        const carts = parseInt(ad.actions?.find(a => 
          a.action_type === 'add_to_cart' || 
          a.action_type === 'offsite_conversion.fb_pixel_add_to_cart'
        )?.value || 0);

        totalSpend += spend;
        totalSalesCount += sales;
        totalSalesValue += revenue;
        totalCarts += carts;
        totalCheckouts += checkouts;
        totalReach += parseInt(ad.reach || 0);
        totalFreq += parseFloat(ad.frequency || 0);

        return {
          name: ad.adset_name || `Conjunto ${ad.adset_id}`,
          status: 'ACTIVE', // Insights só vêm de adsets ativos ou com gasto
          spend: spend,
          sales: sales,
          salesValue: revenue,
          roas: spend > 0 ? (revenue / spend).toFixed(2) : "0.00",
          cpa: sales > 0 ? (spend / sales).toFixed(2) : "0.00",
          ctr: parseFloat(ad.ctr || 0).toFixed(2) + "%",
          cpm: parseFloat(ad.cpm || 0).toFixed(2)
        };
      });

      const avgFrequency = adsets.length > 0 ? (totalFreq / adsets.length).toFixed(2) : "0.00";

      return NextResponse.json({
        metrics: {
          spend: totalSpend,
          sales: totalSalesCount,
          salesValue: totalSalesValue,
          roas: totalSpend > 0 ? (totalSalesValue / totalSpend) : 0,
          cpa: totalSalesCount > 0 ? (totalSpend / totalSalesCount).toFixed(2) : "0.00",
          totalCheckouts: totalCheckouts,
          totalCarts: totalCarts,
          totalReach: totalReach,
          avgFrequency: avgFrequency
        },
        adsets: adsets
      });
    }

    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
