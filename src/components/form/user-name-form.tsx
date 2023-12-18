"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Profile, User } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { profilePatchSchema } from '@/lib/validations/post'
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/base/icons"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name" | "email" | "password">
  profile: Pick<Profile, "avatar" | 'github' | "grade" | "hometown" | "introduction" | "qq" | "university" | "weixin">
}

type FormData = z.infer<typeof profilePatchSchema>

export function UserNameForm({ user, profile, className, ...props }: UserNameFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(profilePatchSchema),
    defaultValues: {
      name: user?.name || "",
      email: user.email,
      password: user.password,
      github: profile.github || "",
      qq: profile.qq || "",
      weixin: profile.weixin || "",
      hometown: profile.hometown || "",
      university: profile.university || "",
      introduction: profile.introduction || ""
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)


    const response = await fetch(`/api/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        github: data.github,
        qq: data.qq,
        weixin: data.weixin,
        hometown: data.hometown,
        university: data.university,
        introduction: data.introduction
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your name has been updated.",
    })

    router.push(window.location.href);
    router.refresh();

  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="p-[20px]">
        <div className="flex flex-wrap justify-between">
          <div className="w-[45%] mb-[10px]">
            <Label className="inline-block mb-[10px]" htmlFor="name">
              昵称：
            </Label>
            <Input
              id="name"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{"请输入至少一个字符"}</p>
            )}
          </div>
          {/* TODO 头像上传 */}
          {/* <div className="w-[45%] mb-[10px]">
            <Label className="inline-block mb-[10px]" htmlFor="name">
              头像：
            </Label>
            <Input
              id="avatar"
              type="file"
              accept={accept}
              onChange={upload}
              className="hidden"
              size={32}
              {...register("avatar")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{"请输入至少一个字符"}</p>
            )}
          </div> */}
          <div className="w-[45%] mb-[10px]">
            <Label className="inline-block mb-[10px]" htmlFor="email">
              邮箱：
            </Label>
            <Input
              id="email"
              size={32}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">{"输入不能为空"}</p>
            )}
          </div>
          <div className="w-[45%] mb-[10px]">
            <Label className="inline-block mb-[10px]" htmlFor="password">
              密码：
            </Label>
            <Input
              id="password"
              size={32}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">{"输入不能为空"}</p>
            )}
          </div>
          <div className="w-[45%] mb-[10px]">
            <Label className="inline-block mb-[10px]" htmlFor="github">
              Github：
            </Label>
            <Input
              id="github"
              size={32}
              {...register("github")}
            />
            {errors?.github && (
              <p className="px-1 text-xs text-red-600">{"输入不能为空"}</p>
            )}
          </div>
          <div className="w-[45%] mb-[10px]">
            <Label className="inline-block mb-[10px]" htmlFor="qq">
              QQ
            </Label>
            <Input
              id="qq"
              size={32}
              {...register("qq")}
            />
            {errors?.qq && (
              <p className="px-1 text-xs text-red-600">{"输入不能为空"}</p>
            )}
          </div>
          <div className="w-[45%] mb-[10px]">
            <Label className="inline-block mb-[10px]" htmlFor="weixin">
              微信
            </Label>
            <Input
              id="weixin"
              size={32}
              {...register("weixin")}
            />
            {errors?.weixin && (
              <p className="px-1 text-xs text-red-600">{"输入不能为空"}</p>
            )}
          </div>
          <div className="w-[45%] mb-[10px]">
            <Label className="inline-block mb-[10px]" htmlFor="hometown">
              家乡
            </Label>
            <Input
              id="hometown"
              size={32}
              {...register("hometown")}
            />
            {errors?.hometown && (
              <p className="px-1 text-xs text-red-600">{"输入不能为空"}</p>
            )}
          </div>
          <div className="w-[45%] mb-[10px]">
            <Label className="inline-block mb-[10px]" htmlFor="university">
              毕业院校
            </Label>
            <Input
              id="university"
              size={32}
              {...register("university")}
            />
            {errors?.university && (
              <p className="px-1 text-xs text-red-600">{"输入不能为空"}</p>
            )}
          </div>
          <div className="w-[100%] mb-[30px]">
            <Label className="inline-block mb-[10px]" htmlFor="introduction">
              介绍
            </Label>
            <Input
              id="introduction"
              size={32}
              {...register("introduction")}
            />
            {errors?.introduction && (
              <p className="px-1 text-xs text-red-600">{"输入不能为空"}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className={`${cn(buttonVariants())} float-right`}
          disabled={isSaving}
        >
          {isSaving && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          <span>保存</span>
        </button>
      </div>
    </form>
  )
}
