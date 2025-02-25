import { CheckCircle2, CircleX, Info, TriangleAlert } from "lucide-react"
import React from "react"

interface IBannerProps {
  readonly type: "success" | "error" | "warning" | "info"
  readonly title: string | React.ReactNode
  readonly description: string | React.ReactNode
}

export default function Banner(props: IBannerProps) {
  const getIcon = () => {
    switch (props.type) {
      case "success":
        return <CheckCircle2 className="text-green-400 col-span-1" />
      case "error":
        return <CircleX className="text-red-400 col-span-1" />
      case "warning":
        return <TriangleAlert className="text-yellow-400 col-span-1" />
      case "info":
        return <Info className="text-blue-400 col-span-1" />
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-12 space-x-2 items-center border p-4 rounded-md bg-gray-100">
      {getIcon()}
      <div className="text-sm col-span-11">
        <p className="font-semibold">{props.title}</p>
        <p>{props.description}</p>
      </div>
    </div>
  )
}
