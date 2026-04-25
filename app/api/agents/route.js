import { NextResponse } from "next/server";
import { ALL_AGENTS } from "@/app/lib/agentRegistry";

// Lista todos os agentes do ecossistema
export async function GET() {
  return NextResponse.json({
    total: ALL_AGENTS.length,
    agents: ALL_AGENTS.map(a => ({
      id: a.id,
      name: a.name,
      group: a.group,
      icon: a.icon,
      description: a.description,
    })),
  });
}
