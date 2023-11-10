"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Tag } from '@prisma/client'
import { Sarpanch } from 'next/font/google'

interface Props {
  options: Tag[],
  defaultValue: Tag[],
  onChange: Function
  className: string
}


export default function CheckGroup({ options, defaultValue, onChange, className }: Props) {

  const handelChange = (value: Tag) => {
    let newValue = [...defaultValue]
    let index = newValue.findIndex((tag) => {
      return tag.id === value.id
    }) 
    if (index !== -1) {
      // 如果已被选中，则从数组中删除该选项
      newValue.splice(index, 1)
    } else {
      // 如果为被选中，则添加
      newValue.push(value);
    }
    // 更新 state
    onChange(newValue)
  }


  return (
    <div className={className}>
      {
        options ? options.map((option) => {
          return (
            <div className='flex items-center w-[100px] h-[20px]' key={option.id} >
              <Input
                type="checkbox"
                value={option.id}
                defaultChecked={defaultValue.findIndex((tag) => (tag.id === option.id)) !== -1}
                onChange={() => handelChange(option)}
                className='w-[16px] mr-[6px]'
              />
              {option.name}
            </div>
          )
        }) : <div>暂无分类标签</div>
      }
    </div>
  )
}
