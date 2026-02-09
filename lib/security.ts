/**
 * Security utilities for form validation and sanitization
 */

/**
 * Sanitize user input to prevent XSS attacks
 * Removes HTML tags and escapes special characters
 */
export function sanitizeInput(input: string): string {
  if (!input) return ""

  return (
    input
      .trim()
      // Remove HTML tags
      .replace(/<[^>]*>/g, "")
      // Escape special characters
      .replace(/[<>'"]/g, (char) => {
        const escapeMap: Record<string, string> = {
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#x27;",
          '"': "&quot;",
        }
        return escapeMap[char] || char
      })
      // Remove null bytes
      .replace(/\0/g, "")
      // Limit length to prevent DoS
      .slice(0, 10000)
  )
}

/**
 * Validate email format with strict regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email) && email.length <= 254 // RFC 5321
}

/**
 * Validate phone number (Polish format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+48)?[\s-]?(\d{3}[\s-]?\d{3}[\s-]?\d{3}|\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2})$/
  return phoneRegex.test(phone)
}

/**
 * Rate limiting store (in-memory)
 * In production, consider using Redis/Vercel KV for distributed rate limiting
 */
interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up old entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(
    () => {
      const now = Date.now()
      for (const [key, entry] of rateLimitStore.entries()) {
        if (entry.resetAt < now) {
          rateLimitStore.delete(key)
        }
      }
    },
    5 * 60 * 1000,
  )
}

/**
 * Check if request should be rate limited
 * @param identifier - Unique identifier (IP address, session ID, etc.)
 * @param maxRequests - Maximum requests allowed in time window
 * @param windowMs - Time window in milliseconds
 * @returns true if rate limit exceeded
 */
export function isRateLimited(
  identifier: string,
  maxRequests = 5,
  windowMs: number = 60 * 1000, // 1 minute
): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  if (!entry || entry.resetAt < now) {
    // First request or window expired
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return false
  }

  if (entry.count >= maxRequests) {
    // Rate limit exceeded
    return true
  }

  // Increment count
  entry.count++
  return false
}

/**
 * Validate field length
 */
export function isValidLength(value: string, min: number, max: number): boolean {
  const length = value.trim().length
  return length >= min && length <= max
}

/**
 * Check for suspicious patterns (spam detection)
 */
export function isSuspiciousContent(content: string): boolean {
  const suspiciousPatterns = [
    /\b(viagra|cialis|casino|lottery|winner)\b/gi, // Spam keywords
    /(.)\1{10,}/gi, // Repeated characters (aaaaaaaaaa)
  ]

  let urlCount = 0
  const urls = content.match(/https?:\/\/[^\s]+/gi)
  if (urls) urlCount = urls.length

  // Allow max 3 URLs
  if (urlCount > 3) return true

  // Check other patterns
  return suspiciousPatterns.some((pattern) => pattern.test(content))
}
