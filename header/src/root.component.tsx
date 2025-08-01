import { useSidebar } from "./hooks/sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { DropdownMenu } from "./component/DropDownMenu";
import { HamburgerSidebar } from "./component/HambugerSidebar";
import img0 from "./avatar-fallback.svg";

export default function Root(props) {
  const { show, toggleSidebar, onClose } = useSidebar();
  return (
    <header className="relative bg-azul-escuro text-white h-[96px] flex items-center justify-between gap-4 px-16 md:justify-end lg:px-48 xl:64">
      <div className="flex md:hidden">
        <button className="cursor-pointer" onClick={toggleSidebar}>
          {
            // @ts-ignore
          <GiHamburgerMenu size={32} color="white" />
          }
        </button>
        <HamburgerSidebar show={show} onClose={onClose} />
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <img src={img0} alt="avatar-fallback" width={54} height={54} />
        </DropdownMenu>
      </div>
    </header>
  );
};

