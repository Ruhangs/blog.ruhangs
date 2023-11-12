"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Tag } from '@prisma/client'

interface Props {
  options: Tag[],
  defaultValue: Tag[],
  onChange: Function
  className: string,
  type: string
}


export default function CheckGroup({ options, defaultValue, onChange, className, type }: Props) {

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
        options.length ? options.map((option) => {
          return (
              <div className='flex items-center w-[90px] h-[22px]' key={option.id} >
                <Input
                  type="checkbox"
                  value={option.id}
                  defaultChecked={defaultValue.findIndex((tag) => (tag.id === option.id)) !== -1}
                  onChange={() => handelChange(option)}
                  className='w-[14px] mr-[6px]'
                />
                {option.name}
              </div>
          )
        }) : <p>暂无分类标签，请添加...</p>
      }
    </div>
  )
}
