import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppProps } from 'next/app';
import '../styles/globals.css'
import Nav from "@/components/base/nav"
import { NextAuthProvider } from '@/app/seesionProvider';


// import { Providers } from '@/redux/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "阮杭生的博客",
  description: '阮杭生的个人博客网站，用于记录个人的学习、生活、工作的点点滴滴',
}

export default function RootLayout({
  children,
  pageProps
}: {
  children: React.ReactNode,
  pageProps: AppProps["pageProps"]
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextAuthProvider>
          <Nav></Nav>
        </NextAuthProvider>
        {children}
      </body>
    </html>
  )
}
