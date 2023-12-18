import SideNav from '@/components/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
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