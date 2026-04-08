import { Routes, Route } from "react-router";

import { AppLayout } from "../components/layouts/AppLayout";

import { TicketsList } from "../pages/TicketsList";
import { CreateTicket } from "../pages/customer/CreateTicket";
import { TicketDetails } from "../pages/details/TicketDetails";

import { NotFound } from "../pages/NotFound";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<TicketsList />} />
        <Route path="/ticket/create" element={<CreateTicket />} />
        <Route path="/ticket/:id/details" element={<TicketDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}