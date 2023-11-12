import Nav from "@/components/nav"
import Footer from "@/components/footer"

interface FrontLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: FrontLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav></Nav>
      {children}
      <Footer className="bg-secondary"></Footer>
    </div>
  )
}