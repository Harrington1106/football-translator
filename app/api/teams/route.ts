import { NextResponse } from "next/server";
import { getAllTeams } from "@/lib/data/teams";

export async function GET() {
  const teams = getAllTeams();
  return NextResponse.json({ teams });
}
