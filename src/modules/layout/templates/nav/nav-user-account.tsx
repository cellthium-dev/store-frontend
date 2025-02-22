"use client"

import { Button } from "@/_components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu"
import { StoreCustomer } from "@medusajs/types"
import { useRouter } from "next/navigation"

export default function NavUserAccount({ user }: { user: StoreCustomer }) {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          Account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60 bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="text-sm font-medium text-black">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("order-history")}>
          Order history
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => console.log("log out")}
          className="cursor-pointer"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
