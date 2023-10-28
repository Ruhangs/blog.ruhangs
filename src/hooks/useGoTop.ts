import { RefObject, useEffect } from "react"

export function useGoTop(eleRef: RefObject<HTMLDivElement>){

  const handleScroll = () => {
    const top = document.documentElement.scrollTop
    if (top > 500) {
      console.log(top);
      eleRef.current?.classList.remove("hidden")
    } else {
      eleRef.current?.classList.add("hidden")
    }
  }

  useEffect(() => {
    eleRef.current?.classList.add("hidden")
    addEventListener("scroll", handleScroll)
    return () => {
      removeEventListener("scroll", handleScroll)
    }
  })
}