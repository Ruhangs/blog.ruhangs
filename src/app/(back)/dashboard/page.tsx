import React from 'react'
import { authOptions } from "@/lib/auth"
import { redirect } from 'next/navigation';
import { getCurrentUser } from "@/lib/session"

export default async function Dashboard() {
  // const { data: session, status } = useSession()
  // console.log(session, status);
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  return (
    <div className='bg-baseColor h-full rounded-md'>登录成功</div>
  )
}
