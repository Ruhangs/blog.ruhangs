"use client"
import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "@/styles/mdx.css"

interface Props {
  content: string
}

export default function Article({ content }: Props) {
  return (
    <div className={"markdown"}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const {children, className, node, ...rest} = props
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                showLineNumbers={true}
                PreTag="div"
                language={match[1]}
                style={darcula}
              >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            )
          }
        }}
      >{content}</Markdown>
    </div>
  )
}
