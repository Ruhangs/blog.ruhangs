import NavLinks from '@/components/ui/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';
// import { PowerIcon } from '@heroicons/react/24/outline';
// import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="pb-[10px] md:flex md:h-full md:flex-col md:px-2 lg:px-3 md:py-4">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-baseColor md:block"></div>
      </div>
    </div>
  );
}