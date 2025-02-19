import { z } from "zod";

export const MessageValidator = z.object({
  id: z.string(),
  tool_call_id: z.string().optional(),
  createdAt: z.date().optional(),
  content: z.string(),
  role: z.enum(["system", "user", "assistant", "function", "data", "tool"]),
  name: z.string().optional(),
});

// array validator
export const MessageArraySchema = z.array(MessageValidator);

export type TMessageValidator = z.infer<typeof MessageValidator>;
