"use client"

import { handleGoogleOAuthCallback } from "@lib/data/customer"
import { toast } from "@medusajs/ui"
import { Loader } from "lucide-react"
import { redirect, useSearchParams } from "next/navigation"
import React from "react"
import { useServerAction } from "zsa-react"

type TGoogleOAuthCallbackParams = {
  readonly code?: string
  readonly state?: string
}

export default function GoogleCallback() {
  /** action to validate callback. */
  const { execute, isSuccess } = useServerAction(handleGoogleOAuthCallback, {
    onError: ({ err }) => {
      toast.error(`Authentication failed`, { description: err.message })
      redirect("/account")
    },
    onSuccess: () => {
      toast.success("Authentication successful")
      redirect("/account")
    },
  })
  const queryParams = useSearchParams()
  const validateCallback = async () => {
    const { code, state } = Object.fromEntries(
      queryParams
    ) as TGoogleOAuthCallbackParams
    if (!code || !state) {
      toast.error("Invalid google callback.", {
        description:
          "An error occured while trying to authenticate with Google. Code or state was invalid.",
      })
      return { success: true }
    }

    /** handle oauth callback. */
    await execute({ code: code, state: state })
  }

  React.useEffect(() => {
    validateCallback()
  }, [isSuccess])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader className="animate-spin" size={16} />
        {"Authenticating"}
      </div>
    </div>
  )
}
