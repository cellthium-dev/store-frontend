"use client"

import { Button } from "@/_components/ui/button"
import { signup } from "@lib/data/customer"
import { toast } from "@medusajs/ui"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Banner from "@modules/common/components/banner"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Loader2 } from "lucide-react"
import React from "react"
import { useServerAction } from "zsa-react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const { isPending, error, isError, execute } = useServerAction(signup, {
    onError: ({ err }) => {
      toast.error("Registration failed", { description: err.message })
    },
    onSuccess: ({ data }) => {
      toast.success("Registration successful.", {
        description: "User was registred successfully. ",
      })
    },
  })

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6">Become a member</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        Create your Cellthium profile and get access to an enhanced experience.
      </p>
      <form
        className="w-full flex flex-col gap-y-4"
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()

          const formData = new FormData(event.currentTarget)
          await execute({
            email: formData.get("email") as string,
            first_name: formData.get("first_name") as string,
            last_name: formData.get("last_name") as string,
            password: formData.get("password") as string,
            phone: formData.get("phone") as string | undefined,
          })
        }}
      >
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>

        {isError ? (
          <Banner
            type="error"
            description={error.message}
            title="Registration failed."
          />
        ) : null}

        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to Cellthium&apos;s{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>

        {isPending ? (
          <Button disabled={isPending} className="w-full mt-6">
            <div className="flex gap-x-1 items-center">
              <Loader2 size={16} className="animate-spin" />
              <p>Loading</p>
            </div>
          </Button>
        ) : (
          <SubmitButton className="w-full mt-6" data-testid="register-button">
            Join
          </SubmitButton>
        )}
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
