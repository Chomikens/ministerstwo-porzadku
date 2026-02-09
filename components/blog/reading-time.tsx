import { Clock } from "lucide-react"
import { formatReadingTime } from "@/lib/reading-time"

interface ReadingTimeProps {
  minutes: number
  lang?: "pl" | "en"
}

export function ReadingTime({ minutes, lang = "pl" }: ReadingTimeProps) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Clock className="w-4 h-4" />
      <span>{formatReadingTime(minutes, lang)}</span>
    </div>
  )
}
