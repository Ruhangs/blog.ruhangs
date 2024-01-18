import SideNav from '@/components/dashboard/sidenav';

export default async function Layout({ children }: { children: React.ReactNode }) {

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