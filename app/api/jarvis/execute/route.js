import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { action } = await req.json();
    const token = process.env.META_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json({ error: "Token Meta não configurado" }, { status: 400 });
    }

    if (!action || !action.type) {
      return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
    }

    // PAUSAR ADSET
    if (action.type === "pause_adset") {
      if (!action.adsetId) {
        return NextResponse.json({ error: "adsetId obrigatório para pausar" }, { status: 400 });
      }

      const res = await fetch(
        `https://graph.facebook.com/v19.0/${action.adsetId}?status=PAUSED&access_token=${token}`,
        { method: "POST" }
      );
      const data = await res.json();

      if (data.error) {
        return NextResponse.json({
          success: false,
          message: `Falha ao pausar: ${data.error.message}`,
          raw: data.error,
        });
      }

      return NextResponse.json({
        success: true,
        message: `✅ Adset "${action.adsetName || action.adsetId}" pausado com sucesso.`,
        result: data,
      });
    }

    // AJUSTAR ORÇAMENTO
    if (action.type === "adjust_budget") {
      if (!action.adsetId || !action.budgetMultiplier) {
        return NextResponse.json({ error: "adsetId e budgetMultiplier obrigatórios" }, { status: 400 });
      }

      // Primeiro busca orçamento atual
      const currentRes = await fetch(
        `https://graph.facebook.com/v19.0/${action.adsetId}?fields=daily_budget,lifetime_budget&access_token=${token}`
      );
      const currentData = await currentRes.json();

      if (currentData.error) {
        return NextResponse.json({ success: false, message: currentData.error.message });
      }

      const currentBudget = parseInt(currentData.daily_budget || currentData.lifetime_budget || 0);
      const newBudget = Math.round(currentBudget * action.budgetMultiplier);
      const budgetType = currentData.daily_budget ? "daily_budget" : "lifetime_budget";

      const updateRes = await fetch(
        `https://graph.facebook.com/v19.0/${action.adsetId}?${budgetType}=${newBudget}&access_token=${token}`,
        { method: "POST" }
      );
      const updateData = await updateRes.json();

      if (updateData.error) {
        return NextResponse.json({ success: false, message: updateData.error.message });
      }

      const changePercent = ((action.budgetMultiplier - 1) * 100).toFixed(0);
      return NextResponse.json({
        success: true,
        message: `✅ Orçamento de "${action.adsetName || action.adsetId}" ajustado +${changePercent}% (R$ ${(currentBudget / 100).toFixed(2)} → R$ ${(newBudget / 100).toFixed(2)})`,
        result: updateData,
      });
    }

    return NextResponse.json({ error: `Tipo de ação desconhecido: ${action.type}` }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
