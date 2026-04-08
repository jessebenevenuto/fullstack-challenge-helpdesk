import { useState } from "react";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import * as z from "zod";

import { CircleAlert } from "lucide-react";

import { api } from "../../services/api";
import { Input } from "../../components/form/Input";
import { Button } from "../../components/Button";
import { FormLayout } from "../../components/layouts/FormLayout";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

const signUpSchema = z.object({
  name: z.string("Nome é obrigatório").trim().nonempty("Nome é obrigatório").min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.email("E-mail inválido").toLowerCase(),
  password: z.string("Senha obrigatória").trim().nonempty("Senha obrigatória").min(6, "Senha deve ter no mínimo 6 dígitos"),
});

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {control, handleSubmit, formState: { errors }, setValue } = useForm<SignUpFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  async function signUp(data: SignUpFormData) {
    try {
      setIsLoading(true);            
      const resp = await api.post("/users", data);
      
      setErrorMessage("");

      setValue("email", "");

      if(resp.status === 201) return navigate("/");

    } catch (error) {
      if(error instanceof AxiosError) {
        return setErrorMessage(error.response?.data.message);
      }

      alert("Não foi possível criar a conta.");

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(signUp)} className="w-full max-w-[25rem] flex flex-col gap-3">
      <FormLayout>
        <h1 className="text-xl text-gray-200 font-bold mb-[.125rem]">Crie sua conta</h1>
        <p className="text-sm text-gray-300">Informe seu nome, e-mail e senha</p>

        <div className="my-8 flex flex-col gap-4 lg:my-10">
          <div>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input              
                  label="nome"                  
                  placeholder="Digite o nome completo"
                  {...field}
                />
              )}
            />

            {errors.name?.message && (
              <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                <CircleAlert size={16} color="#d03e3e" />
                {errors.name.message}
              </span>
            )}
          </div>

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

            {errors.password?.message ? (
              <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                <CircleAlert size={16} color="#d03e3e" />
                {errors.password.message}
              </span>
            ) : (
              <span className="text-gray-400 flex items-center gap-1 mt-1.5 text-sm italic">
                Mínimo de 6 dígitos
              </span>
            )}
          </div>
        </div>

        <Button isLoading={isLoading} type="submit">Cadastrar</Button>

        {errorMessage && 
          <span className="text-feedback-danger flex items-center gap-1 mt-3">
            <CircleAlert size={16} color="#d03e3e" />
            {errorMessage}
          </span>        
        }
      </FormLayout>

      <FormLayout>
        <h2 className="text-lg text-gray-200 font-bold mb-[.125rem]">Já tem uma conta?</h2>
        <p className="text-sm text-gray-300 mb-[1.25rem] lg:mb-6">Entre agora mesmo</p>

        <Button role="link" styleVariant="link" onClick={() => navigate("/")}>Acessar conta</Button>
      </FormLayout>
    </form>
  );
}
