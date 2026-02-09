"use server"

import { Resend } from "resend"
import { headers } from "next/headers"
import {
  sanitizeInput,
  isValidEmail,
  isValidPhone,
  isValidLength,
  isRateLimited,
  isSuspiciousContent,
} from "@/lib/security"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  phone: string
  location: string
  problems: string[]
  rooms: string[]
  goal: string
  preferredDate?: string
  additionalQuestions?: string
}

const problemsMap: Record<string, string> = {
  "no-place": "Brak miejsca",
  messy: "Bałagan",
  "only-i-know": "Tylko ja wiem, gdzie co jest",
  "things-damaged": "Rzeczy się niszczą",
  "big-stocks": "Duże zapasy",
  "dont-know": "Nie wiem, co mam",
  "not-pretty": "Nie wygląda ładnie",
  other: "Inne",
}

const roomsMap: Record<string, string> = {
  kitchen: "Kuchnia",
  pantry: "Spiżarnia",
  wardrobe: "Garderoba",
  "living-room": "Salon",
  bedroom: "Sypialnia",
  "kids-room": "Pokój dziecięcy",
  bathroom: "Łazienka",
  hallway: "Przedpokój",
  garage: "Garaż",
  attic: "Strych",
  storage: "Piwnica",
  other: "Inne",
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"

    // Rate limit: 5 requests per minute per IP
    if (isRateLimited(ip, 5, 60 * 1000)) {
      return {
        success: false,
        error: "Zbyt wiele prób. Spróbuj ponownie za chwilę.",
      }
    }

    // Validate that we have the API key
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured")
    }

    const name = sanitizeInput(formData.name)
    const email = sanitizeInput(formData.email)
    const phone = sanitizeInput(formData.phone)
    const location = sanitizeInput(formData.location)
    const goal = sanitizeInput(formData.goal)
    const preferredDate = formData.preferredDate ? sanitizeInput(formData.preferredDate) : undefined
    const additionalQuestions = formData.additionalQuestions ? sanitizeInput(formData.additionalQuestions) : undefined

    if (!isValidLength(name, 2, 100)) {
      return {
        success: false,
        error: "Imię musi mieć od 2 do 100 znaków",
      }
    }

    if (!isValidEmail(email)) {
      return {
        success: false,
        error: "Nieprawidłowy adres email",
      }
    }

    if (!isValidPhone(phone)) {
      return {
        success: false,
        error: "Nieprawidłowy numer telefonu",
      }
    }

    if (!isValidLength(location, 2, 200)) {
      return {
        success: false,
        error: "Lokalizacja musi mieć od 2 do 200 znaków",
      }
    }

    if (!isValidLength(goal, 10, 2000)) {
      return {
        success: false,
        error: "Cel musi mieć od 10 do 2000 znaków",
      }
    }

    if (additionalQuestions && !isValidLength(additionalQuestions, 0, 2000)) {
      return {
        success: false,
        error: "Dodatkowe pytania nie mogą przekraczać 2000 znaków",
      }
    }

    if (isSuspiciousContent(goal)) {
      return {
        success: false,
        error: "Wiadomość zawiera podejrzaną treść",
      }
    }

    if (additionalQuestions && isSuspiciousContent(additionalQuestions)) {
      return {
        success: false,
        error: "Wiadomość zawiera podejrzaną treść",
      }
    }

    const problemsList = formData.problems.map((p) => problemsMap[p] || p).join(", ")
    const roomsList = formData.rooms.map((r) => roomsMap[r] || r).join(", ")

    // Create email HTML content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .section { margin-bottom: 20px; padding: 15px; border-left: 3px solid #d4a574; background: #fafafa; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; color: #333; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0; color: #333;">Nowe zgłoszenie z formularza kontaktowego</h2>
              <p style="margin: 10px 0 0 0; color: #666;">Ministerstwo Porządku</p>
            </div>

            <div class="section">
              <div class="label">Imię i nazwisko:</div>
              <div class="value">${name}</div>
            </div>

            <div class="section">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>

            <div class="section">
              <div class="label">Telefon:</div>
              <div class="value"><a href="tel:${phone}">${phone}</a></div>
            </div>

            <div class="section">
              <div class="label">Lokalizacja:</div>
              <div class="value">${location}</div>
            </div>

            <div class="section">
              <div class="label">Problemy:</div>
              <div class="value">${problemsList}</div>
            </div>

            <div class="section">
              <div class="label">Pomieszczenia do zorganizowania:</div>
              <div class="value">${roomsList}</div>
            </div>

            <div class="section">
              <div class="label">Cel:</div>
              <div class="value">${goal}</div>
            </div>

            ${
              preferredDate
                ? `
            <div class="section">
              <div class="label">Preferowany termin:</div>
              <div class="value">${preferredDate}</div>
            </div>
            `
                : ""
            }

            ${
              additionalQuestions
                ? `
            <div class="section">
              <div class="label">Dodatkowe pytania:</div>
              <div class="value">${additionalQuestions}</div>
            </div>
            `
                : ""
            }

            <div class="footer">
              <p>To zgłoszenie zostało wysłane automatycznie z formularza kontaktowego na stronie ministerstwo-porzadku.pl</p>
            </div>
          </div>
        </body>
      </html>
    `

    const subjectProblems = formData.problems.length > 1 ? `${formData.problems.length} problemów` : problemsList

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Ministerstwo Porządku <onboarding@resend.dev>",
      to: ["karolinap.kalinowska@gmail.com"],
      replyTo: email,
      subject: `Nowe zgłoszenie: ${name} - ${subjectProblems}`,
      html: emailHtml,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] Email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
