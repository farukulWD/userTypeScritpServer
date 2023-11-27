import z from 'zod';

export const OrderDataValidation = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const UsersValidationSchema = z.object({
  userId: z.number(),
  username: z
    .string()
    .min(1, 'Username must have at least 1 character')
    .max(25, 'Username must have at most 25 characters'),
  password: z.string().min(8, 'Password must have at least 8 character'),
  fullName: z.object({
    firstName: z
      .string()
      .min(1, 'First name must have at least 1 character')
      .max(25, 'First name must have at most 25 characters'),
    lastName: z
      .string()
      .min(1, 'Last name must have at least 1 character')
      .max(25, 'Last name must have at most 25 characters'),
  }),
  age: z.number().positive('Age must be a positive number'),
  email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Email must have at least 1 character')
    .max(25, 'Email must have at most 25 characters'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  isDeleted: z.boolean().default(false),
});

export default UsersValidationSchema;
