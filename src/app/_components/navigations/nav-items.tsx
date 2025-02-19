"use client"

import { cn } from "@lib/utils"
import Link from "next/link"
import React from "react"
import { Icons } from "../icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"

const products: { title: string; href: string; description: string }[] = [
  {
    title: "Battery",
    href: "/products?category=battery",
    description: "Individual battery solution for your needs.",
  },
  {
    title: "Battery Kit",
    href: "/products?category=battery_kit",
    description: "All in one battery solution for your device.",
  },
  {
    title: "Power Station Kit",
    href: "/products?category=powerstation_kit",
    description: "All in one solution for your power station.",
  },
]

export default function NavItems() {
  return (
    <div className="flex h-full items-center">
      <NavigationMenu>
        <NavigationMenuList className="lg:flex lg:gap-x-8">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              About us
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Icons.logo className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Cellthium
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Customized battery modules for your DIY projects.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="" title="Introduction">
                  A little introduction about Cellthium.
                </ListItem>
                <ListItem href="" title="Key values">
                  Our key values for Cellthium.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {products.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/projects" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "min-w-[6rem] bg-transparent"
                )}
              >
                Projects
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/faq" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "min-w-[6rem] bg-transparent"
                )}
              >
                FAQ
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
