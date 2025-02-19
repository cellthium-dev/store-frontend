import { buttonVariants } from "app/_components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="bg-transparent min-h-screen grid">
      <div className="relative isolate px-6 lg:px-8 lg:-mt-24 2xl:mt-0">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0172AF] to-[#74FEBD] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <span className="uppercase font-mono font-bold">
                Introducing the next generation of energy starter kit{" "}
              </span>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-normal tracking-tight text-gray-900">
              Modular and highly customizeable{" "}
              <span className="font-mono bg-green-400">green</span> batteries
              for the blue planet.
            </h1>
            <p className="mt-6 text-gray-600 text-normal ">
              Unrivaled battery systems that are scalable, secure, easy to
              install and offer high performance and reliability.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "default",
                  className: "uppercase font-mono font-semibold",
                })}
              >
                Our cells
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-42rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0172AF] to-[#74FEBD] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
