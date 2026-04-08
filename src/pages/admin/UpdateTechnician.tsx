import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { ArrowLeft, CircleAlert } from "lucide-react";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { FormLayout } from "../../components/layouts/FormLayout";
import { Input } from "../../components/form/Input";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import type { Technician } from "../../types/technician";
import { TimeInput } from "../../components/form/TimeInput";
import type { time } from "../../types/time";
import { UserAvatar } from "../../components/UserAvatar";

type TechnicianFormData = {
  name: string;
  email: string;
  timeIds: number[];
};

const technicianSchema = z.object({
  name: z
    .string("Nome é obrigatório")
    .trim()
    .min(2, "Nome deve conter pelo menos 2 caracteres!"),
  email: z
    .email("E-mail inválido, siga o modelo: email@example.com")
    .toLowerCase(),
  timeIds: z.array(
    z
      .int("Horário inválido! Horários disponíveis: 07:00 até 23:00")
      .positive("Horário inválido! Horários disponíveis: 07:00 até 23:00")
  ),
});

export function UpdateTechnician() {
  const { session } = useAuth();
  const token = session?.token;

  const params = useParams<{ id: string }>();

  const [technicianTimes, setTechnicianTimes] = useState<time[]>([]);
  const [technician, setTechnician] = useState({} as Technician);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TechnicianFormData>({
    defaultValues: {
      name: "",
      email: "",
      timeIds: [],
    },
    resolver: zodResolver(technicianSchema),
  });

  async function fetchTechnicianTimes() {
    try {
      const resp = await api.get<TimeAPIResp[]>("/times", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = resp;

      setTechnicianTimes(
        data.map((time) => ({
          id: time.id,
          time: time.time,
        }))
      );
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar os horários!");
    }
  }
  
  async function fetchTechnician(id: string) {
    try {
      const { data } = await api.get<TechnicianAPIResp>(`/technicians/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },        
      });

      setTechnician({
        id: data.id,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatar,
        technicianTimes: data.technicianTimes,
      });

      setValue("email", data.email);
      setValue("name", data.name);
      setValue("timeIds", data.technicianTimes.map((tt) => tt.time.id));

    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar o técnico!");      
    }
  }

  async function updateTechnician(data: TechnicianFormData) {
    try {
      await api.put(`/technicians/${technician.id}`, {
        name: data.name,
        email: data.email,
        timeIds: data.timeIds.sort((a, b) => a - b),
      }, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      navigate("/technicians");

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível atualizar as informações do técnico.");
    }
  }

  useEffect(() => {
    fetchTechnicianTimes();

    if(params.id) {
      fetchTechnician(params.id);
    }
  }, [params.id]);

  return (
    <div className="max-w-[55rem] mx-auto">
      <form onSubmit={handleSubmit(updateTechnician)}>
        <header className="md:flex items-center justify-between">
          <div>
            <Link
              className="text-xs font-bold text-gray-300 flex items-center gap-2 mb-1 w-fit"
              to="/technicians"
            >
              <ArrowLeft size={14} color="#535964" />
              Voltar
            </Link>

            <Title className="mb-3 md:mb-0 lg:mb-0">Editar técnico</Title>
          </div>

          <div className="flex gap-2 md:mt-4.5">
            <Button
              onClick={() => navigate(-1)}
              styleVariant="buttonIcon"
              className="min-w-[7.625rem] md:min-w-[5.5rem]"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              styleVariant="buttonIcon"
              className="bg-gray-200 text-gray-600 md:min-w-[4.5rem]"
            >
              Salvar
            </Button>
          </div>
        </header>

        <div className="mt-4 mx-auto flex flex-col gap-4 max-w-[23.625rem] lg:max-w-none lg:flex-row lg:gap-6 lg:mt-6">
          <FormLayout className="p-5 basis-[20rem] lg:p-6">
            <fieldset>
              <legend className="text-base font-bold text-gray-200 mb-1">
                Dados pessoais
              </legend>
              <p className="text-xs text-gray-300">
                Defina as informações do perfil do técnico
              </p>

              <div className="mt-5 flex flex-col gap-4">
                <div>
                  <UserAvatar className="w-12 h-12 text-xl" username={technician.name} />
                </div>

                <div>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        label="Nome"
                        placeholder="Nome completo"
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
                        label="E-mail"
                        type="email"
                        placeholder="exemplo@mail.com"
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
              </div>
            </fieldset>
          </FormLayout>

          <FormLayout className="p-5 flex-1 lg:p-6 lg:self-start">
            <fieldset>
              <legend className="text-base font-bold text-gray-200 mb-1">
                Horários de atendimento
              </legend>
              <p className="text-xs text-gray-300">
                Selecione os horários de disponibilidade do técnico para
                atendimento
              </p>

              <div className="mt-5 flex flex-col gap-4">
                <div role="list">
                  <strong className="text-xxs uppercase text-gray-300 font-bold">
                    Manhã
                  </strong>

                  <ul className="flex flex-wrap gap-2 mt-1" role="list">
                    {technicianTimes.map((time) => {
                      return (
                        time.id >= 1 &&
                        time.id <= 6 && (
                          <Controller
                            key={time.id}
                            control={control}
                            name="timeIds"
                            render={({ field }) => (
                              <TimeInput
                                label={time.time}
                                value={time.id}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const currentValues = field.value || [];

                                  if (checked) {
                                    field.onChange([
                                      ...currentValues,
                                      time.id,
                                    ]);
                                  } else {
                                    field.onChange(currentValues.filter((val) => val !== time.id));
                                  }
                                }}
                                checked={field.value.includes(time.id)}
                              />
                            )}
                          />
                        )
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <strong className="text-xxs uppercase text-gray-300 font-bold">
                    Tarde
                  </strong>

                  <ul className="flex flex-wrap gap-2 mt-1" role="list">
                    {technicianTimes.map((time) => {
                      return (
                        time.id >= 7 &&
                        time.id <= 12 && (
                          <Controller
                            key={time.id}
                            control={control}
                            name="timeIds"
                            render={({ field }) => (
                              <TimeInput
                                label={time.time}
                                value={time.id}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const currentValues = field.value || [];

                                  if (checked) {
                                    field.onChange([
                                      ...currentValues,
                                      time.id,
                                    ]);
                                  } else {
                                    field.onChange(currentValues.filter((val) => val !== time.id));
                                  }
                                }}
                                checked={field.value.includes(time.id)}
                              />
                            )}
                          />
                        )
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <strong className="text-xxs uppercase text-gray-300 font-bold">
                    Noite
                  </strong>

                   <ul className="flex flex-wrap gap-2 mt-1" role="list">
                    {technicianTimes.map((time) => {
                      return (
                        time.id >= 13 &&
                        time.id <= 17 && (
                          <Controller
                            key={time.id}
                            control={control}
                            name="timeIds"
                            render={({ field }) => (
                              <TimeInput
                                label={time.time}
                                value={time.id}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const currentValues = field.value || [];

                                  if (checked) {
                                    field.onChange([
                                      ...currentValues,
                                      time.id,
                                    ]);
                                  } else {
                                    field.onChange(currentValues.filter((val) => val !== time.id));
                                  }
                                }}
                                checked={field.value.includes(time.id)}
                              />
                            )}
                          />
                        )
                      );
                    })}
                  </ul>
                </div>
              </div>
            </fieldset>
          </FormLayout>
        </div>
      </form>
    </div>
  )
}