import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router";
import { BriefcaseBusiness, ClipboardList, Plus, Users, Wrench} from "lucide-react";

import { NavLink } from "./NavLink";

export function Navbar() {
  const { session } = useAuth();
  const user = session?.user;

  const {pathname} = useLocation();

  return (
    <nav className="mt-4 xl:w-full xl:mt-0 xl:px-4">
      <ul role="list" className="flex flex-col gap-1">
        <NavLink active={pathname === "/"} link="/">
          <ClipboardList size={20} />
          Chamados
        </NavLink>

        {user?.role === "admin" && (
          <>
            <NavLink active={pathname === "/technicians"} link="/technicians">
              <Users size={20} />
              Técnicos
            </NavLink>

            <NavLink active={pathname === "/customers"} link="/customers">
              <BriefcaseBusiness size={20} />
              Clientes
            </NavLink>

            <NavLink active={pathname === "/services"} link="/services">
              <Wrench size={20} />
              Serviços
            </NavLink>
          </>
        )}

        {user?.role === "customer" && (
          <NavLink active={pathname === "/ticket/create"} link="/ticket/create">
            <Plus size={20} />
            Criar chamado
          </NavLink>       
        )}
      </ul>
    </nav>
  )
}
