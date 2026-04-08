import { useNavigate } from "react-router";

import { Button } from "../components/Button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-auto min-h-screen flex items-center justify-center p-4 bg-[url(/src/assets/imgs/auth-bg.jpg)] bg-cover bg-no-repeat bg-center-top">
      <main className="bg-gray-600 rounded-2xl px-6 py-12">
        <h1 className="text-gray-200 text-2xl font-bold text-center">
          <span className="block text-4xl">404</span>
          Página não encontrada!
        </h1>
        <p className="mt-3 mb-6 text-gray-200">A página que você está tentando acessar não existe!</p>

        <Button onClick={() => navigate(-1)}>Voltar</Button>
      </main>
    </div>
  )
}
