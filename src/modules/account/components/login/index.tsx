import { Button } from "@/_components/ui/button"
import { Separator } from "@/_components/ui/separator"
import { login, loginWithGoogle } from "@lib/data/customer"
import { toast } from "@medusajs/ui"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Banner from "@modules/common/components/banner"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Loader2 } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import React from "react"
import { FaGoogle } from "react-icons/fa"
import { useServerAction } from "zsa-react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const {
    error,
    isError,
    execute: onLogin,
  } = useServerAction(login, {
    onError: ({ err }) => {
      toast.error("Login failed", { description: err.message })
    },
    onSuccess: () => {
      toast.success("Login successful")
      redirect("")
    },
  })

  const router = useRouter()
  const { isPending, execute } = useServerAction(loginWithGoogle, {
    onError: ({ err }) => {
      toast.error(`Authentication failed`, { description: err.message })
    },
    onSuccess: ({ data }) => {
      if (data.location) router.push(data.location)
    },
  })

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Sign in to access an enhanced shopping experience.
      </p>

      <div className="w-full grid gap-y-2">
        <form
          className="w-full grid gap-y-4"
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            const formData = new FormData(event.currentTarget)
            await onLogin(formData)
          }}
        >
          <div className="flex flex-col w-full gap-y-2">
            <Input
              label="Email"
              name="email"
              type="email"
              title="Enter a valid email address."
              autoComplete="email"
              required
              data-testid="email-input"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              data-testid="password-input"
            />
          </div>

          {isError ? (
            <Banner
              type="error"
              description={error.message}
              title="Login failed."
            />
          ) : null}

          <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
            Sign in
          </SubmitButton>
        </form>

        <div className="flex items-center w-full gap-x-4 ">
          <Separator orientation="horizontal" className="flex-1" />
          <span className="mx-auto">or</span>
          <Separator orientation="horizontal" className="flex-1" />
        </div>

        <Button
          variant={"outline"}
          onClick={async () => await execute()}
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              <p>Logging in ...</p>
            </div>
          ) : (
            <>
              <FaGoogle className="mr-2" />
              Continue with Google
            </>
          )}
        </Button>
      </div>

      <span className="text-center text-ui-fg-base text-small-regular mt-4">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>
      <span className="text-center text-ui-fg-base text-small-regular mt-4">
        Forgot password?{" "}
        <LocalizedClientLink
          href="/reset-password"
          className="underline"
          data-testid="register-button"
        >
          Reset
        </LocalizedClientLink>
      </span>
    </div>
  )
}

export default Login
