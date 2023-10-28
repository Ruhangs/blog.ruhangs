import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"
import TagCard from "@/components/tagCard"

import "@/styles/mdx.css"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

// import { env } from "env.js"
import { Back} from "@/assets/svg"
import { cn, formatDate } from "@/lib/utils"

interface PostPageProps {
  params: Params
}

interface Params {
  slug: Array<String>
}


async function getPostFromParams(params: Params) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

// export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
//   const post = await getPostFromParams(params)

//   if (!post) {
//     return {}
//   }
//   // const url = env.NEXT_PUBLIC_APP_URL

//   // // 图片地址
//   // const ogUrl = new URL(`${url}/api/og`)
//   // ogUrl.searchParams.set("heading", post.title)
//   // ogUrl.searchParams.set("type", "Blog Post")
//   // ogUrl.searchParams.set("mode", "dark")

//   return {
//     title: post.title,
//     description: post.description,
//     // authors: post.authors.map((author) => ({
//     //   name: author,
//     // })),
//     // openGraph: {
//     //   title: post.title,
//     //   description: post.description,
//     //   type: "article",
//     //   // url: absoluteUrl(post.slug),
//     //   // images: [
//     //   //   {
//     //   //     url: ogUrl.toString(),
//     //   //     width: 1200,
//     //   //     height: 630,
//     //   //     alt: post.title,
//     //   //   },
//     //   // ],
//     // },
//     // twitter: {
//     //   card: "summary_large_image",
//     //   title: post.title,
//     //   description: post.description,
//     //   // images: [ogUrl.toString()],
//     // },
//   }
// }

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  // 获得文章
  const post = await getPostFromParams(params)
  // console.log(post);

  if (!post) {
    notFound()
  }

  // const authors = post.authors.map((author) =>
  //   allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  // )

  return (
    <div className="bg-secondary text-baseColor">
      <article className="w-9/12 mx-auto flex pt-[100px] pb-[50px] px-[50px]">
        <Link
          href="/Note"
          className="fixed top-[100px] flex"
        >
          <Back className="custom-svg mr-2 h-6 w-6" />
          返回
        </Link>
        <div className="flex-1 pl-[100px]">
          <div>
            {post.date && (
              <time
                dateTime={post.date}
                className="block text-sm text-muted-foreground"
              >
                发布于 {formatDate(post.date)}
              </time>
            )}
            <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
              {post.title}
            </h1>
          </div>
          {/* {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )} */}
          <Mdx code={post.body.code} />
        </div>
        <div className="w-[250px] ml-[30px] mr-[-30px]">
          <TagCard title={"目录"} />
        </div>
      </article>

    </div>

  )
}
