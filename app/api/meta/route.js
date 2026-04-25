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
    const API_VERSION = 'v25.0';

    if (type === 'accounts') {
      const res = await fetch(`https://graph.facebook.com/${API_VERSION}/me/adaccounts?fields=name,id&access_token=${token}`);
      const data = await res.json();
      return NextResponse.json(data);
    }

    if (type === 'campaigns' && accountId) {
      const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${accountId}/campaigns?fields=name,status&limit=50&access_token=${token}`);
      const data = await res.json();
      return NextResponse.json(data);
    }

    if (type === 'insights' && accountId) {
      const targetId = campaignId || accountId;
      
      // Insights detalhados incluindo Landing Page Views e Cliques no Link
      const url = `https://graph.facebook.com/${API_VERSION}/${targetId}/insights?fields=adset_id,adset_name,spend,reach,frequency,cpm,ctr,cpc,actions,action_values,inline_link_clicks,purchase_roas&level=adset&date_preset=${datePreset}&access_token=${token}`;
      
      const res = await fetch(url);
      const rawData = await res.json();

      if (rawData.error) throw new Error(rawData.error.message);

      let totalSpend = 0, totalSalesCount = 0, totalSalesValue = 0;
      let totalCarts = 0, totalCheckouts = 0, totalReach = 0, totalFreq = 0;
      let totalLPV = 0, totalLinkClicks = 0;

      const adsets = (rawData.data || []).map(ad => {
        const spend = parseFloat(ad.spend || 0);
        const linkClicks = parseInt(ad.inline_link_clicks || 0);
        
        // Mapeamento Universal de Eventos
        const getActionValue = (type) => parseInt(ad.actions?.find(a => a.action_type === type)?.value || 0);
        const getRevenueValue = (type) => parseFloat(ad.action_values?.find(a => a.action_type === type)?.value || 0);

        const sales = getActionValue('purchase') || getActionValue('offsite_conversion.fb_pixel_purchase') || getActionValue('onsite_conversion.fb_pixel_purchase');
        const revenue = getRevenueValue('purchase') || getRevenueValue('offsite_conversion.fb_pixel_purchase') || getRevenueValue('onsite_conversion.fb_pixel_purchase');
        const checkouts = getActionValue('initiate_checkout') || getActionValue('offsite_conversion.fb_pixel_initiate_checkout');
        const carts = getActionValue('add_to_cart') || getActionValue('offsite_conversion.fb_pixel_add_to_cart');
        const lpv = getActionValue('landing_page_view') || getActionValue('offsite_conversion.fb_pixel_view_content');

        totalSpend += spend;
        totalSalesCount += sales;
        totalSalesValue += revenue;
        totalCarts += carts;
        totalCheckouts += checkouts;
        totalLPV += lpv;
        totalLinkClicks += linkClicks;
        totalReach += parseInt(ad.reach || 0);
        totalFreq += parseFloat(ad.frequency || 0);

        return {
          name: ad.adset_name || `Conjunto ${ad.adset_id}`,
          status: 'ACTIVE',
          spend: spend,
          sales: sales,
          salesValue: revenue,
          lpv: lpv,
          linkClicks: linkClicks,
          connectRate: linkClicks > 0 ? ((lpv / linkClicks) * 100).toFixed(1) + "%" : "0%",
          roas: spend > 0 ? (revenue / spend).toFixed(2) : "0.00",
          cpa: sales > 0 ? (spend / sales).toFixed(2) : "0.00",
          ctr: parseFloat(ad.ctr || 0).toFixed(2) + "%",
          cpm: parseFloat(ad.cpm || 0).toFixed(2)
        };
      });

      const avgFrequency = adsets.length > 0 ? (totalFreq / adsets.length).toFixed(2) : "0.00";
      const connectRate = totalLinkClicks > 0 ? ((totalLPV / totalLinkClicks) * 100).toFixed(1) : "0.0";

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
          avgFrequency: avgFrequency,
          totalLPV: totalLPV,
          totalLinkClicks: totalLinkClicks,
          connectRate: connectRate + "%"
        },
        adsets: adsets
      });
    }

    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
