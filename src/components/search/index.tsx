"use client"
import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Search } from '@/assets/svg';
import { toast } from "@/components/ui/use-toast"
import Fuse from "fuse.js"
import type FuseResult from "fuse.js"


const DialogDemo = () => {

    const [allposts, setAllposts] = useState([])
    const [result, setResult] = useState<FuseResult<any>[]>([])
    const fuseOptions = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
            "title",
            "tags.name",
        ]
    };

    const getList = async () => {
        const response = await fetch("/api/posts", {
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
        response.json().then(res => {
            const list = res.filter((item: any) => item.published === true)
            setAllposts(list)
        })
    }

    useEffect(() => {
        getList()
    })

    const fuse = new Fuse(allposts, fuseOptions);
    let res: any = []
    const handleChange = (e: any) => {
        // console.log(e.target.value)
        res = fuse.search(e.target.value)
        setResult(res)
    }

    const handleOpen = () => {
        setResult([])
    }


    return (
        <div className='text-baseColor '>
            <Dialog.Root onOpenChange={handleOpen}>
                <Dialog.Trigger asChild>
                    <button className='flex justify-center items-center h-[20px] w-[20px] max-md:mr-0 mr-[30px] border rounded-md leading-[30px] '>
                        <Search width="15" height="15" className={"custom-svg"} ></Search>
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="w-screen h-screen bg-slate-400 bg-opacity-20 fixed inset-0" />
                    <Dialog.Content className="bg-baseColor flex flex-col w-1/2 h-1/2 text-baseColor absolute p-10 bg-gary-700 rounded-xl top-1/4 left-1/2 
                -translate-y-1/4 -translate-x-1/2 shadow-2xl">
                        <Dialog.Close asChild>
                            <button className="h-[25px] w-[25px] inline-flex justify-center items-center absolute top-2 right-2" aria-label="Close">
                                ×
                            </button>
                        </Dialog.Close>
                        {/* <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title> */}
                        {/* <Dialog.Description className="DialogDescription">
                        Make changes to your profile here. Click save when you
                    </Dialog.Description> */}
                        <div>
                            <input onChange={handleChange} type="text" placeholder='请输入' className='h-[2.5rem] w-full border rounded-xl bg-baseColor text-baseColor px-[10px] focus:outline-none' />
                            {/* <button className="w-2/12 h-[2.5rem] bg-gray-500 text-baseColor rounded-e-xl">搜索</button> */}
                        </div>
                        <Dialog.Close asChild>
                            <div className='flex-1 w-full mt-[20px] overflow-y-auto scrollbar'>
                                {
                                    result ? result.map((post: any) => {
                                        return (
                                            <div key={post.item.id} className='h-[50px]'>
                                                { post.item.title }
                                            </div>
                                        )
                                    }) : <div>暂无结果</div>
                                }
                            </div>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )

};

export default DialogDemo;