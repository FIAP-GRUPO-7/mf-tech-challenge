"use client";

import { cn } from "./lib/utils";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

// --- Interfaces e Tipos ---
interface NavItem {
  label: string;
  value: string;
  isMicrofrontendLink?: boolean;
}

interface UserData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactions: any[] | null;
}

// --- Função de Utilitário para Obter Dados do LocalStorage para URL ---
/**
 * Obtém dados do localStorage e os formata como uma string JSON codificada para URL.
 * Garante que o acesso ao localStorage só ocorra no ambiente do navegador.
 * @returns {string} Uma string JSON codificada para URL contendo os dados do usuário e transações.
 */
function getMicrofrontendDataForUrl(): string {
  if (typeof window === 'undefined') {
    // Retorna uma string JSON vazia e codificada se estiver no servidor
    console.warn("localStorage não disponível: getMicrofrontendDataForUrl tentou rodar no servidor.");
    return encodeURIComponent(JSON.stringify({ user: null, users: [], transactions: [] }));
  }
  const dataUser = localStorage.getItem('user');
  const dataUsers = localStorage.getItem('users');
  const dataTransactions = localStorage.getItem('transactions');

  const dataToTransfer: UserData = {
    user: dataUser ? JSON.parse(dataUser) : null,
    users: dataUsers ? JSON.parse(dataUsers) : null,
    transactions: dataTransactions ? JSON.parse(dataTransactions) : null,
  };

  return JSON.stringify(dataToTransfer);
}

const settings = [
  {
    label: "Inicio",
    value: "http://localhost:3000/home/",
    isHostLink: true,
  },
  {
    label: "Transferências",
    value: "http://localhost:3000/transferencias/",
    isHostLink: true,
  },
  {
    label: "Investimentos",
    value: "/",
  },
  {
    label: "Outros serviços",
    value: "http://localhost:3000/others/",
    isHostLink: true,
  },
];
//Sidebar
export const Root = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  /**
   * Manipulador de clique para links que levam a microfrontends.
   * Previne a navegação padrão do Next.js e redireciona com dados na URL.
   * @param e Evento de clique do mouse.
   * @param navItem O item de navegação clicado.
   */
  const handleMicrofrontendLinkClick = (e: React.MouseEvent, navItem: NavItem) => {
    e.preventDefault(); // Impede a navegação padrão do Next.js

    const dataString = getMicrofrontendDataForUrl(); // Obtém os dados formatados
    const targetUrl = `${navItem.value}?data=${encodeURIComponent(dataString)}`; // Constrói a URL final

    window.location.href = targetUrl; // Redireciona a aba atual para a URL do microfrontend
  };

  return (
    <aside className="rounded-md py-4 xl:min-w-[180px] xl:bg-white hidden md:block">
      <nav>
        <ul className="px-6 flex  flex-wrap justify-between xl:flex-col xl:w-full xl:text-center">
          {settings.map((navItem, index) => {
            const isLast = index === settings.length - 1;
            const isCurrent = pathname === navItem.value;
            // Define as props do Link condicionalmente
            const linkProps: { onClick?: (e: React.MouseEvent) => void } = {};
            if (navItem.isHostLink) {
              linkProps.onClick = (e) => handleMicrofrontendLinkClick(e, navItem);
            }

            return (
              <a key={navItem.value} href={navItem.value} {...linkProps}>
                <li
                  className={cn(
                    "flex-1 min-w-[115px] text-center py-4 text-azul-escuro-hover",
                    !isLast && "xl:border-b-2",
                    isCurrent && "border-b-2 text-azul-escuro font-bold"
                  )}
                >
                  {navItem.label}
                </li>
              </a>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

interface HamburgerSidebarProps {
  show: boolean;
  onClose: () => void;
}

export const HamburgerSidebar = ({ show, onClose }: HamburgerSidebarProps) => {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div
      className={`bg-fundo-principal px-2 py-4 absolute top-0 left-0 w-[172px] min-h-[256px] transition-transform duration-300 ease-in-out ${show ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="flex w-full justify-end">
        <button className="cursor-pointer" onClick={onClose}>
          {
            // @ts-ignore
            <IoMdClose color="black" size={24} />
          }
        </button>
      </div>
      <div>
        <nav>
          <ul className="px-6 flex  flex-wrap justify-between xl:flex-col xl:w-full xl:text-center">
            {settings.map((navItem, index) => {
              const isLast = index === settings.length - 1;
              const isCurrent = pathname === navItem.value;
              return (
                <a key={navItem.value} href={navItem.value}>
                  <li
                    className={cn(
                      "flex-1 min-w-[115px] text-black text-center py-2 border-b-2 hover:text-azul-escuro",
                      isLast && "border-b-0",
                      isCurrent && " text-azul-claro font-bold xl:border-b-0"
                    )}
                  >
                    {navItem.label}
                  </li>
                </a>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
