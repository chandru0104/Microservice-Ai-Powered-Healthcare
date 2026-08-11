import { z } from "zod";

export const Validation = z.object({
  name: z
    .string()
    .min(1, "Product name is required"),

  description: z
    .string()
    .min(1, "Description is required"),

  // multipart/form-data sends all values as strings
  // z.coerce.number() auto-converts "120" → 120
  price: z
    .coerce.number()
    .positive("Price must be greater than 0"),

  expiryOn: z
    .string()
    .optional(),

  benefit: z
    .string()
    .min(1, "Benefit is required"),

  // image comes via req.files (multer), NOT req.body
  // so it must not be validated here — validated in the controller/service
  image: z
    .any()
    .optional(),

  variant: z
    .string()
    .min(1, "Variant is required"),

  subcategoryId: z
    .string()
    .min(1, "Subcategory ID is required"),

  categoryId: z
    .string()
    .min(1, "Category ID is required"),

  childCategoryId: z
    .string()
    .min(1, "Child category ID is required"),

  originId: z
    .string()
    .min(1, "Origin ID is required"),

  brandId: z
    .string()
    .min(1, "Brand ID is required"),

  ageGroupId: z
    .string()
    .min(1, "Age group ID is required"),

  returnPolicy: z
    .string()
    .min(1, "Return policy is required"),

  // z.coerce.number() auto-converts "12" → 12
  stock: z
    .coerce.number()
    .int()
    .nonnegative("Stock cannot be negative"),
});