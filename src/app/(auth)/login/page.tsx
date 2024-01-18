import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/base/icons"
import { Home } from "@/assets/svg"
import { UserAuthForm } from "@/components/form/user-auth-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href={"/"}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4 text-baseColor" />
        返回到博客
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Home width="150" height="50" className="mx-auto fill-amber-400" />
          <h1 className="text-2xl font-semibold tracking-tight">
            博客管理后台
          </h1>
          <p className="text-sm text-muted-foreground">
            请输入你的邮箱及密码进行登录
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          {/* <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          > */}
          暂不开放注册，仅私人使用
          {/* 没有账户? 请注册 */}
          {/* </Link> */}
        </p>
      </div>
    </div>
  )
}
