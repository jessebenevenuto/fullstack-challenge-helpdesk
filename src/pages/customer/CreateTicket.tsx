import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CircleAlert } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Button";
import { Input } from "../../components/form/Input";
import { SelectInput } from "../../components/form/SelectInput";
import { TextArea } from "../../components/form/TextArea";
import { FormLayout } from "../../components/layouts/FormLayout";
import { Title } from "../../components/Title";

import { api } from "../../services/api";
import type { Service } from "../../types/service";

type CreateTicketFormData = {
  title: string;
  description: string;
  serviceId: string;
}

const createTicketSchema = z.object({
  title: z
    .string("Título do chamado é obrigatório")
    .trim()
    .min(2, "Título do chamado deve conter pelo menos 2 caracteres!"),
  description: z
    .string("Descrição do chamado é obrigatória")
    .trim()
    .min(10, "Descrição do chamado deve conter pelo menos 10 caracteres!"),
  serviceId: z.uuid("Selecione corretamente o serviço!"),
});

export function CreateTicket() {
  const { session } = useAuth();
  const token = session?.token;

  const { handleSubmit, register, formState: { errors }, getValues } = useForm<CreateTicketFormData>({
    defaultValues: {
      title: "",
      description: "",
      serviceId: "",
    },
    resolver: zodResolver(createTicketSchema),
  });

  const [services, setServices] = useState<Service[]>([]);
  const [currentService, setCurrentService] = useState<Service>({} as Service);

  const navigate = useNavigate();

  async function fetchServices() {
    try {
      const resp = await api.get<ServiceAPIResp[]>(`/services`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

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

  async function createTicket(data: CreateTicketFormData) {
    try {
      await api.post("/tickets", data, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      navigate("/");

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível criar o chamado!");
    }
  }

  function getTicketSummary() {
    const { serviceId } = getValues();
    const service = services.find((service) => service.id === serviceId);

    if(service) {
      setCurrentService(service);
    }
    console.log("aadwadawda");
  }

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="max-w-[45rem] mx-auto lg:max-w-[55rem]">
      <Title>Novo chamado</Title>

      <form className="flex flex-col gap-4 lg:flex-row lg:gap-6" onSubmit={handleSubmit(createTicket)}>
        <FormLayout className="p-5">
          <h3 className="text-base font-bold text-gray-200">Informações</h3>
          <p className="text-gray-300 text-xs mt-1">
            Configure os dias e horários em que você está disponível para atender chamados
          </p>

          <div className="mt-5 flex flex-col gap-5">
            <div>
              <Input
                label="Título"
                placeholder="Digite um título para o chamado"
                {...register("title")}
              />

              {errors.title?.message && (
                <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                  <CircleAlert size={16} color="#d03e3e" />
                  {errors.title.message}
                </span>
              )}              
            </div>

            <div>
              <TextArea
                id="description"
                label="Descrição"
                placeholder="Descreva o que está acontecendo"
                {...register("description")}
              />

              {errors.description?.message && (
                <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                  <CircleAlert size={16} color="#d03e3e" />
                  {errors.description.message}
                </span>
              )}                 
            </div>

            <div>
              <SelectInput
                onClick={getTicketSummary}
                id="service"
                label="Serviço"
                defaultOption="Selecione o serviço do chamado"
                {...register("serviceId")}
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>{service.title}</option>
                ))}
              </SelectInput>

              {errors.serviceId?.message && (
                <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                  <CircleAlert size={16} color="#d03e3e" />
                  {errors.serviceId.message}
                </span>
              )}                  
            </div>
          </div>
        </FormLayout>

        <FormLayout className="h-fit">
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-base font-bold text-gray-200">Resumo</h3>
              <small className="text-gray-300 text-xs">Valores e detalhes</small>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <small className="text-gray-400 text-xs font-bold">Serviço</small>
                <span className="text-sm text-gray-200 block">{currentService.title}</span>
              </div>

              <div>
                <small className="text-gray-400 text-xs font-bold">Custo inicial</small>
                <div className="text-gray-200 font-bold">
                  <small className="text-xs">R$ </small>
                  <span className="text-xl">{currentService.price || "0"}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-xs">O chamado será automaticamente atribuído a um técnico disponível</p>

            <Button className="font-normal" type="submit">Criar chamado</Button>
          </div>
        </FormLayout>
      </form>
    </div>
  );
}