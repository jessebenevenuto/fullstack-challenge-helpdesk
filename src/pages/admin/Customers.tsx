import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import * as z from "zod";

import { api } from "../../services/api";

import { Title } from "../../components/Title";
import { Table } from "../../components/table/Table";
import { TableHeader } from "../../components/table/TableHeader";
import { TableRow } from "../../components/table/TableRow";
import { TableData } from "../../components/table/TableData";

import type { Customer } from "../../types/customer";
import { UserAvatar } from "../../components/UserAvatar";
import { Button } from "../../components/Button";
import { CircleAlert, PenLine, Trash } from "lucide-react";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/form/Input";

type CustomerFormData = {
  name: string;
  email: string;
}

const customerSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.email("E-mail inválido").toLowerCase(),
})

export function Customers() {
  const { session } = useAuth();
  const token = session?.token;

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer>({} as Customer);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<CustomerFormData>({
    defaultValues: {
      name: "",
      email: "",
    },
    resolver: zodResolver(customerSchema),
  })

  async function fetchCustomers() {
    try {
      const resp = await api.get<CustomerAPIResp[]>("/customers", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const { data } = resp;

      setCustomers(
        data.map((customer) => ({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          avatarUrl: customer.avatar,
        }))
      );

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar os clientes!");
    }
  }

  async function fetchCustomer(id: string, modalType: "update" | "delete") {
    try {
      const resp = await api.get<CustomerAPIResp>(`/customers/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const { data } = resp;

      setCustomer({
        id: data.id,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatar,
      })

      setValue("name", data.name);
      setValue("email", data.email);

      modalType === "update" ? setIsUpdateModalOpen(true) : setIsDeleteModalOpen(true);

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar o cliente!");
    }
  }

  async function removeCustomer(id: string) {
    try {
      await api.delete(`/customers/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      setIsDeleteModalOpen(false);
      await fetchCustomers();
      
    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível remover o cliente!");
    }
  }

  async function updateCustomer(data: CustomerFormData) {
    try {
      await api.put(`/customers/${customer.id}`, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      await fetchCustomers();
      setIsUpdateModalOpen(false);
      
    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível atualizar as informações do cliente.");
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, [])  

  return (
    <div>
      <Title>Clientes</Title>

      <Table>
        <thead>
          <tr className="h-12">
            <TableHeader>Nome</TableHeader>
            <TableHeader>E-mail</TableHeader>
            <TableHeader className="w-22"></TableHeader>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableData>
                <div className="flex items-center gap-3">
                  <UserAvatar className="w-7 h-7" username={customer.name} />
                  <span className="text-gray-200 text-sm font-bold capitalize">{customer.name}</span>
                </div>
              </TableData>

              <TableData className="text-sm text-gray-200">{customer.email}</TableData>

              <TableData>
                <div className="flex items-center gap-2">
                  <Button onClick={() => fetchCustomer(customer.id, "delete")} 
                    styleVariant="iconSmall"
                    className="bg-gray-500"
                  >
                    <Trash size={14} color="#D03E3E" />
                  </Button>

                  <Button 
                    onClick={() => fetchCustomer(customer.id, "update")}
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
        title="Editar cliente"
        isOpen={isUpdateModalOpen}
        close={setIsUpdateModalOpen}
        bodyContent={
          <div>
            <UserAvatar className="w-12 h-12 text-[1.375rem]" username={customer.name} />

            <form onSubmit={handleSubmit(updateCustomer)} className="mt-5">
              <div className="flex flex-col gap-4">
                <div>
                  <Controller
                    control={control}
                    name="name"                    
                    render={({ field }) => (
                      <Input
                        label="Nome"
                        placeholder="Nome do cliente"                        
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
                        placeholder="E-mail do cliente"
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

              <div className="mt-8">
                <Button className="text-sm" type="submit">Salvar</Button>
              </div>
            </form>
          </div>
        }
      />

      <Modal
        title="Excluir cliente"
        isOpen={isDeleteModalOpen}
        close={setIsDeleteModalOpen}
        bodyContent={
          <>
            <p className="mb-5">Deseja realmente excluir <span className="font-bold capitalize">{customer.name}</span></p>
            <p>Ao excluir, todos os chamados deste cliente serão removidos e esta ação não poderá ser desfeita.</p>

            <div className="mt-7 flex items-center gap-2">
              <Button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-[9.125rem] bg-gray-500 text-sm text-gray-200 md:w-[11.75rem]"
              >
                Cancelar
              </Button>

              <Button onClick={() => removeCustomer(customer.id)} className="w-[9.125rem] text-sm font-bold md:w-[11.75rem]">
                Sim, excluir
              </Button>
            </div>
          </>
        }
      />
    </div>
  )
}
