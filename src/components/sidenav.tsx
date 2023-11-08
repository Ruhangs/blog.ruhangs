import NavLinks from '@/components/ui/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';
// import { PowerIcon } from '@heroicons/react/24/outline';
// import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-baseColor md:block"></div>
        {/* <div className='h-[48px] w-full text-center leading-[30px] gap-2 text-baseColor rounded-md bg-baseColor hover:bg-sky-100 hover:text-yellow-600 p-3 text-sm font-medium  md:p-2 md:px-3' >
          <form
          // action={async () => {
          //   // 'use server';
          //   // await signOut();
          // }}
          >
            <button className="">
              <div>退出后台登录</div>
            </button>
          </form>
        </div> */}
      </div>
    </div>
  );
}