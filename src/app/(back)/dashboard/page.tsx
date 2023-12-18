import React from 'react'
import { authOptions } from "@/lib/auth"
import { redirect } from 'next/navigation';
import { getCurrentUser } from "@/lib/session"

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <div className='bg-baseColor h-full rounded-md flex items-center justify-center text-xxl'>欢迎来到ruhangs后台管理系统</div>
  )
}
