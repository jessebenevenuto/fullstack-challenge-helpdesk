# HelpDesk 🚀

Um sistema para gerenciamento de chamados construído com React + TypeScript + Vite.

**Descrição rápida:** Esta é uma aplicação chamada Help Desk. Ela contém telas para administração, técnicos, clientes e autenticação. O projeto usa Vite, Tailwind, React Hook Form, e integração com uma API via `axios`.

<br>

## Interfaces do Projeto

Acesse o [Figma do projeto](https://www.figma.com/community/file/1506654636739959765) para visualizar o design.

<br>

**Tecnologias Utilizadas:**

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/) (validação de formulários)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [clsx](https://github.com/lukeed/clsx) e [tailwind-merge](https://github.com/dcastil/tailwind-merge) (utilitários de classes)

<br>

**Recursos principais**

- Autenticação (páginas de Login/Registro)
- Gestão de Tickets (criar, listar, ver detalhes)
- Páginas administrativas para gerenciar técnicos, serviços e clientes
- Layouts reutilizáveis e componentes compartilhados

<br>

## Como rodar o projeto

> **Obs:** O projeto espera uma API rodando em `http://localhost:3333`.  
Você pode acessar a [ API do HelpDesk](https://github.com/Fel1324/HelpDeskAPI) e seguir o passo a passo para executá-la.


Pré-requisitos:

- [Node.js](https://nodejs.org/)

Passo a passo:

```bash
# Clone o repositório e acesse a pasta do projeto
git clone https://github.com/Fel1324/HelpDesk.git
cd HelpDesk

# instalar dependências
npm install

# rodar em modo desenvolvimento
npm run dev
```
> Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

<br>

## Convenções e padrões

- Componentes funcionais em TypeScript.
- Uso de `React Hook Form` para formulários e validação com `zod`.
- Estilização utilitária com Tailwind CSS.
- Rotas organizadas em `src/routes/` para separar permissões (Admin, Customer, Technician, Auth).

<br>

## 👨‍💻 Desenvolvedor do Projeto

- Rafael Roberto de Oliveira

<br>

## 💡 Contribuidor

- [Gabriel José de Oliveira](https://github.com/gaoliveira21)

<br>

## 📄 Licença

Este projeto está sob a licença MIT.

<br>

> Feito com ♥ by Rocketseat :wave: [Participe da nossa comunidade!](https://discord.gg/rocketseat)