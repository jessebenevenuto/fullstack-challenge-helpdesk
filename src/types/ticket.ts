export type Ticket = {
  id: string;
  updatedAt: Date;
  title: string;
  service: string;
  total: number;
  customer: {
    avatarUrl: string | null;
    name: string;
  };
  technician: {
    avatarUrl: string | null;
    name: string;
  };
  status: TicketAPIStatus;
}
