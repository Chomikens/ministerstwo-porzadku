"use client"

import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function PrivacyPolicyClient() {
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-accent transition-smooth mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("privacy.backToHome")}
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{t("privacy.title")}</h1>
          <p className="text-primary-foreground/90 text-lg">{t("privacy.lastUpdated")}: 3 listopada 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg leading-relaxed text-foreground/90">{t("privacy.intro")}</p>
          </section>

          {/* Administrator */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">{t("privacy.administrator.title")}</h2>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p className="mb-2">
                <strong>{t("privacy.administrator.name")}:</strong> Ministerstwo Porządku
              </p>
              <p className="mb-2">
                <strong>NIP:</strong> 1181975957
              </p>
              <p className="mb-2">
                <strong>{t("privacy.administrator.address")}:</strong> Warszawa, Polska
              </p>
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:Karolinap.kalinowska@gmail.com" className="text-accent hover:underline">
                  Karolinap.kalinowska@gmail.com
                </a>
              </p>
              <p>
                <strong>{language === "pl" ? "Telefon" : "Phone"}:</strong>{" "}
                <a href="tel:+48501733731" className="text-accent hover:underline">
                  +48 501 733 731
                </a>
              </p>
            </div>
          </section>

          {/* Data Collection */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">{t("privacy.dataCollection.title")}</h2>
            <p className="mb-4 text-foreground/90">{t("privacy.dataCollection.intro")}</p>

            <h3 className="font-semibold text-xl mb-3 text-foreground">
              {t("privacy.dataCollection.contactForm.title")}
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/90">
              <li>{t("privacy.dataCollection.contactForm.name")}</li>
              <li>{t("privacy.dataCollection.contactForm.email")}</li>
              <li>{t("privacy.dataCollection.contactForm.phone")}</li>
              <li>{t("privacy.dataCollection.contactForm.message")}</li>
            </ul>

            <h3 className="font-semibold text-xl mb-3 text-foreground">{t("privacy.dataCollection.cookies.title")}</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/90">
              <li>
                <strong>{t("privacy.dataCollection.cookies.functional")}:</strong>{" "}
                {t("privacy.dataCollection.cookies.functionalDesc")}
              </li>
              <li>
                <strong>{t("privacy.dataCollection.cookies.analytics")}:</strong>{" "}
                {t("privacy.dataCollection.cookies.analyticsDesc")}
              </li>
            </ul>

            <h3 className="font-semibold text-xl mb-3 text-foreground">
              {t("privacy.dataCollection.analytics.title")}
            </h3>
            <p className="text-foreground/90">{t("privacy.dataCollection.analytics.desc")}</p>
          </section>

          {/* Purpose */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">{t("privacy.purpose.title")}</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>{t("privacy.purpose.item1")}</li>
              <li>{t("privacy.purpose.item2")}</li>
              <li>{t("privacy.purpose.item3")}</li>
              <li>{t("privacy.purpose.item5")}</li>
            </ul>
          </section>

          {/* Legal Basis */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">{t("privacy.legalBasis.title")}</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>{t("privacy.legalBasis.item1")}</li>
              <li>{t("privacy.legalBasis.item2")}</li>
              <li>{t("privacy.legalBasis.item3")}</li>
            </ul>
          </section>

          {/* Third Parties */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">{t("privacy.thirdParties.title")}</h2>
            <p className="mb-4 text-foreground/90">{t("privacy.thirdParties.intro")}</p>

            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-foreground">Vercel Analytics</h3>
                <p className="text-foreground/90">{t("privacy.thirdParties.vercel")}</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-foreground">Resend</h3>
                <p className="text-foreground/90">{t("privacy.thirdParties.resend")}</p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">{t("privacy.retention.title")}</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>{t("privacy.retention.item1")}</li>
              <li>{t("privacy.retention.item2")}</li>
              <li>{t("privacy.retention.item3")}</li>
            </ul>
          </section>

          {/* User Rights */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">{t("privacy.rights.title")}</h2>
            <p className="mb-4 text-foreground/90">{t("privacy.rights.intro")}</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>
                <strong>{t("privacy.rights.access")}:</strong> {t("privacy.rights.accessDesc")}
              </li>
              <li>
                <strong>{t("privacy.rights.rectification")}:</strong> {t("privacy.rights.rectificationDesc")}
              </li>
              <li>
                <strong>{t("privacy.rights.erasure")}:</strong> {t("privacy.rights.erasureDesc")}
              </li>
              <li>
                <strong>{t("privacy.rights.restriction")}:</strong> {t("privacy.rights.restrictionDesc")}
              </li>
              <li>
                <strong>{t("privacy.rights.portability")}:</strong> {t("privacy.rights.portabilityDesc")}
              </li>
              <li>
                <strong>{t("privacy.rights.objection")}:</strong> {t("privacy.rights.objectionDesc")}
              </li>
              <li>
                <strong>{t("privacy.rights.complaint")}:</strong> {t("privacy.rights.complaintDesc")}
              </li>
            </ul>
          </section>

          {/* Security */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">{t("privacy.security.title")}</h2>
            <p className="mb-4 text-foreground/90">{t("privacy.security.intro")}</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>{t("privacy.security.item1")}</li>
              <li>{t("privacy.security.item2")}</li>
              <li>{t("privacy.security.item3")}</li>
              <li>{t("privacy.security.item4")}</li>
            </ul>
          </section>

          {/* Changes */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">{t("privacy.changes.title")}</h2>
            <p className="text-foreground/90">{t("privacy.changes.desc")}</p>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">{t("privacy.contact.title")}</h2>
            <p className="mb-4 text-foreground/90">{t("privacy.contact.desc")}</p>
            <div className="bg-accent/10 p-6 rounded-lg">
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:Karolinap.kalinowska@gmail.com" className="text-accent hover:underline">
                  Karolinap.kalinowska@gmail.com
                </a>
              </p>
              <p>
                <strong>{language === "pl" ? "Telefon" : "Phone"}:</strong>{" "}
                <a href="tel:+48501733731" className="text-accent hover:underline">
                  +48 501 733 731
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
