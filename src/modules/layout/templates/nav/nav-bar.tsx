import { Icons } from "@/_components/icons"
import MaxWidthWrapper from "@/_components/max-width-wrapper"
import { buttonVariants } from "@/_components/ui/button"
import { retrieveCustomer } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import NavItems from "./nav-items"

export default async function Navbar() {
  const customer = await retrieveCustomer()

  return (
    <div className="sticky inset-x-0 top-4 z-50 h-30 bg-transparent">
      <header className="relative">
        <MaxWidthWrapper>
          <div>
            <div className="flex h-16 items-center">
              {/** company logo. */}
              <div className="ml-4 flex lg:ml-0">
                <LocalizedClientLink href="/">
                  <Icons.logo className="w-14 h-14" />
                </LocalizedClientLink>
              </div>

              {/** site navigation. */}
              <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              {/** account navigation. */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {customer ? null : (
                    <LocalizedClientLink
                      href="/account"
                      className={buttonVariants({
                        variant: "ghost",
                        className: "uppercase",
                      })}
                    >
                      Account
                    </LocalizedClientLink>
                  )}

                  <div className="flow-root">
                    <CartButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}
