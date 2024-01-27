import { z } from "zod";



const userValidationSchema=z.object({
    body:z.object({
        password: z
        .string({
          invalid_type_error: 'Password must be string',
        })
        .max(20, { message: 'Password can not be more than 20 characters' }),
        email: z.string().email(),
    })
})

export const UserValidation={userValidationSchema}