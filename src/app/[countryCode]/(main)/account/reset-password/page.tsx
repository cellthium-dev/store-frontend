"use client"

import { resetPassword } from "@lib/data/customer"
import { toast } from "@medusajs/ui"
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

    resetPassword(email)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Request Password Reset
      </button>
    </form>
  )
}
