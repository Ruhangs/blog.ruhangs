import * as z from "zod"

export const postPatchSchema = z.object({
  title: z.string().min(1).max(128).optional(),
  des: z.string().min(1).max(128).optional(),
  content: z.any().optional(),
  published: z.boolean().optional(),
  image: z.string().optional(),
  count: z.number().optional(),
  tags: z.any().optional(),
  class: z.any().optional()
})

export const profilePatchSchema = z.object({
  name: z.string().min(1).max(20),
  email: z.string(),
  password: z.string(),
  avatar: z.string().optional(),
  introduction: z.string().min(1).max(128).optional(),
  weixin:    z.string(),
  qq :   z.string(),
  github:    z.string(),
  university:    z.string(),
  hometown:    z.string(),
})
