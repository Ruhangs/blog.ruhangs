"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Post } from "@prisma/client"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"

import "@/styles/editor.css"
import { cn } from "@/lib/utils"
import { postPatchSchema } from "@/lib/validations/post"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Input } from "./ui/input"

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">
}

type FormData = z.infer<typeof postPatchSchema>

export function Editor({ post }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  })
  const ref = React.useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState<boolean>(false)
  const [isPublished, setIsPublished] = React.useState<boolean>(false)

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default

    const body = postPatchSchema.parse(post)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "请在此处键入以撰写您的文章...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [post])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()
      setIsPublished(post.published)

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor, post.published])

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    console.log("数据", isPublished);

    const blocks = await ref.current?.save()

    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
        published: isPublished
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

  if (!isMounted) {
    return null
  }

  const changeIsPublished = (event: any) => {
    setIsPublished(event.target.checked);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10 ">
        <div className="flex w-full items-center justify-between px-[30px] sticky top-[90px]">
          <div className="flex items-center space-x-10">
            <button
              onClick={() => router.back()}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                返 回 文 章 列 表
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

            <button type="submit" className={`${cn(buttonVariants())} bg-slate-500`}>
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>保 存</span>
            </button>
          </div>

        </div>
        <div className="prose prose-stone mx-auto dark:prose-invert w-[800px] h-full overflow-y-auto scrollbar">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden pl-[10%] bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <div id="editor" className="min-h-[500px]"></div>
          {/* <p className="text-sm text-gray-500">
            使用{" "}
            <kbd className="rounded-md border bg-muted px-1 text-sm uppercase">
              Tab
            </kbd>{" "}
           打开菜单栏.
          </p> */}
        </div>
      </div>
    </form>
  )
}
