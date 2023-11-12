import Profile from '@/components/profile'
import { Rocket } from "@/assets/svg"
import { db } from '@/lib/db'
import Link from 'next/link'

export default async function Home() {

  const allPosts = await db.post.findMany({
    where:{
      OR:[
        {type: "blog"},
        {type: "note"}
      ],
      published: true
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      type: true
    },
    orderBy: [
      {
        createdAt: "desc"
      }
    ]
  })

  const allBlogs = await db.post.findMany({
    where: {
      type: "blog",
      published: true,
    }
  })

  const allNotes = await db.post.findMany({
    where: {
      type: "note",
      published: true,
    }
  })

  const classes = await db.class.count()

  const tags = await db.tag.count()

  const profile = await db.user.findFirst({
    select:{
      name: true,
      email: true,
      profile: true
    }
  })


  return (
    <div className='flex-grow  bg-secondary text-baseColor bgimg'>
      <div id="goTop">
        <a className="fixed bottom-[100px] right-[80px] text-baseColor" href="#">
          {/* <Rocket className='custom-svg' /> */}
        </a>
      </div>
      <div className='flex w-10/12 mx-auto pt-[100px] pb-[30px] px-[100px]'>
        <Profile name={profile?.name || ""} email={profile?.email || ""} profile={profile?.profile || null}></Profile>
        <div className='pl-[330px] w-full'>
          <div className='flex w-full justify-between'>
            <div className='w-[48%] h-[150px] bg-baseColor rounded-lg px-[20px] py-[20px] text-center'>
              <span className='text-[22px] text-primary'>文 章</span>
              <div className="border border-dashed my-[20px]"></div>
              <span className='text-[22px] '>{allBlogs.length}</span>
            </div>
            <div className='w-[48%] h-[150px] bg-baseColor rounded-lg px-[20px] py-[20px] text-center'>
              <span className='text-[22px] text-primary'>笔 记</span>
              <div className="border border-dashed my-[20px]"></div>
              <span className='text-[22px]'>{allNotes.length}</span>
            </div>
          </div>

          <div className='w-full bg-baseColor rounded-lg mt-[20px] px-[20px] py-[20px] text-center'>
            <span className='text-[22px] text-primary'>时 间 线</span>
            <p>{ classes + "分类 × " + tags + "标签 × " + allPosts.length + "文章 "}</p>
            {/* <div className="border border-dashed my-[20px]"></div> */}
            <ul className='text-start mt-[20px]'>
              {
                allPosts ? (await allPosts).map((post) => {
                  return (
                    <li key={post.id} className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                      <span className='text-[#747474] mr-[5px]'>{post.createdAt.toLocaleDateString()}</span>
                      <Link href={post.type === "blog" ? `/Blog/${post.id}` : `/Note/${post.id}`}>{post.title}</Link>
                    </li>
                  )  
                }) : (
                  <p className="text-center mt-[100px] text-baseColor text-[26px]">暂 无 文 章</p>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
