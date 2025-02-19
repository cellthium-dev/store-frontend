import { Badge } from "@/_components/ui/badge"
import { cn } from "@lib/utils"
import AnimatedCounter from "@modules/animation/animated-counter"
import {
  Car,
  CheckCircle,
  Factory,
  ShieldCheck,
  Ship,
  TrainFront,
  Unplug,
} from "lucide-react"
import Image from "next/image"
import React from "react"

type AboutUsProps = React.HTMLAttributes<HTMLDivElement>

type Element = {
  readonly icon: string
  readonly name: string
  readonly description: string
  readonly alt: string
}

const elements: Element[] = [
  {
    icon: "/icons/icon-li.svg",
    name: "Lithium",
    description:
      "Lithium is a critical metal element in the global energy transition due to its fundamental role in the battery industry. While new, more sustainable sources of lithium are under development, recycling provides a road to lower impact lithium today.",
    alt: "lithium-icon",
  },
  {
    icon: "/icons/icon-ni.svg",
    name: "Nickel",
    description:
      "A metal that’s critical to the battery industry, and widely used by others too, nickel is highly valuable and growing in demand",
    alt: "nickel-icon",
  },
  {
    icon: "/icons/icon-mn.svg",
    name: "Manganese",
    description:
      "Manganese mines can be found around the world, and global reserves are high. It’s another key ingredient in many kinds of battery used in the world today.",
    alt: "manganese-icon",
  },
  {
    icon: "/icons/icon-co.svg",
    name: "Cobalt",
    description:
      "Cobalt mining is limited to several countries around the world, and the supply chain has been linked to sustainability risks, including unethical mining practices.",
    alt: "cobalt-icon",
  },
]

const values = [
  {
    name: "Plug and Play",
    Icon: Unplug,
    description:
      "We understand that the battery is the heart of every electric vehicle. That's why we have developed plug-and-play battery modules that combine performance and reliability in an optimized design.",
  },
  {
    name: "Experienced",
    Icon: CheckCircle,
    description:
      "With many years of experience, we strive to shape the future of sustainable mobility with our high-energy battery modules.",
  },
  {
    name: "Safety",
    Icon: ShieldCheck,
    description:
      "Developed in accordance with ECE R100-02 tests, our batteries guarantee maximum safety. We use advanced simulations with ABAQUS 2021 from Dassault Systèmes® to test our batteries under extreme conditions.",
  },
]

export default function AboutUs({ className }: AboutUsProps) {
  return (
    <section
      id="about-us"
      className={cn("grid grid-cols-1 gap-x-4 gap-y-8 pb-40", className)}
    >
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-4">
          <Badge className="w-fit h-10 text-base font-mono uppercase">
            Founded
          </Badge>
          <span className="text-8xl">
            <AnimatedCounter from={0} to={2018} />
          </span>

          <p className="font-light">
            A diverse and interdisciplinary team with extensive experience in
            developing innovative battery solutions for various industries.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Badge className="w-fit h-10 text-base font-mono uppercase">
            Reduced footprint
          </Badge>
          <div>
            <span className="text-8xl">
              <AnimatedCounter from={0} to={90} />
            </span>
            <span className="text-7xl font-light">%</span>
          </div>

          <p className="font-light">
            less CO<sub>2</sub> compared to cells made using coal power by 2030.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Badge className="w-fit h-10 text-base font-mono uppercase">
            Capacity
          </Badge>
          <div>
            <span className="text-8xl">
              <AnimatedCounter from={0} to={30} />
            </span>
            <span className="text-7xl font-light">GWh</span>
          </div>
          <p className="font-light">
            Cellthium's target for battery installed capacity.
          </p>
        </div>
      </div>

      <div className="flex justify-center flex-col items-center my-20">
        <h1 className="text-center text-3xl font-light my-12">
          High quality components
        </h1>
        <div className="w-fit grid lg:grid-cols-2 gap-4">
          {elements.map((element) => (
            <div className="flex flex-col gap-4 w-80 h-80" key={element.name}>
              <Image
                src={element.icon}
                width={70}
                height={70}
                alt={element.alt}
              />

              <h3 className="uppercase font-mono font-bold">{element.name}</h3>
              <p>{element.description}</p>
            </div>
          ))}
        </div>
        <p>
          Our battery modules use{" "}
          <span className="border-b-2 border-green-400 font-mono tracking-tight">
            lithium-nickel-manganese-cobalt
          </span>{" "}
          <code className="font-bold">NMC</code> and{" "}
          <span className="font-mono border-b-2 border-green-400 tracking-tight">
            lithium-iron-phosphate
          </span>{" "}
          <code className="font-bold">
            LiFePO<sub>4</sub>
          </code>{" "}
          for maximum performance and safety.
        </p>
      </div>

      <div className="flex justify-center flex-col items-center my-20">
        <div className="my-8 grid gap-8">
          <h1 className="text-center text-3xl font-light">Broad appliances</h1>
          <p>
            Thanks to our modular concept and simple assembly, the batteries are
            ideal for a wide range of applications, cover any energy
            requirement, and adapt perfectly to the packaging and technical
            requirements of any projects.
          </p>

          <div className="flex items-center justify-center gap-x-4">
            <Car className="w-8 h-8" />
            <p className="uppercase font-mono">Vehicles</p>
            <TrainFront className="w-8 h-8" />
            <p className="uppercase font-mono">Rail vehicles</p>
            <Ship className="w-8 h-8" />
            <p className="uppercase font-mono">Ships</p>
            <Factory className="w-8 h-8" />
            <p className="uppercase font-mono">
              Industrial machines and hybrid machines
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-x-16 my-20">
        <div>
          <h3 className="text-4xl uppercase">The Cellthium Way</h3>
          <p>
            A model defined by technical leadership and rooted in a commitment
            to sustainability and innovation.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-x-4">
          {values.map((value) => (
            <div
              key={value.name}
              className="col-span-1 text-center md:flex md:items-start md:text-left lg:block lg:text-center"
            >
              <div className="flex justify-center md:flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-400 ">
                  {<value.Icon className="h-5 w-5" />}
                </div>
              </div>

              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base text-gray-900 font-mono uppercase">
                  {value.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
