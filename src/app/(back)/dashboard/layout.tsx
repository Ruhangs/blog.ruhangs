import SideNav from '@/components/dashboard/sidenav';
import { authOptions } from "@/lib/auth"
import { redirect } from 'next/navigation';
import { getCurrentUser } from "@/lib/session"

export default async function Layout({ children }: { children: React.ReactNode }) {

  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <div className="max-md:p-[20px] h-screen bg-secondary text-baseColor">
      <div className='flex flex-col w-full h-full pt-[70px] mx-auto md:flex-row md:px-[20px] lg:px-[60px] '>
        <div className="flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow md:m-4">{children}</div>
      </div>
    </div>
  );
}