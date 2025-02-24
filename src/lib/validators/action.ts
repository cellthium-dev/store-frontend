import { z } from "zod"

export const ActionResponseValidator = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  errors: z.array(z.string()).optional(),
  inputs: z.any().optional(),
})

export type TActionResponse = z.infer<typeof ActionResponseValidator>
