import { z } from "zod";
import { zfd } from "zod-form-data";

export const FileUploadValidator = zfd.formData({
  file: zfd.file().refine((file) => file.name.endsWith(".pdf"), {
    message: "You can only upload PDF File.",
  }),
});

export type TFileUploadValidator = z.infer<typeof FileUploadValidator>;

export const UpdateModelValidator = z.object({
  openai_api_key: z.string().min(1, { message: "API key cannot be left empty." }),
  model: z.enum(["gpt-3.5-turbo", "gpt-4"]),
  temperature: z.array(z.number()).optional(),
  max_token: z.array(z.number()).optional(),
  top_p: z.array(z.number()).optional(),
});

export type TUpdateModelValidator = z.infer<typeof UpdateModelValidator>;
