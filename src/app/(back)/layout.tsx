import Nav from "@/components/base/nav"
import Footer from "@/components/base/footer"

interface FrontLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: FrontLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
      {/* <Footer className="bg-secondary"></Footer> */}
    </div>
  )
}