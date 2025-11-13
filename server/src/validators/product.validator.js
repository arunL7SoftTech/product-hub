import { z } from "zod";

const urlRegex =
  /^(https?:\/\/)([\w\-]+(\.[\w\-]+)+)(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/i;

const productBaseSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0, "Price cannot be negative"),
  category: z.string().trim().min(1, "Category is required"),
  stock: z
    .number({
      required_error: "Stock is required",
      invalid_type_error: "Stock must be a number",
    })
    .min(0, "Stock cannot be negative"),
  image: z
    .string()
    .trim()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export const createProductSchema = productBaseSchema;

export const updateProductSchema = productBaseSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided",
  }
);

export const parseProductPayload = (schema, payload) => {
  const result = schema.safeParse(payload);

  if (!result.success) {
    const error = new Error("Validation error");
    error.status = 400;
    error.errors = result.error.flatten().fieldErrors;
    throw error;
  }

  return result.data;
};

