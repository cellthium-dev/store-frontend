"use client"

import { Button, buttonVariants } from "@/_components/ui/button"

import { resetPassword, resetPasswordToken } from "@lib/data/customer"
import { toast } from "@medusajs/ui"
import Banner from "@modules/common/components/banner"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useServerAction } from "zsa-react"
import useRedirectWithCounter from "./useCounter"

type TResetPasswordParams = {
  readonly token: string
  readonly email: string
}

export default function ResetPassword() {
  /** action to request reset password token. */
  const { isPending, executeFormAction, isSuccess } = useServerAction(
    resetPasswordToken,
    {
      onSuccess: () => {
        toast.success("Reset password mail sent.", {
          description: "Password reset email sent. Please check your inbox.",
        })
      },
      onError: ({ err }) => {
        toast.error("Reset password failed.", {
          description:
            (err?.code === "INPUT_PARSE_ERROR" && "Email field required.") ||
            "An error occurred while sending the reset password email.",
        })
      },
    }
  )

  const params = useSearchParams()
  const { token, email } = Object.fromEntries(params) as TResetPasswordParams

  /** hook to display dynamic counter after reset password. */
  const { count, start } = useRedirectWithCounter(5, "/account")

  /** action to perform password reset. */
  const {
    isPending: isResetPending,
    execute,
    isSuccess: isResetSuccess,
  } = useServerAction(resetPassword, {
    onSuccess: () => {
      toast.success("Password reset successful.", {
        description: "Your password has been reset.",
      })

      start()
    },
    onError: ({ err }) => {
      toast.error("Password reset failed.", {
        description:
          (err?.code === "INPUT_PARSE_ERROR" && "Password fields required.") ||
          err.message ||
          "An error occurred while resetting your password.",
      })
    },
  })

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const password = formData.get("password")
    const passwordConfirm = formData.get("password-confirm")

    if (!password || !passwordConfirm) {
      toast.error("Password fields required.", {
        description: "Please fill in both password fields.",
      })
      return
    }

    await execute({
      password: password as string,
      "password-confirm": passwordConfirm as string,
      token: token,
    })
  }

  return (
    <div className="grid items-center justify-center gap-8 py-40 max-w-sm mx-auto">
      <div className="grid gap-4 text-center">
        <h1 className="text-lg font-semibold uppercase">Reset password</h1>
        <p className="text-sm">
          Enter your email below, and we will send you instructions on how to
          reset your password.
        </p>
      </div>

      <div className="grid gap-4">
        {token && email ? (
          <form onSubmit={handleResetPassword} className="grid gap-8 w-full">
            <div className="grid gap-4">
              <Input
                label="Password"
                type="password"
                name="password"
                required
              />
              <Input
                label="Confirm password"
                type="password"
                name="password-confirm"
                required
              />
              {isResetSuccess ? (
                <Banner
                  type="success"
                  title="Reset password was successful."
                  description={
                    <>
                      Your password was successfully reset. You will be
                      automatically redirected to the login page. Redirect in{" "}
                      <span className="rounded-sm bg-gray-300 size-5 inline-flex items-center justify-center font-mono">
                        {count}
                      </span>
                      .
                    </>
                  }
                />
              ) : null}
            </div>
            <Button type="submit" disabled={isResetPending}>
              {isResetPending ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="animate-spin w-4 h-4" />
                  <p>Loading ...</p>
                </div>
              ) : (
                <p>Reset password</p>
              )}
            </Button>
          </form>
        ) : (
          <form
            action={(payload) => void executeFormAction(payload)}
            className="grid gap-8 w-full"
          >
            <Input
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              required
            />
            {isSuccess ? (
              <Banner
                type="success"
                title="Password reset email was sent successfully."
                description="We've sent you an email which you can use to reset your
                    password. Please also check the spam folder if you haven't
                    received it after a few minutes."
              />
            ) : null}
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="animate-spin w-4 h-4" />
                  <p>Loading ...</p>
                </div>
              ) : (
                <p>Request Password Reset</p>
              )}
            </Button>
          </form>
        )}

        <LocalizedClientLink
          href="/account"
          className={buttonVariants({ variant: "link" })}
        >
          Back to login
        </LocalizedClientLink>
      </div>
    </div>
  )
}
