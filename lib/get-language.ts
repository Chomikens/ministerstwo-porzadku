import { cookies } from "next/headers"

export async function getLanguage(): Promise<"pl" | "en"> {
  const cookieStore = await cookies()
  const language = cookieStore.get("language")?.value

  console.log("[v0] Server-side language from cookie:", language)

  return language === "en" ? "en" : "pl"
}
