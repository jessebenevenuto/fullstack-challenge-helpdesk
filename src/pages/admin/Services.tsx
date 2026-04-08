import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { api } from "../../services/api";

import { Ban, CircleAlert, CircleCheck, PenLine, Plus } from "lucide-react";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";
import { Table } from "../../components/table/Table";
import { TableHeader } from "../../components/table/TableHeader";
import { TableRow } from "../../components/table/TableRow";
import { TableData } from "../../components/table/TableData";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/form/Input";

import type { Service } from "../../types/service";
import { AmountInput } from "../../components/form/AmountInput";

type ServiceFormData = {
  title: string;
  price: number;
}

const serviceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "O título do serviço deve ter pelo menos 2 caracteres!"),
  price: z
    .number("O preço é obrigatório!")
    .positive("O preço precisa ser maior do que zero!"),    
})

export function Services() {
  const { session } = useAuth();
  const token = session?.token;

  const [services, setServices] = useState<Service[]>([]);
  const [service, setService] = useState<Service>({} as Service)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<ServiceFormData>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(serviceSchema),
  });

  async function fetchServices() {
    try {
      const resp = await api.get<ServiceAPIResp[]>("/services", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const { data } = resp;

      setServices(
        data.map((service) => ({
          id: service.id,
          title: service.title,
          price: service.price,
          status: service.status,
        }))
      );
      
    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar os serviços!");
    }
  }

  async function fetchService(id: string) {
    try {
      const resp = await api.get<ServiceAPIResp>(`/services/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      const { data } = resp;

      setService({
        id: data.id,
        title: data.title,
        price: data.price,
        status: data.status,
      });

      setValue("title", data.title);
      setValue("price", data.price);

      setIsUpdateModalOpen(true);

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar o serviço!");
    } 
  }

  async function createService(data: ServiceFormData) {
    try {
      await api.post("/services", data, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      await fetchServices();

      setIsCreateModalOpen(false);
      reset();

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível criar o serviço.");      
    }
  }

  async function updateService(data: ServiceFormData) {
    try {
      await api.put(`/services/${service.id}`, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      await fetchServices();
      setIsUpdateModalOpen(false);

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível atualizar as informações do serviço.");
    }
  }

  async function updateServiceStatus(status: "ativo" | "inativo", id: string) {
    try {
      await api.patch(`/services/${id}/status`, {status}, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      await fetchServices();

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível atualizar o status do serviço!");      
    }
  }

  useEffect(() => {
    fetchServices();
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <Title className="mb-0 lg:mb-0">Serviços</Title>
        <Button
          onClick={() => {
            reset();
            setIsCreateModalOpen(true)
          }}
          className="text-sm flex items-center justify-center basis-10 h-10 lg:basis-[5.75rem] lg:gap-2"
        >
          <Plus size={18} color="#F9FAFA" />
          <span className="hidden lg:block">Novo</span>
        </Button>
      </div>

      <Table>
        <thead>
          <tr className="h-12">
            <TableHeader>Título</TableHeader>
            <TableHeader>Valor</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="w-[8.625rem]"></TableHeader>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <TableRow id={service.id} key={service.id}>
              <TableData className="text-gray-200 font-bold text-sm">{service.title}</TableData>

              <TableData className="text-gray-200 text-sm w-[20.5rem]">
                {service.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableData>

              <TableData className="w-[6.75rem]">
                {service.status === "ativo" ? (
                  <span className="py-1.5 px-3 rounded-4xl bg-feedback-done-20 font-bold text-xs text-feedback-done">
                    Ativo
                  </span>
                ) : (
                  <span className="py-1.5 px-3 rounded-4xl bg-feedback-danger-20 font-bold text-xs text-feedback-danger">
                    Inativo
                  </span>
                )}
              </TableData>

             <TableData>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateServiceStatus(service.status === "ativo" ? "inativo" : "ativo", service.id)} className="cursor-pointer"
                  >
                    <div className="text-gray-300 text-xs font-bold w-[4.75rem]">
                      {service.status === "ativo" ? (
                        <span className="flex items-center gap-2">
                          <Ban size={14} color="#535964" />
                          Desativar
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <CircleCheck size={14} color="#535964" />
                          Reativar
                        </span>
                      )}
                    </div>
                  </button>

                  <Button
                    onClick={() => fetchService(service.id)}
                    styleVariant="iconSmall"
                    className="bg-gray-500"
                  >
                    <PenLine size={14} color="#1E2024" />
                  </Button>
                </div>
              </TableData>              
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal
        title="Cadastro de serviço"
        isOpen={isCreateModalOpen}
        close={setIsCreateModalOpen}
        bodyContent={
          <div>
            <form onSubmit={handleSubmit(createService)} className="mt-5">
              <div className="flex flex-col gap-4">
                <div>
                  <Controller
                    control={control}
                    name="title"                    
                    render={({ field }) => (
                      <Input
                        label="Título"
                        placeholder="Nome do serviço"                        
                        {...field}
                      />
                    )}
                  />

                  {errors.title?.message && (
                    <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                      <CircleAlert size={16} color="#d03e3e" />
                      {errors.title.message}
                    </span>
                  )}
                </div>

                <div>
                  <Controller
                    control={control}
                    name="price"
                    render={({ field }) => (
                      <AmountInput
                        label="Preço"
                        placeholder="R$ 0,00"
                        value={field.value}
                        onValueChange={(values) => field.onChange(values.floatValue)}
                      />
                    )}
                  />

                  {errors.price?.message && (
                    <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                      <CircleAlert size={16} color="#d03e3e" />
                      {errors.price.message}
                    </span>
                  )}                  
                </div>
              </div>

              <div className="mt-8">
                <Button className="text-sm" type="submit">Salvar</Button>
              </div>
            </form>            
          </div>
        }
      />

      <Modal
        title="Edição de serviço"
        isOpen={isUpdateModalOpen}
        close={setIsUpdateModalOpen}
        bodyContent={
          <div>
            <form onSubmit={handleSubmit(updateService)} className="mt-5">
              <div className="flex flex-col gap-4">
                <div>
                  <Controller
                    control={control}
                    name="title"                    
                    render={({ field }) => (
                      <Input
                        label="Título"
                        placeholder="Nome do serviço"                        
                        {...field}
                      />
                    )}
                  />

                  {errors.title?.message && (
                    <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                      <CircleAlert size={16} color="#d03e3e" />
                      {errors.title.message}
                    </span>
                  )}
                </div>

                <div>
                  <Controller
                    control={control}
                    name="price"
                    render={({ field }) => (
                      <AmountInput
                        label="Preço"
                        placeholder="R$ 0,00"
                        value={field.value}
                        onValueChange={(values) => field.onChange(values.floatValue ?? null)}
                      />
                    )}
                  />

                  {errors.price?.message && (
                    <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                      <CircleAlert size={16} color="#d03e3e" />
                      {errors.price.message}
                    </span>
                  )}                  
                </div>
              </div>

              <div className="mt-8">
                <Button className="text-sm" type="submit">Salvar</Button>
              </div>
            </form>            
          </div>
        }
      />      
    </div>
  );
}
