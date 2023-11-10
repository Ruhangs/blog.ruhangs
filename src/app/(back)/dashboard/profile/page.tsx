import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { UserNameForm } from "@/components/user-name-form"

export default async function Profile() {

  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const userInfo = await db.user.findFirst({
    where: {
      id: user.id
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      profile: true
    }
  })



  return (
    <DashboardShell className='h-full relative bg-baseColor rounded-md px-5 py-5'>
      <DashboardHeader heading="个 人 管 理" text="" />
      {userInfo
        ? <UserNameForm
          className="w-[100%]"
          user={{
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password || ""
          }}
          profile={{
            avatar: userInfo.profile?.avatar || "",
            qq: userInfo.profile?.qq || "",
            weixin: userInfo.profile?.weixin || "",
            hometown: userInfo.profile?.hometown || "",
            introduction: userInfo.profile?.introduction || "",
            github: userInfo.profile?.github || "",
            grade: userInfo.profile?.grade || "",
            university: userInfo.profile?.university || ""
          }}
        />
        : <div>暂 无 信 息</div>}
    </DashboardShell>
  )
}
