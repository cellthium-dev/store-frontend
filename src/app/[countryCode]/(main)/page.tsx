import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import CircleBackground from "@modules/animation/circle-background"
import AboutUs from "@modules/home/components/about-us"
import Hero from "@modules/home/components/hero"
import MaxWidthWrapper from "app/_components/max-width-wrapper"
import { ReactLenis } from "lenis/dist/lenis-react"
import { Metadata } from "next"

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
      <ReactLenis root>
        <div className="relative inset-0 -z-10 overflow-x-clip">
          <CircleBackground
            r={80}
            blur
            className={
              "bg-gradient-to-r from-[#0172AF] to-[#74FEBD] mix-blend-lighten"
            }
          />
        </div>

        <MaxWidthWrapper>
          <Hero />
          <AboutUs />
        </MaxWidthWrapper>
      </ReactLenis>
    </>
  )
}
