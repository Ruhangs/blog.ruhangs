interface EditorProps {
  children?: React.ReactNode
}

export default function EditorLayout({ children }: EditorProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-secondary text-baseColor">
      <div className='container mx-auto grid items-start gap-10 pt-[90px]'>
        {children}
      </div>
    </div>
  )
}