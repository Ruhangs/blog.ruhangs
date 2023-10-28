import React from 'react'

interface Props {
  title: String
}

export default function TagCard(props: Props) {
  const { title } = props
  return (
    <div className="w-full h-[500px] mr-[30px] px-[10px] py-[10px] sticky top-[100px] rounded-lg bg-baseColor">
      <div className="text-baseColor">
        <div className="text-[16px]">
          {title}
        </div>
        {
          "xxx xxx xxx xxx"
        }
      </div>

    </div>
  )
}
