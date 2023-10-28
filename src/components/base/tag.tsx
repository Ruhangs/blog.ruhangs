import React from 'react'

interface Props {
  name: String
}

export default function Tag(props: Props) {
  const { name } = props
  return (
    <span className='inline-box rounded-sm px-[3px] py-[1px] mr-[5px] pointer-events-none bg-tag text-thirdary text-[14px]'>{name}</span>
  )
}
