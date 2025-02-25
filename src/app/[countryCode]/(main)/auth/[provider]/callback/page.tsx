"use client"

import { Button } from "@/_components/ui/button"
import { handleGoogleOAuthCallback } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import { toast } from "@medusajs/ui"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import React from "react"
import { useServerAction } from "zsa-react"

type TGoogleOAuthCallbackParams = {
  readonly code?: string
  readonly state?: string
}

export default function GoogleCallback() {
  const [customer, setCustomer] = React.useState<HttpTypes.StoreCustomer>()

  /** action to validate callback. */
  const { isPending, execute } = useServerAction(handleGoogleOAuthCallback, {
    onError: ({ err }) => {
      toast.error(`Authentication failed`, { description: err.message })
    },
    onSuccess: ({ data }) => {},
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
      return
    }

    /** handle oauth callback. */
    await execute({ code: code, state: state })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isPending && (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" size={16} />
          Loading...
        </div>
      )}
      {customer && <span>Created customer {customer.email} with Google.</span>}

      <Button onClick={() => validateCallback()}>Validate</Button>
    </div>
  )
}
