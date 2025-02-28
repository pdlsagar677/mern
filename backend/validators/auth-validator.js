import {z} from 'zod';

// Creating an object schema for registration
const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(255, { message: "Username must not be more than 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least 7 characters" })
    .max(1024, { message: "Password can't be greater than 1024 characters" }),
});

export default signupSchema;