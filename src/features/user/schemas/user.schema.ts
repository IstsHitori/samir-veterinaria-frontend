import z from "zod";

export const UserSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "auxiliar", "veterinario"]),
  emailValidated: z.boolean(),
  deletedAt: z.string().nullable(),
  isDeleted: z.boolean(),
  isActive: z.boolean(),
  lastLogin: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createUserSchema = z.object({
  firstName: z
    .string()
    .min(1, "El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z
    .string()
    .min(1, "El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(
      /[@$!%*?&#]/,
      "Debe contener al menos un carácter especial (@, $, !, %, *, ?, &, #)"
    ),
  role: z.enum(["auxiliar", "veterinario"], {
    error: "Selecciona un rol",
  }),
});

export const UserArraySchema = z.array(UserSchema);

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(1, "El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z
    .string()
    .min(1, "El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  role: z.enum(["auxiliar", "veterinario", "admin"], {
    error: "Selecciona un rol",
  }),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(
      /[@$!%*?&#]/,
      "Debe contener al menos un carácter especial (@, $, !, %, *, ?, &, #)"
    )
    .optional()
    .or(z.literal("")),
});

export type UpdateUserForm = z.infer<typeof updateUserSchema>;

export type User = z.infer<typeof UserSchema>;
export type UserArray = z.infer<typeof UserArraySchema>;
export type CreateUserForm = z.infer<typeof createUserSchema>;
