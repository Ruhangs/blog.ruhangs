"use client"
import { RefObject, useRef } from "react"
import { useGoTop } from "@/hooks/useGoTop"
import Profile from '@/components/profile'
import { Rocket } from "@/assets/svg"


export default function Home() {
  const backRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  useGoTop(backRef)
  return (
    <div className='min-h-screen bg-secondary text-baseColor bgimg'>
      <div ref={backRef} >
        <a className="fixed bottom-[100px] right-[80px] text-baseColor" href="#">
          <Rocket className='custom-svg' />
        </a>
      </div>
      <div className='flex w-10/12 mx-auto pt-[100px] pb-[30px] px-[100px]'>
        <Profile ></Profile>
        <div className='pl-[330px] w-full'>
          <div className='flex w-full justify-between'>
            <div className='w-[48%] h-[150px] bg-baseColor rounded-lg px-[20px] py-[20px] text-center'>
              <span className='text-[22px] text-primary'>博  客</span>
              <div className="border border-dashed my-[20px]"></div>
              <span className='text-[22px] '>12</span>
            </div>
            <div className='w-[48%] h-[150px] bg-baseColor rounded-lg px-[20px] py-[20px] text-center'>
              <span className='text-[22px] text-primary'>笔  记</span>
              <div className="border border-dashed my-[20px]"></div>
              <span className='text-[22px]'>36</span>
            </div>
          </div>

          <div className='w-full bg-baseColor rounded-lg mt-[20px] px-[20px] py-[20px] text-center'>
            <span className='text-[22px] text-primary'>时 间 线</span>
            <p>xx分类 × xx文章 × xx标签 × xx字</p>
            {/* <div className="border border-dashed my-[20px]"></div> */}
            <ul className='text-start mt-[20px]'>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
              <li className='h-[30px] border-b-[1px] border-dashed border-dark hover:border-light'>
                <span className='text-[#747474] mr-[5px]'>2013-03-02</span>
                <a href="">demodemodmeodmoe</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
