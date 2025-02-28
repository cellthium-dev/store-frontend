"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { TActionResponse } from "@lib/validators/action"
import { HttpTypes } from "@medusajs/types"
import { HttpStatusCode } from "axios"
import { revalidateTag } from "next/cache"
import { decodeToken } from "react-jwt"
import { z } from "zod"
import { createServerAction, ZSAError } from "zsa"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeAuthToken,
  setAuthToken,
} from "./cookies"

type MedusaError = {
  readonly name: string
  readonly message: string
  readonly statusText: string
  readonly status: HttpStatusCode
  readonly stack: string
}

function isMedusaError(value: any): value is MedusaError {
  return (
    value != null && // Not null or undefined
    typeof value === "object" && // Is an object
    typeof value.name === "string" && // Has string name
    typeof value.message === "string" && // Has string message
    typeof value.statusText === "string" && // Has string statusText
    typeof value.status === "number" && // Has numeric status (adjust if HttpStatusCode is more specific)
    typeof value.stack === "string" // Has string stack
  )
}

export const retrieveCustomer =
  async (): Promise<HttpTypes.StoreCustomer | null> => {
    const headers = {
      ...(await getAuthHeaders()),
    }

    const next = {
      ...(await getCacheOptions("customers")),
    }

    return await sdk.client
      .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
        method: "GET",
        query: {
          fields: "*orders",
        },
        headers,
        next,
        cache: "force-cache",
      })
      .then(({ customer }) => customer)
      .catch(() => null)
  }

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
    .catch(medusaError)

  const cacheTag = await getCacheTag("customers")
  revalidateTag(cacheTag)

  return updateRes
}

export const signup = createServerAction()
  .input(
    z.object({
      email: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      phone: z.string().optional(),
      password: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const password = input.password
    const customerForm = {
      email: input.email,
      first_name: input.first_name,
      last_name: input.last_name,
      phone: input.phone,
    }

    /** handle token retrieval if email already registered as user
     * set authentication token after registration or login for further processing.
     */
    let token
    try {
      token = await sdk.auth.register("customer", "emailpass", {
        email: customerForm.email,
        password: password,
      })
    } catch (err: any) {
      if (
        err.status === HttpStatusCode.Unauthorized &&
        err.message === "Identity with email already exists"
      ) {
        token = await sdk.auth.login("customer", "emailpass", {
          email: customerForm.email,
          password: password,
        })
      }
    }
    await setAuthToken(token as string)

    try {
      const headers = {
        ...(await getAuthHeaders()),
      }

      const { customer: createdCustomer } = await sdk.store.customer.create(
        customerForm,
        {},
        headers
      )

      /** update authentication token. */
      const loginToken = await sdk.auth.login("customer", "emailpass", {
        email: customerForm.email,
        password,
      })
      await setAuthToken(loginToken as string)

      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)

      await transferCart()

      return createdCustomer
    } catch (error: any) {
      if (isMedusaError(error)) {
        if (error.status === HttpStatusCode.UnprocessableEntity) {
          throw new ZSAError(
            "UNPROCESSABLE_CONTENT",
            `${error.message}. Please login instead.`
          )
        }
      } else throw new ZSAError("ERROR", error.toString())
    }
  })

export const login = createServerAction()
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
    }),
    {
      type: "formData",
    }
  )
  .handler(async ({ input }) => {
    const { email, password } = input

    try {
      const token = await sdk.auth.login("customer", "emailpass", {
        email,
        password,
      })

      await setAuthToken(token as string)

      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)

      await transferCart()
    } catch (error: any) {
      throw new ZSAError("ERROR", error.toString())
    }
  })

export async function signout(countryCode: string): Promise<TActionResponse> {
  await sdk.auth.logout()
  await removeAuthToken()
  revalidateTag("auth")
  revalidateTag("customer")

  return { success: true }
}

export async function transferCart() {
  const cartId = await getCartId()
  if (!cartId) return

  const headers = await getAuthHeaders()
  await sdk.store.cart.transferCart(cartId, {}, headers)

  revalidateTag("cart")
}

