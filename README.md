# Repositório Front-end Web Pro4Tech

O desafio consiste no desenvolvimento de uma aplicação que centralize o atendimento ao cliente por meio de um sistema de chat estruturado.

Leia mais em [Repositório Principal](https://github.com/CodeDontBlow/Pro4Tech-ADS5)

Este repositório tem como objetivo alocar o front-end da aplicação web.

A aplicação web permitirá o acompanhamento dos clientes por meio de uma interface limpa e estruturada.

## 💡 **Funcionalidades**

- Controle de Acesso por Perfil: Diferenciação de visualização para Atendentes e Administradores (RBAC).

- em breve...

## 📂 **Estrutura do Projeto**

```
pro4tech-frontend/
│── app/                                        # Código-fonte principal
│   ├── (admin)/                                # páginas de admin
│   │         ├── layout.tsx                    # layout padrão para admin
│   │         │          └──create-company/
│   │         │            └── page.tsx         # página para criar empresas
│   │         └──register-attendant/page.tsx    # página para registrar atendentes
│   │               └──create-company/ page.tsx  # página para criar empresas
│   └── (agent)/                                  # páginas de atendente
│        ├── layout.tsx                           # layout padrão para atendente
│        └── page.tsx                             # página padrão para atendente
├── (auth)/               # páginas de autenticação
│   └── login/page.tsx    # Página de login
├── components/           # Pastas com componentes de design
│   ├── layout/           # Pastas com componentes referentes ao layout
│   │         ├── footer.tsx  # footer das páginas
│   │         ├── navbar.tsx  # navbar das páginas
│   │         └── sidebarAgent.tsx  # sidebar referente as páginas de atendente
│   └── ui /    # Pastas com componentes reutilizáveis
│       └── button.tsx  # botão reutilizável
│       └── inputField.tsx  # input reutilizável
│── layout.tsx   # Configurações de layout
│── page.tsx   # Página inicials
│── proxy.ts   # Antigo middleware, permite interceptar, modificar ou bloquear requests
└── services/                                  # parte da integração com o backend
│        ├── api.ts                            # conecta com o backend usando axios
│        └── auth.service.ts                   # service de autenticação
│── public/               # Arquivos estáticos
│── .gitignore            # arquivos a serem ignorados
│── eslint.config.js      # Regras de linting
│── LICENSE               # licença do projeto
│── next.config.ts        # Configurações Next.js
│── package-lock.json     # Dependências do projeto
│── package.json          # Dependências do projeto
│── postcss.config.mjs    # Configurações TailWind
└── README.md             # Este arquivo
```

---

## ⚙️ Tecnologias Utilizadas:

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)

## ❓Como Executar:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

> © 2026 - by **💣Code Don't Blow**
