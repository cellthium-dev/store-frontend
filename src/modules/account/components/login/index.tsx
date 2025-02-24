import { Button } from "@/_components/ui/button"
import { Separator } from "@/_components/ui/separator"
import { login } from "@lib/data/customer"
import { toast } from "@medusajs/ui"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"
import { FaGoogle } from "react-icons/fa"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [response, formAction] = React.useActionState(login, null)

  React.useEffect(() => {
    if (response?.success === false) {
      toast.error("Authentication failed", { description: response.message })
    }
  }, [response?.success])

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
        <form className="w-full " action={formAction}>
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
          <ErrorMessage
            error={response?.message}
            data-testid="login-error-message"
          />
          <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
            Sign in
          </SubmitButton>
        </form>

        <div className="flex items-center w-full gap-x-4 ">
          <Separator orientation="horizontal" className="flex-1" />
          <span className="mx-auto">or</span>
          <Separator orientation="horizontal" className="flex-1" />
        </div>

        <Button variant={"outline"}>
          <FaGoogle className="mr-2" />
          Continue with Google
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
        Forgot your password?{" "}
        <LocalizedClientLink
          href="/account/reset-password"
          className="underline"
          data-testid="register-button"
        >
          Reset password
        </LocalizedClientLink>
      </span>
    </div>
  )
}

export default Login
