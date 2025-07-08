import { cn } from "../lib/utils";

const settings = [
  {
    label: "Inicio",
    value: "http://localhost:3000/home",
  },
  {
    label: "Transferências",
    value: "http://localhost:3000/transferencias",
  },
  {
    label: "Investimentos",
    value: "http://localhost:3000/investments",
  },
  {
    label: "Outros serviços",
    value: "http://localhost:3000/others",
  },
];

interface HamburgerSidebarProps {
  show: boolean;
  onClose: () => void;
}

export const HamburgerSidebar = ({ show, onClose }: HamburgerSidebarProps) => {
  //const pathname = usePathname();
  return (
    <div
      className={`bg-fundo-principal px-2 py-4 absolute top-0 left-0 w-[172px] min-h-[256px] transition-transform duration-300 ease-in-out ${
        show ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex w-full justify-end">
        <button className="cursor-pointer" onClick={onClose}>
          {/*<IoMdClose color="black" size={24} />*/}
        </button>
      </div>
      <div>
        <nav>
          <ul className="px-6 flex  flex-wrap justify-between xl:flex-col xl:w-full xl:text-center">
            {settings.map((navItem, index) => {
              const isLast = index === settings.length - 1;
              //const isCurrent = pathname === navItem.value;
              return (
                <a key={navItem.value} href={navItem.value}>
                  <li
                    className={cn(
                      "flex-1 min-w-[115px] text-black text-center py-2 border-b-2 hover:text-azul-escuro",
                      isLast && "border-b-0",
                      //isCurrent && " text-azul-claro font-bold xl:border-b-0"
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