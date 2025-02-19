import { Metadata } from "next"

import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import AboutUs from "@modules/home/components/about-us"
import Hero from "@modules/home/components/hero"
import MaxWidthWrapper from "app/_components/max-width-wrapper"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <MaxWidthWrapper>
        <Hero />
        <AboutUs />
      </MaxWidthWrapper>
    </>
  )
}
