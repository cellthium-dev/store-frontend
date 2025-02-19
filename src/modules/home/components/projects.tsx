import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Projects() {
  return (
    <section className="h-screen flex items-center relative">
      <div className="flex space-y-16 flex-col">
        <h1 className="text-3xl font-bold">
          Our{" "}
          <span className="text-transparent bg-gradient-to-r from-green-600 to-green-500 bg-clip-text">
            Projects
          </span>
        </h1>

        <ProjectCard />
      </div>
    </section>
  )
}

export function ProjectCard() {
  return (
    <Link
      href={"/projects"}
      className="flex justify-between rounded-xl p-8 text-green-900 hover:bg-green-50 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-end">
        <ArrowUpRight className="w-16 h-16  stroke-1" />
      </div>
      <div className="flex gap-x-8">
        <div className="min-w-fit text-end space-y-4">
          <h1 className="text-7xl font-mono text-black">BMW 315</h1>

          <div className="space-y-2 grid-cols-2">
            <div className="flex flex-col items-end">
              <p className="text-xl">96V</p>
              <h3 className="text-sm bg-green-900 text-green-100 w-fit px-2 py-0 rounded-xl">
                Voltage
              </h3>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xl">170km</p>
              <h3 className="text-sm bg-green-900 text-green-100 w-fit px-2 py-0 rounded-xl">
                Range
              </h3>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xl">135km/h</p>
              <h3 className="text-sm bg-green-900 text-green-100 w-fit px-2 py-0 rounded-xl">
                Top speed
              </h3>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xl">7Hours</p>
              <h3 className="text-sm bg-green-900 text-green-100 w-fit px-2 py-0 rounded-xl">
                Capacity
              </h3>
            </div>
          </div>
        </div>
        <div className="w-fit flex items-center justify-end">
          <Image
            className="h-80 object-cover rounded-xl"
            src={"/cellthium-project.png"}
            width={600}
            height={400}
            alt="bmw-315-project"
          />
        </div>
      </div>
    </Link>
  )
}
