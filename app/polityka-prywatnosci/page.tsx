import type { Metadata } from "next"
import { PrivacyPolicyClient } from "./privacy-policy-client"

export const metadata: Metadata = {
  title: "Polityka Prywatności | Ministerstwo Porządku",
  description: "Polityka prywatności i ochrony danych osobowych Ministerstwo Porządku",
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />
}
