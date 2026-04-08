import { Outlet } from "react-router";
import { Menu } from "../navigation/Menu";

export function AppLayout() {
  return (
    <div className="bg-gray-100 min-h-screen h-auto flex xl:justify-end">
      <Menu />

      <main className="bg-gray-600 pt-7 pb-6 px-6 w-full mt-[5.75rem] h-auto rounded-t-[1.25rem] xl:rounded-t-none xl:rounded-tl-[1.25rem] xl:w-[calc(100%-12.5rem)] xl:px-12 xl:pb-12 xl:py-13 xl:mt-3">
        <Outlet />
      </main>
    </div>
  )
}