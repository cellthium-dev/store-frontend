import { clsx, type ClassValue } from "clsx"
import { DateTime } from "luxon"
import { type Metadata } from "next"
import {
  type Icon,
  type IconURL,
  type Icons,
} from "next/dist/lib/metadata/types/metadata-types"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT"
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const { currency = "EUR", notation = "compact" } = options

  const numericPrice = typeof price === "string" ? parseFloat(price) : price

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}

export function constructMetadata({
  title = "Cellthium",
  description = "Cellthium is a platform to get your things booted up with battery.",
  image = "/thumbnail.png",
  icons = [{ rel: "icon", url: "/favicon.ico" }],
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: null | IconURL | Array<Icon> | Icons
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    creator: "@felixarjuna",
    icons: icons,
    metadataBase: new URL("https://cellthium.up.railway.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

export const formatDate = (date: string) => {
  const datetime = DateTime.fromJSDate(new Date(date))
  return datetime.toFormat("LLL dd, yyyy")
}
