"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Post } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Vditor from "vditor";
import "@/styles/vditor.css";

import { cn } from "@/lib/utils"
import { postPatchSchema } from "@/lib/validations/post"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Input } from "./ui/input"
import { Checkbox } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">
}

type FormData = z.infer<typeof postPatchSchema>

export function Editor({ post }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  })
  // const ref = React.useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState<boolean>(false)
  const [isPublished, setIsPublished] = React.useState<boolean>(false)
  const [array, setArray] = React.useState<string[]>([])

  const [vd, setVd] = React.useState<Vditor>();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      // initializeEditor()
      const vditor = new Vditor("vditor", {
        after: () => {
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

      // return () => {
      //   ref.current?.destroy()
      //   ref.current = undefined
      // }
    }
  }, [isMounted, post.published])

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    // console.log("数据", isPublished);

    // // const blocks = await ref.current?.save()

    // const response = await fetch(`/api/posts/${post.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: data.title,
    //     content: blocks,
    //     published: isPublished
    //   }),
    // })
    // setIsSaving(false)

    // if (!response?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your post was not saved. Please try again.",
    //     variant: "destructive",
    //   })
    // }

    // router.refresh()

    // return toast({
    //   description: "Your post has been saved.",
    // })
  }

  async function submitContent() {

    console.log(vd?.getValue());
  }

  if (!isMounted) {
    return null
  }

  const changeIsPublished = (event: any) => {
    setIsPublished(event.target.checked);
  }

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };


  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  



  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex mr-[30px] items-center">
            <span className=" font-semibold text-slate-500 mr-[8px]">发 布</span>
            <Input
              type="checkbox"
              id="isPublish"
              checked={isPublished}
              onChange={changeIsPublished}
              className="appearance-none block w-[20px] h-[20px] p-0 m-0 rounded-full border-[6px] checked:border-primary"
            />
          </div>

          <button type="submit" onClick={submitContent} className={`${cn(buttonVariants())} bg-slate-500`}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>保 存</span>
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="flex-col items-center w-[90%] mx-auto ">
          <div className="w-[50%] mx-auto mb-[20px] flex items-center">
            <span className="w-[60px]">
              标题：
            </span>
            <Input type="text" {...register("title")} />
          </div>
          <div className="h-[67vh] overflow-y-auto scrollbar-h">
            <div id="vditor" className="vditor" />
          </div>
        </div>
        <div className="w-[200px] ml-[20px] mr-[60px]">
          <div>
            分类：
            <div className={"flex flex-wrap mt-[20px] h-[30vh] border p-[10px]"}>
              <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} className="!text-baseColor"/>
            </div>
          </div>
          <div className="mt-[30px]">标签：
          </div>
        </div>
      </div>

    </div>
    // </form>
  )
}
