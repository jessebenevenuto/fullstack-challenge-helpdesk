export type Technician = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  technicianTimes: {
    time: {
      id: number;
      time: string;
      minutes: number;
    }
  }[];
}
