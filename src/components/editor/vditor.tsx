"use client"
import React, { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Class, Post, Tag } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Vditor from "vditor";
import "@/styles/vditor.css";

import { cn } from "@/lib/utils"
import { postPatchSchema } from "@/lib/validations/post"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/base/icons"
import { Input } from "../ui/input"
import Upload from "./upload"
import CheckBox from "./checkGroup"
import { Add, Cancel, Submit } from "@/assets/svg"

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published" | "image" | "des">,
  selectTag: Tag[],
  selectClass: Class[]
  allTag: Tag[],
  allClass: Class[]
}

type FormData = z.infer<typeof postPatchSchema>


export function Editor({ post, selectTag, selectClass, allTag, allClass }: EditorProps) {
  const { handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  })
  const router = useRouter()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isPublished, setIsPublished] = useState<boolean>(false)
  const [selectTags, setSelectTags] = useState<Tag[]>(selectTag)
  const [selectClasses, setSelectClasses] = useState<Class[]>(selectClass)
  const [newtitle, setTitle] = useState<string>(post.title)
  const [newDes, setDes] = useState<string>(post.des || "")
  // 图片上传
  const [imageSrc, setImageSrc] = useState(post.image || "");
  // 标签
  const [tagHidden, setTagHidden] = useState<boolean>(false)
  const [classHidden, setClassHidden] = useState<boolean>(false)


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
      const vditor = new Vditor("vditor", {
        after: () => {
          vditor.setValue(post.content?.toString() || "");
          setVd(vditor);
        },
        placeholder: "请在此输入正文...",
        toolbar: [
          "emoji", "headings", "bold", "italic", "strike", "|", "line", "quote", "list", "ordered-list", "check", "outdent", "indent",
          "code", "inline-code", "link", "table", "|", "insert-after", "insert-before", "undo", "redo", "upload", "preview", "outline", "fullscreen", "code-theme",
        ],
        toolbarConfig: {
          pin: true
        },
        outline: {
          enable: false,
          position: "right"
        },
        mode: "ir",
        minHeight: 500
      });
      setIsPublished(post.published)
    }
  }, [isMounted, post.content, post.published])

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

  // 介绍
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

  const [name, setName] = useState<string>()

  const handleInput = (e: any) => {
    setName(e.target.value)
  }



  const handleDisplay = (type: string, value: boolean) => {
    if (type === "class") {
      setClassHidden(value)
    } else {
      setTagHidden(value)
    }

  }

  const handleSubmitName = async (type: string) => {
    // 与后台交互
    if (type === "class") {
      const response = await fetch(`/api/classes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      })

      if (!response?.ok) {
        return toast({
          title: "Something went wrong.",
          description: "Your post was not saved. Please try again.",
          variant: "destructive",
        })
      }
      setClassHidden(false)
      router.push(window.location.href);
      router.refresh();

      return toast({
        description: "Your post has been saved.",
      })
    } else {
      const response = await fetch(`/api/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      })


      if (!response?.ok) {
        return toast({
          title: "Something went wrong.",
          description: "Your post was not saved. Please try again.",
          variant: "destructive",
        })
      }

      setTagHidden(false)
      router.push(window.location.href);
      router.refresh();
      return toast({
        description: "提交成功",
      })
    }
  }

  // 未挂载返回null
  if (!isMounted) {
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-5 ">
        <div className="flex w-full items-center justify-between ">
          <div className="flex items-center space-x-10">
            <button
              onClick={() => router.back()}
              className={`${cn(buttonVariants())} bg-slate-500`}
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
        <div className="flex-col  rounded-xl px-[20px] w-full">
          <div className="lg:flex">
            <div className="flex-col items-center justify-center">
              {/* 题目和描述 */}
              <div className="max-lg:flex">
                <div className="w-[300px] mx-auto mb-[10px]">
                  <label htmlFor="title" ><p className="inline-block mb-[8px]">题目:</p></label>
                  <Input
                    id="title"
                    type="text"
                    defaultValue={post.title}
                    className="text-lg"
                    onInput={changTitle}
                  />
                </div>
                <div className="w-[300px] mx-auto">
                  <label htmlFor="desc"><p className="inline-block mb-[8px]">描述:</p></label>
                  <Input
                    id="desc"
                    defaultValue={post.des || ""}
                    className="text-lg"
                    onInput={changDesc}
                  />
                </div>
              </div>

              {/* 分类 */}
              <div className="max-lg:flex lg:mt-[10px]">
                <div className="w-[300px] mx-auto">
                  <div className="flex items-center">
                    分类：
                    <Input type='text' onChange={handleInput} className={!classHidden ? "hidden" : 'w-[100px] h-6'} />
                    <Add className={classHidden ? "hidden" : " custom-svg ml-[8px]"} width="20" height="20" onClick={() => handleDisplay("class", true)} />
                    <Submit className={!classHidden ? "hidden" : " custom-svg ml-[8px]"} width="20" height="20" onClick={() => handleSubmitName("class")} />
                    <Cancel className={!classHidden ? "hidden" : " custom-svg ml-[8px]"} width="20" height="20" onClick={() => handleDisplay("class", false)} />
                  </div>
                  <CheckBox
                    className="flex flex-wrap w-[300px] max-h-[20vh] mt-[10px] p-[10px] border rounded-lg overflow-y-auto scrollbar"
                    options={allClass}
                    defaultValue={selectClasses}
                    onChange={changeClass}
                    type="class"
                  />
                </div>
                <div className="w-[300px] mx-auto lg:mt-[10px]">
                  <div className="flex items-center">
                    标签：
                    <Input type='text' onChange={handleInput} className={!tagHidden ? "hidden" : 'w-[100px] h-6'} />
                    <Add className={tagHidden ? "hidden" : " custom-svg ml-[8px]"} width="20" height="20" onClick={() => handleDisplay("tag", true)} />
                    <Submit className={!tagHidden ? "hidden" : " custom-svg ml-[8px]"} width="20" height="20" onClick={() => handleSubmitName("tag")} />
                    <Cancel className={!tagHidden ? "hidden" : " custom-svg ml-[8px]"} width="20" height="20" onClick={() => handleDisplay("tag", false)} />
                  </div>
                  <CheckBox
                    className="flex flex-wrap w-[300px] max-h-[20vh] mt-[10px] p-[10px] border rounded-lg overflow-y-auto scrollbar"
                    options={allTag}
                    defaultValue={selectTags}
                    onChange={change}
                    type="tag"
                  />
                </div>
              </div>
            </div>
            {/* 编辑器 */}
            <div className="lg:ml-[40px] w-full">
              正文：
              <div className="max-h-[70vh] mt-[8px] overflow-y-auto scrollbar-h">

                <div id="vditor" className="vditor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
