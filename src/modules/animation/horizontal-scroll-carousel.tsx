"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Car, Factory, LucideProps, Ship, TrainFront } from "lucide-react"
import React from "react"

type Appliance = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
  name: string
}
const appliances: Appliance[] = [
  { icon: Car, name: "Vehicles" },
  {
    icon: TrainFront,
    name: "Rail vehicles",
  },
  { icon: Ship, name: "Ships" },
  { icon: Factory, name: "Industrial machines" },
]

export default function HorizontalScrollCarousel() {
  const targetRef = React.useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: targetRef })

  const x = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"])

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-transparent">
      <div className="h-screen sticky top-1/3 items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          <div className="flex items-center justify-center gap-x-8">
            {appliances.map((appliance, index) => (
              <div
                key={index}
                className="h-96 w-96 text-center flex flex-col items-center justify-center p-12 border-2 rounded-xl  border-green-400"
              >
                <appliance.icon className="w-24 h-24" />
                <p className="uppercase font-mono text-5xl p-8">
                  {appliance.name}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
