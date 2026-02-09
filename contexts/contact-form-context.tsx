"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ContactFormContextType {
  isOpen: boolean
  openContactForm: () => void
  closeContactForm: () => void
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined)

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openContactForm = () => {
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeContactForm = () => {
    setIsOpen(false)
    document.body.style.overflow = "unset"
  }

  return (
    <ContactFormContext.Provider value={{ isOpen, openContactForm, closeContactForm }}>
      {children}
    </ContactFormContext.Provider>
  )
}

export function useContactForm() {
  const context = useContext(ContactFormContext)
  if (context === undefined) {
    throw new Error("useContactForm must be used within a ContactFormProvider")
  }
  return context
}
