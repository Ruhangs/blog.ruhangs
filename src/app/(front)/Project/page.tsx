import { Rocket } from "@/assets/svg"
import ProjectCard from "@/components/projectCard"
import { db } from "@/lib/db"
import Link from "next/link"

export default async function Project() {

  const allPosts = await db.post.findMany({
    where: {
      type: "project",
      published: true
    },
    include: {
      tags: true,
    }
  })


  return (
    <div className="flex-grow bg-secondary bgimg">
      <div  >
        <a className="fixed bottom-[100px] right-[80px] text-baseColor" href="#">
          {/* <Rocket className='custom-svg' /> */}
        </a>
      </div>
      <div className="w-full px-[20px] lg:w-9/12 mx-auto pt-[100px] pb-[30px] lg:px-[100px] ">
        <div className="bg-baseColor rounded-xl py-[20px] px-[20px]">
          {
            allPosts.length ? allPosts.map((post) => {
              return (<Link key={post.id} href={"/Project/" + post.id}>
                <ProjectCard title={post.title} image={post.image || ""} des={post.des || ""} tags={post.tags} />
              </Link>)

            }) : (
              <p className="text-center mt-[100px] text-baseColor text-[26px]">暂 无 项 目 文 档</p>
            )
          }
        </div>
      </div>
    </div>
  )
}