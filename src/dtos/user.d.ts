type UserAPIRole = "admin" | "technician" | "customer";

type UserAPIResp = {
  token: string;
  user: {
    id: string;
    avatar: string | null;
    name: string;
    email: string;
    role: UserAPIRole;
  }
}
