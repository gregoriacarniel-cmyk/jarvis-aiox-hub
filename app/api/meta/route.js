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
    // 1. LISTAR CONTAS DE ANÚNCIOS
    if (type === 'accounts') {
      const res = await fetch(`https://graph.facebook.com/v19.0/me/adaccounts?fields=name,id&access_token=${token}`);
      const data = await res.json();
      return NextResponse.json(data);
    }

    // 2. LISTAR CAMPANHAS DE UMA CONTA
    if (type === 'campaigns' && accountId) {
      const res = await fetch(`https://graph.facebook.com/v19.0/${accountId}/campaigns?fields=name,status&access_token=${token}`);
      const data = await res.json();
      return NextResponse.json(data);
    }

    // 3. BUSCAR INSIGHTS DETALHADOS (MÉTRICAS SUPREMO 2.0)
    if (type === 'insights' && accountId) {
      const targetId = campaignId || accountId;
      
      // Insights Consolidados (Adicionando Reach e Frequency)
      const insightRes = await fetch(
        `https://graph.facebook.com/v19.0/${targetId}/insights?fields=spend,purchase_roas,actions,action_values,clicks,impressions,cpc,cpm,cpp,ctr,reach,frequency&date_preset=${datePreset}&access_token=${token}`
      );
      const insightData = await insightRes.json();
      
      // Detalhes dos Adsets (Adicionando CTR e CPM por conjunto)
      const adsetRes = await fetch(
        `https://graph.facebook.com/v19.0/${targetId}/adsets?fields=name,status,insights.date_preset(${datePreset}){spend,purchase_roas,actions,action_values,ctr,cpm}&access_token=${token}`
      );
      const adsetData = await adsetRes.json();

      const stats = insightData.data?.[0] || {};
      
      const getActionValue = (type) => {
        return stats.actions?.find(a => a.action_type === type)?.value || 0;
      };

      const getActionRevenue = (type) => {
        return stats.action_values?.find(a => a.action_type === type)?.value || 0;
      };
      
      const sales = getActionValue('offsite_conversion.fb_pixel_purchase') || getActionValue('purchase') || getActionValue('onsite_conversion.fb_pixel_purchase');
      const revenue = getActionRevenue('offsite_conversion.fb_pixel_purchase') || getActionRevenue('purchase') || getActionRevenue('onsite_conversion.fb_pixel_purchase');
      const checkouts = getActionValue('offsite_conversion.fb_pixel_initiate_checkout') || getActionValue('initiate_checkout');
      const carts = getActionValue('offsite_conversion.fb_pixel_add_to_cart') || getActionValue('add_to_cart');

      const calculatedRoas = stats.spend > 0 ? (revenue / parseFloat(stats.spend)) : 0;

      return NextResponse.json({
        metrics: {
          spend: parseFloat(stats.spend || 0),
          sales: parseInt(sales),
          salesValue: parseFloat(revenue || 0),
          roas: parseFloat(calculatedRoas || 0),
          totalCheckouts: parseInt(checkouts),
          totalCarts: parseInt(carts),
          totalReach: parseInt(stats.reach || 0),
          avgFrequency: parseFloat(stats.frequency || 0).toFixed(2),
          cpm: parseFloat(stats.cpm || 0).toFixed(2),
          ctr: parseFloat(stats.ctr || 0).toFixed(2) + "%",
          cpc: parseFloat(stats.cpc || 0).toFixed(2),
          clicks: parseInt(stats.clicks || 0),
          impressions: parseInt(stats.impressions || 0),
          cpa: sales > 0 ? (parseFloat(stats.spend || 0) / sales).toFixed(2) : "0.00"
        },
        adsets: adsetData.data?.map(ad => {
          const adInsights = ad.insights?.data?.[0] || {};
          
          const getAdAction = (type) => parseInt(adInsights.actions?.find(a => a.action_type === type)?.value || 0);
          const getAdVal = (type) => parseFloat(adInsights.action_values?.find(a => a.action_type === type)?.value || 0);

          const adSales = getAdAction('offsite_conversion.fb_pixel_purchase') || getAdAction('purchase') || getAdAction('onsite_conversion.fb_pixel_purchase');
          const adRevenue = getAdVal('offsite_conversion.fb_pixel_purchase') || getAdVal('purchase') || getAdVal('onsite_conversion.fb_pixel_purchase');
          const adSpend = parseFloat(adInsights.spend || 0);

          return {
            name: ad.name,
            status: ad.status,
            spend: adSpend,
            sales: adSales,
            salesValue: adRevenue,
            roas: adSpend > 0 ? (adRevenue / adSpend).toFixed(2) : "0.00",
            ctr: parseFloat(adInsights.ctr || 0).toFixed(2) + "%",
            cpm: parseFloat(adInsights.cpm || 0).toFixed(2),
            cpa: adSales > 0 ? (adSpend / adSales).toFixed(2) : "0.00"
          };
        }) || []
      });
    }

    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
