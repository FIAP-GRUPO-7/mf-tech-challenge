"use client";

import { cn } from "./lib/utils";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface NavItem {
  label: string;
  value: string;
  isMicrofrontendLink?: boolean;
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
   * Manipulador de clique para links que levam ao host.
   * @param e Evento de clique do mouse.
   * @param navItem O item de navegação clicado.
   */
  const handleMicrofrontendLinkClick = (e: React.MouseEvent, navItem: NavItem) => {
    e.preventDefault();
    const targetUrl = `${navItem.value}`;
    window.location.href = targetUrl; // Redireciona a aba atual para a URL do host
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
