import { Class, Tag } from "@prisma/client";

export interface Post {
  id: string,
  published: boolean,
  type: string,
  title: string,
  class: Class[],
  tags: Tag[],
  des: string | null,
  createdAt: Date,
  image: string | null,
  count: number | null
}