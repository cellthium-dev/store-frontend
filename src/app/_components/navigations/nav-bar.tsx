import { cookies } from "next/headers"
import Link from "next/link"

import { Icons } from "../icons"
import MaxWidthWrapper from "../max-width-wrapper"
import { buttonVariants } from "../ui/button"

import NavItems from "./nav-items"
import NavMobile from "./nav-mobile"

export default async function Navbar() {
  const nextCookies = cookies()
  const user = {}

  function renderLeftNav() {
    return (
      <>
        <NavMobile />

        <div className="ml-4 flex lg:ml-0">
          <Link href="/">
            <Icons.logo className="w-14 h-14" />
          </Link>
        </div>

        <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
          <NavItems />
        </div>
      </>
    )
  }

  function renderRightNav() {
    return (
      <div className="ml-auto flex items-center">
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          {user ? null : (
            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "ghost",
              })}
            >
              Sign in
            </Link>
          )}

          {user ? null : (
            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          )}

          {/* {user ? (
            <NavUserAccount user={user} />
          ) : (
            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: "ghost",
              })}
            >
              Create account
            </Link>
          )} */}

          {user ? (
            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          ) : null}

          {user ? null : (
            <div className="flex lg:ml-6">
              <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
            </div>
          )}

          <div className="ml-4 flow-root lg:ml-6">
            {/* <Cart user={user} /> */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 bg-white">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {renderLeftNav()}
              {renderRightNav()}
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}
