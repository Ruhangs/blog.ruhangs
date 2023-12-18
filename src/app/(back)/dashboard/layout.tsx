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
    <div className="h-screen bg-secondary text-baseColor">
      <div className='w-full px-[20px] lg:w-[80%] h-full mx-auto flex pt-[70px] '>
        <div className="flex-none w-64">
          <SideNav />
        </div>
        <div className="flex-grow m-4">{children}</div>
      </div>
    </div>
  );
}