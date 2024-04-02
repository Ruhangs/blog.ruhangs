import React, { useEffect, useState } from 'react'
import { db } from '@/lib/db'
import Link from 'next/link'
export const revalidate = 10

type postType = {
  id: string, 
  createdAt: Date, 
  type: string, 
  title: string
}

export default async function ArticleList() {

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

//   let [allPosts, setAllPosts] = useState([])
//   let [classNum, setCalssNum] = useState(0)
//   let [tagNum, setTagNum] = useState(0)

//   const getInfo = async () => {
//     const response = await fetch("/api/posts/demo", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })

//     const classes = await fetch("/api/classes", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })

//     const tags = await fetch("/api/tags", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })

//     if (!response?.ok) {
//         return null
//     }

//     response.json().then(res => {
//         // const list = res.filter((item: any) => item.published === true)
//         console.log(res)
//         setAllPosts(res)
//     })

//     tags.json().then(res => {
//       setTagNum(res.length)
//     })
//     console.log(classes)

//     classes.json().then(res => {
//       setCalssNum(res.length)
//     })
// }

//   useEffect(() => {
//     getInfo()
//   },[])


  const classNum = await db.class.count()

  const tagNum = await db.tag.count()


  return (
    <div className='w-full bg-baseColor rounded-lg mt-[20px] px-[20px] py-[20px] text-center'>
      <span className='text-[22px] text-primary'>时 间 线</span>
      <p>{classNum + "分类 × " + tagNum + "标签 × " + allPosts.length + "文章 "}</p>
      <ul className='text-start mt-[20px]'>
        {
          allPosts.length !== 0 ? allPosts.map((post: postType) => {
            return (
              <li key={post.id} className='h-[30px] border-b-[1px] border-dashed border-dark truncate hover:border-light'>
                <span className='inline-block text-[#747474] w-[95px]'>{(new Date(post.createdAt)).toLocaleDateString()}</span>
                <Link href={post.type === "blog" ? `/Blog/${post.id}` : `/Note/${post.id}`} >{post.title}</Link>
              </li>
            )
          }) : (
            <p className="text-center mt-[100px] text-baseColor text-[26px]">暂 无 文 章</p>
          )
        }
      </ul>
    </div>
  )
}