export const addCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const isDefaultBilling = (currentState.isDefaultBilling as boolean) || false
  const isDefaultShipping = (currentState.isDefaultShipping as boolean) || false

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
    is_default_billing: isDefaultBilling,
    is_default_shipping: isDefaultShipping,
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(async ({ customer }) => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const addressId =
    (currentState.addressId as string) || (formData.get("addressId") as string)

  if (!addressId) {
    return { success: false, error: "Address ID is required" }
  }

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
  } as HttpTypes.StoreUpdateCustomerAddress

  const phone = formData.get("phone") as string

  if (phone) {
    address.phone = phone
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const resetPasswordToken = createServerAction()
  .input(z.object({ email: z.string().min(2) }), { type: "formData" })
  .handler(async ({ input }): Promise<void> => {
    try {
      await sdk.auth.resetPassword("customer", "emailpass", {
        identifier: input.email,
      })
    } catch (error: any) {
      throw new ZSAError("ERROR", error.toString())
    }
  })

export const resetPassword = createServerAction()
  .input(
    z.object({
      password: z.string().min(6),
      "password-confirm": z.string().min(6),
      token: z.string(),
    })
  )
  .handler(async ({ input }) => {
    try {
      if (input.password !== input["password-confirm"]) {
        throw new ZSAError("ERROR", "Passwords do not match")
      }

      await sdk.auth.updateProvider(
        "customer",
        "emailpass",
        {
          password: input.password,
        },
        input.token
      )
    } catch (error: any) {
      throw new ZSAError("ERROR", error.toString())
    }
  })

export const loginWithGoogle = createServerAction().handler(async () => {
  try {
    const result = await sdk.auth.login("customer", "google", {})
    const response =
      typeof result === "string"
        ? { token: result }
        : { location: result.location }
    return response
  } catch (error: any) {
    throw new ZSAError("ERROR", error.toString())
  }
})

type GoogleOAuthCallbackResponse = {
  readonly actor_id: string
  readonly actor_type: string
  readonly auth_identity_id: string
  readonly app_metadata: object
  readonly iat: number
  readonly exp: number
}

type GoogleOAuthAccountResponse = {
  readonly id: string
  readonly user_metadata: {
    readonly name: string
    readonly email: string
    readonly picture: string
    readonly family_name: string
    readonly given_name: string
  }
}
export const handleGoogleOAuthCallback = createServerAction()
  .input(
    z.object({
      code: z.string(),
      state: z.string(),
    })
  )
  .handler(async ({ input }) => {
    try {
      /** see complete docs on
       * https://docs.medusajs.com/resources/storefront-development/customers/third-party-login.
       */

      /** send callback to backend for auth token. */
      let token = await sdk.auth.callback("customer", "google", {
        code: input.code,
        state: input.state,
      })
      await setAuthToken(token)
      const decodedToken = decodeToken(token) as GoogleOAuthCallbackResponse

      /** validate auth token.
       * create customer if token is empty.
       * refresh token if customer already exists.
       */
      const isAuthenticated = decodedToken.actor_id !== ""
      if (isAuthenticated) {
        const customerCacheTag = await getCacheTag("customers")
        revalidateTag(customerCacheTag)

        return await transferCart()
      }

      /** retrieve user information from provider. */
      const customer = await sdk.client.fetch<GoogleOAuthAccountResponse>(
        `/auth/google?auth_identity_id=${decodedToken.auth_identity_id}`,
        {
          method: "GET",
        }
      )

      /** create customer. */
      const headers = await getAuthHeaders()
      await sdk.store.customer.create(
        {
          email: customer.user_metadata.email,
          first_name: customer.user_metadata.given_name,
          last_name: customer.user_metadata.family_name,
        },
        {},
        headers
      )

      /** revalidate cache and transfer cart. */
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)

      return await transferCart()
    } catch (error: any) {
      console.log(error)
      throw new ZSAError("ERROR", error.toString())
    }
  })
