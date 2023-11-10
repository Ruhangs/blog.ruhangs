"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Class, Post, Tag } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from 'next/image'
import Vditor from "vditor";
import "@/styles/vditor.css";

import { cn } from "@/lib/utils"
import { postPatchSchema } from "@/lib/validations/post"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Input } from "./ui/input"
import Upload from "./upload"
import CheckBox from "./checkGroup"

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published" | "image" | "des">,
  selectTag: Tag[],
  selectClass: Class[]
}

type FormData = z.infer<typeof postPatchSchema>


export function Editor({ post, selectTag, selectClass }: EditorProps) {
  const { handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  })
  const router = useRouter()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isPublished, setIsPublished] = useState<boolean>(false)
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [allClasses, setAllClasses] = useState<Class[]>([])
  const [selectTags, setSelectTags] = useState<Tag[]>(selectTag)
  const [selectClasses, setSelectClasses] = useState<Class[]>(selectClass)
  const [newtitle, setTitle] = useState<string>(post.title)
  const [newDes, setDes] = useState<string>(post.des || "")
  // 图片上传
  const [imageSrc, setImageSrc] = useState(post.image || "");

  // md编辑器
  const [vd, setVd] = useState<Vditor>();

  // 检查是否挂载
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  // 初始化编辑器
  React.useEffect(() => {
    if (isMounted) {
      getInitData()
      const vditor = new Vditor("vditor", {
        after: () => {
          vditor.setValue(post.content?.toString() || "");
          setVd(vditor);
        },
        placeholder: "请在此输入正文...",
        toolbar: [
          "emoji", "headings", "bold", "italic", "strike", "|", "line", "quote", "list", "ordered-list", "check", "outdent", "indent",
          "code", "inline-code", "insert-after", "insert-before", "undo", "redo", "upload", "link", "table", "edit-mode",
          "both", "preview", "fullscreen", "outline", "code-theme", "export"
        ],
        toolbarConfig: {
          pin: true
        },
        counter: {
          enable: true
        }
      });
      setIsPublished(post.published)
    }
  }, [isMounted, post.content, post.published])

  // 获取初始值
  async function getInitData() {
    const response = await fetch("/api/tags", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      })
    }
    const responseClass = await fetch("/api/classes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      })
    }
    setAllTags(await response.json())
    setAllClasses(await responseClass.json())
  }

  // 提交数据
  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const blocks = await vd?.getValue()

    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newtitle,
        des: newDes,
        content: blocks,
        published: isPublished,
        image: imageSrc,
        tags: selectTags,
        class: selectClasses
      }),
    })
    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh()

    return toast({
      description: "Your post has been saved.",
    })
  }

  // 是否发布
  const changeIsPublished = (event: any) => {
    setIsPublished(event.target.checked);
  }

  // 选择标签
  const change = (selectValue: Tag[]) => {
    setSelectTags(selectValue)
  }
  // 选择分类
  const changeClass = (selectValue: Class[]) => {
    setSelectClasses(selectValue)
  }
  // 标题
  const changTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const changDesc = (e: any) => {
    setDes(e.target.value)
  }

  // 上传图片
  const upload = async (e: any) => {
    const imgFile = e.currentTarget.files[0]

    const formData = new FormData();
    formData.append('file', imgFile);
    formData.append('upload_preset', 'my-uploads');
    // TODO 配置环境变量
    const data = await fetch("https://api.cloudinary.com/v1_1/ducx0mgen/image/upload", {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    setImageSrc(data.secure_url);
  }

  // 未挂载返回null
  if (!isMounted) {
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-5 ">
        <div className="flex w-full items-center justify-between px-[10px]">
          <div className="flex items-center space-x-10">
            <button
              onClick={() => router.back()}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                返 回
              </>
            </button>
          </div>
          <div className="flex items-center">
            <Upload accept="image/*" upload={upload} imageSrc={imageSrc || ""} />
            <div className="flex mx-[30px] items-center">
              <span className=" font-semibold text-slate-500 mr-[8px]">发 布</span>
              <Input
                type="checkbox"
                id="isPublish"
                checked={isPublished}
                onChange={changeIsPublished}
                className="appearance-none block w-[20px] h-[20px] p-0 m-0 rounded-full border-[6px] checked:border-primary"
              />
            </div>
            <button type="submit" className={`${cn(buttonVariants())} bg-slate-500`}>
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>保 存</span>
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="flex-col items-center w-[90%] mx-auto ">
            <div className="w-[90%] mx-auto mb-[20px] flex items-center">
              <div className="w-[30%] mr-[30px]">
                <label htmlFor="title" ><p className="inline-block mb-[8px]">题目:</p></label>
                <Input
                  id="title"
                  type="text"
                  defaultValue={post.title}
                  className="w-[250px] text-lg active:border-none mr-[30px]"
                  onInput={changTitle}
                />
              </div>
              <div className="w-[60%]">
                <label htmlFor="desc"><p className="inline-block mb-[8px]">描述:</p></label>
                <Input
                  id="desc" 
                  defaultValue={post.des || ""}
                  className="text-lg"
                  onInput={changDesc}
                />
              </div>
            </div>
            <div className="h-[67vh] overflow-y-auto scrollbar-h">
              <div id="vditor" className="vditor" />
            </div>
          </div>
          <div className="w-[200px] ml-[20px] mr-[60px] mt-[20px]">
            <div>
              分类：
              <CheckBox
                className="flex w-[250px] h-[25vh] mr-[50px] mt-[10px] p-[10px] border rounded-lg overflow-y-auto scrollbar"
                options={allClasses}
                defaultValue={selectClasses}
                onChange={changeClass}
              />
            </div>
            <div className="mt-[30px]">
              标签：
              <CheckBox
                className="flex flex-wrap w-[250px] h-[25vh] mr-[50px] mt-[10px] p-[10px] border rounded-lg overflow-y-auto scrollbar"
                options={allTags}
                defaultValue={selectTags}
                onChange={change}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
