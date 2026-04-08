import { useState } from "react";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import * as z from "zod";

import { CircleAlert } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { Input } from "../../components/form/Input";
import { Button } from "../../components/Button";
import { FormLayout } from "../../components/layouts/FormLayout";

type SignInFormData = {
  email: string;
  password: string;
};

const signInSchema = z.object({
  email: z.email("E-mail inválido").toLowerCase(),
  password: z.string("Senha obrigatória").trim().nonempty("Senha obrigatória"),
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const auth = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const navigate = useNavigate();  

  async function signIn(data: SignInFormData) {
    try {
      setIsLoading(true);
      const resp = await api.post("/sessions", data);
      auth.saveUser(resp.data);

      setErrorMessage("");

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return setErrorMessage(error.response?.data.message);
      }

      // alert("E-mail ou senha inválidos");

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(signIn)} className="w-full max-w-[25rem] flex flex-col gap-3">
      <FormLayout>
        <h1 className="text-xl text-gray-200 font-bold mb-[.125rem]">Acesse o portal</h1>
        <p className="text-sm text-gray-300">Entre usando seu e-mail e senha cadastrados</p>

        <div className="my-8 flex flex-col gap-4 lg:my-10">
          <div>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  label="e-mail"
                  type="email"
                  placeholder="exemplo@email.com"
                  {...field}
                />
              )}
            />

            {errors.email?.message && (
              <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                <CircleAlert size={16} color="#d03e3e" />
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  label="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  {...field}
                />
              )}
            />
            {errors.password?.message && (
              <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                <CircleAlert size={16} color="#d03e3e" />
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <Button isLoading={isLoading} type="submit">Entrar</Button>

        {errorMessage && 
          <span className="text-feedback-danger flex items-center gap-1 mt-3">
            <CircleAlert size={16} color="#d03e3e" />
            {errorMessage}
          </span>
        }
      </FormLayout>

      <FormLayout>
        <h2 className="text-lg text-gray-200 font-bold mb-[.125rem]">Ainda não tem uma conta?</h2>
        <p className="text-sm text-gray-300 mb-[1.25rem] lg:mb-6">Cadastre agora mesmo</p>

        <Button styleVariant="link" onClick={() => navigate("/signup")}>Criar conta</Button>
      </FormLayout>
    </form>
  );
}
