import { Routes, Route } from "react-router";

import { AppLayout } from "../components/layouts/AppLayout";

import { TicketsList } from "../pages/TicketsList";
import { TicketDetails } from "../pages/details/TicketDetails";

import { Technicians } from "../pages/admin/Technicians";
import { CreateTechnician } from "../pages/admin/CreateTechnician";
import { UpdateTechnician } from "../pages/admin/UpdateTechnician";

import { Customers } from "../pages/admin/Customers";
import { Services } from "../pages/admin/Services";

import { NotFound } from "../pages/NotFound";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<TicketsList />} />
        <Route path="/ticket/:id/details" element={<TicketDetails />} />

        <Route path="/technicians" element={<Technicians />} />
        <Route path="/technician/create" element={<CreateTechnician />} />
        <Route path="/technician/:id/update" element={<UpdateTechnician />} />

        <Route path="/customers" element={<Customers />} />
        <Route path="/services" element={<Services />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}