import PostCard from "@/components/postCard"
import TagCard from "@/components/tagCard"
import Link from "next/link"
import { Rocket } from "@/assets/svg"
import { db } from "@/lib/db"


export default async function Blog() {

  const allPosts = await db.post.findMany({
    where: {
      type: "blog",
      published: true
    },
    include: {
      tags: true,
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
          <TagCard title={"标签"} tags={allTags} />
        </div>
        <div className="flex-1 px-[20px] py-[20px] rounded-lg bg-baseColor">
          {
            allPosts.length ? (
              <div>
                {allPosts.map((post) => (
                  <div
                    key={post.id}
                  >
                    <Link href={"/Blog/" + post.id}>
                      <PostCard title={post.title} abstract={post.des || "暂无介绍"} tags={post.tags} time={post.createdAt.toISOString()}></PostCard>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-[100px] text-baseColor text-[26px]">暂 无 文 章</p>
            )
          }
        </div>
      </div>
    </div>
  )
}