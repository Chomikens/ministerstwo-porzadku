export type ServiceIconName = "Home" | "Briefcase" | "Package" | "Sparkles"

export interface ServiceData {
  slug: string
  iconName: ServiceIconName
  badgeKey: string
  titleKey: string
  descriptionKey: string
  image: string
  featureKeys: string[]
  detailsKey: string
  priceKey: string
  forWhomKey?: string
  imagePosition?: string
}

export const services: ServiceData[] = [
  {
    slug: "projektowa-organizacja-przestrzeni",
    iconName: "Home",
    badgeKey: "services.home.badge",
    titleKey: "services.home.title",
    descriptionKey: "services.home.description",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/projektowa-organizacja-przestrzeni-JdjazGwK2WbGOirv67RgGNiBxo98Z9.webp",
    featureKeys: [
      "services.home.feature1",
      "services.home.feature2",
      "services.home.feature3",
      "services.home.feature4",
    ],
    detailsKey: "services.home.details",
    priceKey: "services.home.price",
  },
  {
    slug: "decluttering-i-organizacja-przestrzeni",
    iconName: "Briefcase",
    badgeKey: "services.office.badge",
    titleKey: "services.office.title",
    descriptionKey: "services.office.description",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uslugi-organizacja-przestrzeni-HWTLyFKYiSrNHXnhYNI4QwNMRFNnVN.webp",
    featureKeys: [
      "services.office.feature1",
      "services.office.feature2",
      "services.office.feature3",
      "services.office.feature4",
    ],
    detailsKey: "services.office.details",
    priceKey: "services.office.price",
    forWhomKey: "services.office.forWhom",
    imagePosition: "object-top",
  },
  {
    slug: "wsparcie-w-przeprowadzce",
    iconName: "Package",
    badgeKey: "services.moving.badge",
    titleKey: "services.moving.title",
    descriptionKey: "services.moving.description",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uslugi-przeprowadzki-adIf3hkNhKPxx5GbENHVLtA9HScpVV.webp",
    featureKeys: [
      "services.moving.feature1",
      "services.moving.feature2",
      "services.moving.feature3",
      "services.moving.feature4",
    ],
    detailsKey: "services.moving.details",
    priceKey: "services.moving.price",
    forWhomKey: "services.moving.forWhom",
  },
  {
    slug: "konsultacja-online",
    iconName: "Sparkles",
    badgeKey: "services.online.badge",
    titleKey: "services.online.title",
    descriptionKey: "services.online.description",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/konsultacja-online-ministerstwo-porzadku-hIFgbW7ZOK0WXPWG6ns0GbP1EBQSfY.webp",
    featureKeys: [
      "services.online.feature1",
      "services.online.feature2",
      "services.online.feature3",
      "services.online.feature4",
    ],
    detailsKey: "services.online.details",
    priceKey: "services.online.price",
    forWhomKey: "services.online.forWhom",
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug)
}
