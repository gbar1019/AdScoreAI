import { z } from "zod";

export const audienceFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Describe the audience"),
  structuredFields: z.record(z.unknown()).optional(),
});

export type AudienceFormInput = z.infer<typeof audienceFormSchema>;
