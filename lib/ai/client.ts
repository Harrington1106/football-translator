const DEEPSEEK_BASE = "https://api.deepseek.com";
const DEFAULT_MODEL = "deepseek-v4-pro";

let apiKey: string | null = null;

function getApiKey(): string | null {
  if (apiKey) return apiKey;
  apiKey = process.env.DEEPSEEK_API_KEY || null;
  if (!apiKey) {
    console.warn("⚠️ DEEPSEEK_API_KEY not set — AI features disabled");
  }
  return apiKey;
}

export function isAiAvailable(): boolean {
  return !!getApiKey();
}

/**
 * Call DeepSeek API (OpenAI-compatible).
 * Returns the text response, or null on failure.
 */
export async function askAI(
  systemPrompt: string,
  userMessage: string,
  options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  }
): Promise<string | null> {
  const key = getApiKey();
  if (!key) return null;

  try {
    const res = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: options?.model || DEFAULT_MODEL,
        max_tokens: options?.maxTokens || 1024,
        temperature: options?.temperature ?? 0.7,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (!res.ok) {
      console.error("DeepSeek API error:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error("DeepSeek API error:", error);
    return null;
  }
}

// Keep backward compat alias
export { askAI as askClaude };
