import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

import { api } from "../services/api";

import { Title } from "../components/Title";
import { Table } from "../components/table/Table";
import { TableData } from "../components/table/TableData";
import { TableHeader } from "../components/table/TableHeader";
import { TableRow } from "../components/table/TableRow";
import { TicketStatus } from "../components/TicketStatus";
import { UserAvatar } from "../components/UserAvatar";

import type { Ticket } from "../types/ticket";

export function TicketsList() {
  const {session} = useAuth();
  const user = session?.user;
  const token = session?.token;

  const [tickets, setTickets] = useState<Ticket[]>([]);

  const navigate = useNavigate();

  async function fetchTickets() {
    try {
      const resp = await api.get<TicketAPIResp[]>("/tickets", {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      setTickets(
        resp.data.map((ticket) => ({
          id: ticket.id,
          updatedAt: new Date(ticket.updatedAt),
          title: ticket.title,
          service: ticket.ticketServices[0].service.title,
          total: ticket.ticketServices.reduce((accumulator, currentValue) => accumulator + currentValue.service.price, 0),
          customer: {
            avatarUrl: ticket.customer.avatarUrl,
            name: ticket.customer.name
          },
          technician: {
            avatarUrl: ticket.technician.avatarUrl,
            name: ticket.technician.name
          },
          status: ticket.status
        }))
      );

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar os chamados!");
    }
  }

  useEffect(() => {
    fetchTickets();
  }, [])

  return (
    <div>
      <Title>{user?.role !== "admin" && "Meus chamados"}</Title>

      <Table>
        <thead>
          <tr className="h-12">
            <TableHeader>Atualizado em</TableHeader>            
            <TableHeader>Título e Serviço</TableHeader>
            <TableHeader>Valor Total</TableHeader>
            <TableHeader>Cliente</TableHeader>
            <TableHeader>Técnico</TableHeader>
            <TableHeader>Status</TableHeader>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <TableRow onClick={() => navigate(`/ticket/${ticket.id}/details`)} key={ticket.id}>
              <TableData className="text-xs">{ticket.updatedAt.toLocaleDateString("pt-BR", {
                  hour: "numeric",
                  minute: "numeric", 
                })}
              </TableData>

              <TableData>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{ticket.title}</span>
                  <small className="text-xs">{ticket.service}</small>
                </div>
              </TableData>

              <TableData className="text-sm">{ticket.total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableData>

              <TableData>
                <div className="flex items-center gap-2">
                  <UserAvatar username={ticket.customer.name} />
                  <span className="text-sm capitalize">{ticket.customer.name}</span>
                </div>
              </TableData>

              <TableData>
                <div className="flex items-center gap-2">
                  <UserAvatar username={ticket.technician.name} />
                  <span className="text-sm">{ticket.technician.name}</span>
                </div>
              </TableData>

              <TableData className="max-w-[9.5rem]">
                <div>
                  <TicketStatus styleVariant={ticket.status} />
                </div>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
