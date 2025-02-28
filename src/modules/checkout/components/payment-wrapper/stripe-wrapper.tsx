"use client"

import { HttpTypes } from "@medusajs/types"
import { Elements } from "@stripe/react-stripe-js"
import { Stripe, StripeElementsOptions } from "@stripe/stripe-js"
import { createContext } from "react"

type StripeWrapperProps = {
  readonly paymentSession: HttpTypes.StorePaymentSession
  readonly stripeKey?: string
  readonly stripePromise: Promise<Stripe | null> | null
  readonly children: React.ReactNode
}

export const StripeContext = createContext(false)

export default function StripeWrapper({
  paymentSession,
  stripeKey,
  stripePromise,
  children,
}: StripeWrapperProps) {
  const options: StripeElementsOptions = {
    clientSecret: paymentSession!.data?.client_secret as string | undefined,
  }

  if (!stripeKey) {
    throw new Error(
      "Stripe key is missing. Set NEXT_PUBLIC_STRIPE_KEY environment variable."
    )
  }

  if (!stripePromise) {
    throw new Error(
      "Stripe promise is missing. Make sure you have provided a valid Stripe key."
    )
  }

  if (!paymentSession?.data?.client_secret) {
    throw new Error(
      "Stripe client secret is missing. Cannot initialize Stripe."
    )
  }

  return (
    <StripeContext.Provider value={true}>
      <Elements options={options} stripe={stripePromise}>
        {children}
      </Elements>
    </StripeContext.Provider>
  )
}
