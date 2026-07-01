import { NextResponse } from "next/server";
import { getAllPlayers } from "@/lib/data/players";

export async function GET() {
  const players = getAllPlayers();
  return NextResponse.json({ players });
}
