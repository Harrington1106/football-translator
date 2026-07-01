import { HomeClient } from "@/components/home/HomeClient";
import { getTodayMatches } from "@/lib/data/matches";
import { isAiAvailable } from "@/lib/ai/client";

export default function Home() {
  const matches = getTodayMatches();
  const aiEnabled = isAiAvailable();

  return <HomeClient initialMatches={matches} aiEnabled={aiEnabled} />;
}
