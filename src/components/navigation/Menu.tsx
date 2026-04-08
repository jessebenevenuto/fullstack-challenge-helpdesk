import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { TextAlignJustify, X } from "lucide-react";

import { UserOptions } from "./UserOptions";
import { Navbar } from "./Navbar";

import logo from "../..//assets/logo.svg";
import { UserAvatar } from "../UserAvatar";

export function Menu() {
  const [isOpenUserOptions, setIsOpenUserOptions] = useState(false);
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);

  const { pathname } = useLocation();

  const { session } = useAuth();
  const user = session?.user;

  const userRoles = {
    admin: "admin",
    technician: "técnico",
    customer: "cliente",
  };

  function openSideMenu() {
    setIsOpenSideMenu(!isOpenSideMenu)
    setIsOpenUserOptions(false)
  }

  function openUserOptions() {
    setIsOpenUserOptions(!isOpenUserOptions)
    setIsOpenSideMenu(false)
  }

  useEffect(() => {
    setIsOpenSideMenu(false);
  }, [pathname])

  return (
    <>
      <aside 
        className="bg-gray-100 p-6 fixed top-0 left-0 w-full flex items-center justify-between xl:flex-col xl:h-screen xl:w-[200px] xl:items-start xl:px-0 xl:py-0"
      >
        <div className="flex items-center gap-4 xl:w-full xl:pt-9 xl:flex-col xl:gap-[1.25rem]">
          <button
            onClick={openSideMenu}
            className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-md cursor-pointer xl:hidden"
          >
            {isOpenSideMenu ? (
              <X size={20} color="#F9FAFA" />
            ): (
              <TextAlignJustify size={20} color="#f9fafa" />
            )}
          </button>

          <div className="flex items-center gap-3 xl:w-full xl:px-[1.25rem] xl:pb-6 xl:border-b-1 xl:border-gray-200">
            <img src={logo} alt="Help Desk logo" className="" />

            <div className="flex flex-col">
              <span className="text-gray-600 font-bold text-xl">HelpDesk</span>

              {user &&
                <small className="text-xs uppercase text-blue-light">
                  {userRoles[user?.role]}
                </small>
              }
            </div>
          </div>

          <div className="hidden xl:w-full xl:block">
            <Navbar />
          </div>
        </div>

        <div className="xl:px-[1.25rem] xl:py-[1.25rem] xl:flex xl:items-center xl:gap-3 xl:w-full xl:border-t-1 xl:border-gray-200">
          {user && (
            <UserAvatar onClick={openUserOptions} className="text-base xl:text-sm w-8 h-8" username={user?.name} />
          )}

          <div className="hidden xl:flex xl:flex-col">
            <button
              onClick={openUserOptions}
              className="text-sm text-gray-600 text-left cursor-pointer"
            >
              {user?.name}
            </button>
            <span title={user?.email} className="text-xs text-gray-400 w-[110px] whitespace-nowrap overflow-hidden text-ellipsis">
              {user?.email}
            </span>
          </div>
        </div>
      </aside>

      {isOpenSideMenu && (
        <aside className="min-w-[20.4375rem] px-5 py-4 bg-gray-100 fixed top-[6.25rem] left-6 rounded-[.625rem]">
          <span className="uppercase text-xs text-gray-400 font-bold">Menu</span>

          <Navbar />
        </aside>
      )}

      {isOpenUserOptions && <UserOptions />}
    </>
  )
}