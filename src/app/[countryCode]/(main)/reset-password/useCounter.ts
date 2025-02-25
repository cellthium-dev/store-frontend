"use client"

import { redirect } from "next/navigation"
import React from "react"

export default function useRedirectWithCounter(delay: number, url: string) {
  /** local state for counting flad. */
  const [isCounting, setIsCounting] = React.useState<boolean>(false)
  const start = () => setIsCounting(true)

  /** local state for the current count. */
  const [count, setCount] = React.useState<number>(delay)

  React.useEffect(() => {
    if (!isCounting || count <= 0) {
      if (isCounting && count <= 0) redirect(url)
      return
    }

    // set up the countdown interval
    const timer = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)

    // cleanup interval on unmount or when count changes
    return () => clearInterval(timer)
  }, [count, isCounting])

  return { count, start }
}
