type TicketAPIStatus = "aberto" | "emAtendimento" | "encerrado";

type TicketAPIResp = {
  id: string;
  title: string;
  description: string;
  status: TicketAPIStatus;
  updatedAt: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  technician: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
  ticketServices: {
    service: {
      id: string;
      title: string;
      price: number;
    };
    isAdditional: boolean;
  }[];
};
