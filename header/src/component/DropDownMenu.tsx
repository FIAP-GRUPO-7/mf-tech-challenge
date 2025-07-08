import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

interface DropdownMenuProps {
  children: React.ReactNode;
}

enum ActionTypeEnum {
  NAVIGATE = "NAVIGATE",
  ACTION = "ACTION",
}

type ActionTypeValueNavigate = string;
type ActionTypeValueAction = () => void;

export const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [show, setShow] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  //const pathname = usePathname();
  //const { signOut } = useAuth();

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onClose = () => {
    setShow(false);
  };

  const options = [
    {
      id: crypto.randomUUID(),
      label: "Minha conta",
      action: {
        type: ActionTypeEnum.NAVIGATE,
        value: "/account",
      },
    },
    {
      id: crypto.randomUUID(),
      label: "Configurações",
      action: {
        type: ActionTypeEnum.NAVIGATE,
        value: "/settings",
      },
    },
    {
      id: crypto.randomUUID(),
      label: "Sair",
      action: {
        type: ActionTypeEnum.ACTION,
        value: () => {
          //signOut();
        },
      },
    },
  ];

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        className="cursor-pointer"
        onClick={() => setShow((prev) => !prev)}
      >
        {children}
      </button>

      {show && (
        <div className="origin-top-right absolute right-0 mt-1 w-56 rounded-md shadow-lg bg-black z-10 p-2">
          <div className="flex w-full justify-end">
            <button className="cursor-pointer" onClick={onClose}>
              {/*<IoMdClose color="white" size={16} />*/}
            </button>
          </div>
          <ul className="px-8" role="menu" aria-orientation="vertical">
            {options.map((option, index) => {
              if (option.action.type === ActionTypeEnum.ACTION) {
                return (
                  <button
                    key={option.id}
                    onClick={option.action.value as ActionTypeValueAction}
                    className={cn(
                      "text-center w-full pb-4 cursor-pointer",
                      index > 0 && "pt-4"
                    )}
                  >
                    <li className="">{option.label}</li>
                  </button>
                );
              }

              return (
                <a
                  key={option.id}
                  href={option.action.value as ActionTypeValueNavigate}
                  className={cn(
                    "block px-4 pb-4 text-md text-center text-white border-b-1 border-white hover:border-azul-escuro",
                    index > 0 && "pt-4",
                    //pathname === option.action.value && "border-azul-escuro"
                  )}
                  role="menuitem"
                >
                  <li>{option.label}</li>
                </a>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
