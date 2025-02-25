"use client"

import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"
import { resetPassword } from "@lib/data/customer"
import { toast } from "@medusajs/ui"
import { Loader2 } from "lucide-react"
import React from "react"

export default function ResetPassword() {
  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = React.useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      toast.error("Email is required")
      return
    }
    setLoading(true)

    const response = await resetPassword(email)
    if (response.success)
      toast.success("Password reset email sent. Please check your inbox.")
    else
      toast.error(
        "An error occured while sending the password reset email. Please try again later."
      )

    setLoading(false)
  }

  return (
    <div className="grid items-center justify-center gap-8 m-40">
      <div className="grid gap-4">
        <h1 className="text-3xl font-light">Reset account password</h1>
        <p>Please fill out the form below to request a password reset.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8">
        <div className="">
          <Label>Email</Label>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <div className="flex gap-2 items-center">
              <Loader2 className="animate-spin w-4 h-4" />
              <p>Loading ...</p>
            </div>
          ) : (
            <p>Request Password Reset</p>
          )}
        </Button>
      </form>
    </div>
  )
}
