import { Outlet } from "react-router";

import authLogo from "../../assets/auth-logo.svg";
import authBg from "../../assets/imgs/auth-bg.jpg";

export function AuthLayout() {
  return (
    <div className="w-full h-auto min-h-screen pt-8 lg:pt-3">
      <img className="fixed inset-0 w-full h-full" src={authBg} alt="" />

      <main className="relative bg-gray-600 px-6 pt-8 pb-6 rounded-t-[1.25rem] flex flex-col gap-6 items-center h-auto min-h-[calc(100vh-2rem)] mx-auto lg:max-w-1/2 lg:mx-0 lg:ml-auto lg:min-h-[calc(100vh-0.75rem)] lg:rounded-tr-none lg:py-12 lg:gap-8">
        <img src={authLogo} alt="Logo HelpDesk" />
        <Outlet />
      </main>
    </div>
  );
}
