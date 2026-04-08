import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loading";

import { AuthRoutes } from "./AuthRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { TechnicianRoutes } from "./TechnicianRoutes";
import { CustomerRoutes } from "./CustomerRoutes";

export function Routes() {
  const { session, isLoading } = useAuth();

  function Route() {
    switch(session?.user.role) {
      case "admin":
        return <AdminRoutes />;
      case "technician":
        return <TechnicianRoutes />;
      case "customer":
        return <CustomerRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  if(isLoading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
