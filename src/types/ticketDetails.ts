import type { Ticket } from "./ticket";

export type ticketDetails = Ticket & {
  description: string;
  createdAt: Date;
  technician: {
    email: string;
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
