import PostCard from "@/components/front/postCard"
import TagCard from "@/components/front/tagCard"
import Link from "next/link"
import { Rocket } from "@/assets/svg"
import { db } from "@/lib/db"
import { Post } from "@/types/post"

export const dynamic = "force-dynamic"

export default async function Note({
  searchParams,
}: {
  searchParams?: {
    type?: string;
    id?: string;
  };
}) {

  const type = searchParams?.type || '';
  const tagId = searchParams?.id || '';
  let allPosts: Post[] = []
  const fiterPost = (res: any) => {
    if (res.length) {
      allPosts = res[0].posts
    }
    allPosts = allPosts.filter(post => (post.published === true && post.type === "note"))
  }

  switch (type) {
    case "class":
      const classRes = await db.class.findMany({
        where: {
          id: tagId,
        },
        select: {
          posts: {
            select: {
              id: true,
              published: true,
              type: true,
              title: true,
              class: true,
              tags: true,
              des: true,
              createdAt: true,
              image: true
            }
          }
        }
      })
      fiterPost(classRes)
      break;
    case "tag":
      const tagRes = await db.tag.findMany({
        where: {
          id: tagId,
        },
        select: {
          posts: {
            select: {
              id: true,
              published: true,
              type: true,
              title: true,
              class: true,
              tags: true,
              des: true,
              createdAt: true,
              image: true
            }
          }
        }
      })
      fiterPost(tagRes)
      break;
    default:
      allPosts = await db.post.findMany({
        where: {
          type: "note",
          published: true,
        },
        include: {
          class: true,
          tags: true
        }
      })
      break;
  }

  const allClass = await db.class.findMany({
    select: {
      id: true,
      name: true,
    }
  })

  const allTags = await db.tag.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  return (
    <div className="flex-grow bg-secondary bgimg">
      <div>
        <a className="fixed bottom-[100px] right-[80px] text-baseColor" href="#">
          {/* <Rocket className='custom-svg' /> */}
        </a>
      </div>
      <div className="w-full px-[20px] py-[100px] lg:flex lg:w-9/12 lg:mx-auto lg:px-[100px] ">
        <div className="max-lg:hidden lg:w-[300px] lg:pr-[30px]">
          <TagCard classes={allClass} tags={allTags} />
        </div>
        <div className="flex-1">
          {
            allPosts.length ? (
              <div>
                {allPosts.map((post) => (
                  <div
                    key={post.id}
                  >
                    <Link href={"/Note/" + post.id}>
                      <PostCard title={post.title} abstract={post.des || "暂无介绍"} tags={post.tags} classes={post.class} imgSrc={post.image} time={post.createdAt.toISOString()}></PostCard>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-[100px] text-baseColor text-[26px]">暂 无 笔 记</p>
            )
          }
        </div>
      </div>
    </div>
  )
}