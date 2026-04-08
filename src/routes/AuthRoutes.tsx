import { Routes, Route } from "react-router";

import { AuthLayout } from "../components/layouts/AuthLayout";
import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
import { NotFound } from "../pages/NotFound";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
