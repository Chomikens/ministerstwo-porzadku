import { cookies } from "next/headers"

export async function getLanguage(): Promise<"pl" | "en"> {
  const cookieStore = await cookies()
  const language = cookieStore.get("language")?.value

  return language === "en" ? "en" : "pl"
}
