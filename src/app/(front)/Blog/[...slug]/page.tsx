import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Article from "@/components/article"
import Catalogue from "@/components/catalogue"

import { Back } from "@/assets/svg"
import { db } from "@/lib/db"

interface PostPageProps {
  params: Params
}

interface Params {
  slug: string[]
}


async function getPostFromParams(params: Params) {

  const post = await db.post.findFirst({
    where: {
      id: params.slug[0]
    },
    select: {
      title: true,
      createdAt: true,
      image: true,
      content: true,
    }
  })

  if (!post) {
    null
  }

  return post
}


export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }


  return (
    <div className="min-h-screen bg-secondary text-baseColor">
      <article className="w-9/12 mx-auto flex pt-[100px] pb-[50px] px-[50px]">
        <Link
          href="/Blog"
          className="fixed top-[100px] flex"
        >
          <Back className="custom-svg mr-2 h-6 w-6" />
          返回
        </Link>
        <div className="flex-1 pl-[100px]">
          <div>
            {post.createdAt && (
              <time
                // dateTime={post.createdAt}
                className="block text-sm text-muted-foreground"
              >
                发布于 {post.createdAt.toISOString().split("T")[0]}
              </time>
            )}
            <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
              {post.title}
            </h1>
          </div>
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              width={720}
              height={405}
              className="my-8 rounded-md bg-muted transition-colors"
              // priority {post.content?.toString()}
            />
          )}
          <Article content={post.content?.toString() || ''}></Article>
        </div>
        <div className="w-[250px] ml-[30px] mr-[-30px]">
          <Catalogue content={post.content?.toString() || ''}></Catalogue>
        </div>
      </article>

    </div>

  )
}
