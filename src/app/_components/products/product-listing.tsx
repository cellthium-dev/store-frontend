"use client"

import { useEffect, useState } from "react"

import { cn, formatPrice } from "@lib/utils"
import Link from "next/link"
import { type Product } from "payload-types"
import { PRODUCT_CATEGORIES } from "../../../modules/layout/templates/nav/shared"
import { Skeleton } from "../ui/skeleton"
import ImageSlider from "./image-slider"

interface ProductListingProps {
  readonly product: Product | null
  readonly index: number
}

export default function ProductListing({
  product,
  index,
}: ProductListingProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[]

  if (isVisible && product) {
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/products/${product.id}`}
      >
        <div className="flex flex-col w-full">
          <ImageSlider urls={validUrls} />

          <h3 className="mt-4 font-medium text-sm text-gray-700">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{label}</p>
          <p className="mt-1 font-medium text-sm text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    )
  }
}

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  )
}
