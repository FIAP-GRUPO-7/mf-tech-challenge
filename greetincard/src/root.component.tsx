import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import { formatToBRL } from "./helpers/formatToBRL";
import { useSelector } from "react-redux";
import { selectBalance } from "./features/transactions";
import { selectUser } from "./features/auth";
import { Tooltip } from "react-tooltip";
import { Providers } from "./providers";

export function GreetingCard({ children }: { children?: React.ReactNode }) {
  const [date, setDate] = useState<string | null>(null);
  const [visibled, setVisibled] = useState<boolean>(false);
  const balance = useSelector(selectBalance);
  const user = useSelector(selectUser);

  console.log('user');
  console.log(user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const today = new Date();
      const formatted = today.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      setDate(formatted);
    }
  }, []);

  return (
    <div className="w-full bg-azul-escuro rounded-md p-6 flex gap-4 flex-col sm:flex-row sm:h-[406px]">
      {user && (
        <div className="flex flex-col gap-6 flex-1">
          <h2 className="text-2xl text-white">Olá, {user.name}! :)</h2>
          <p className="text-white">{date}</p>
        </div>
      )}
      {user && (
        <div className="flex-1 flex sm:justify-center sm:relative">
          <div className="w-[180px] sm:absolute sm:top-[75px]">
            <div className="border-white border-b-2 py-4">
              <h3 className="text-xl text-white flex items-center gap-6">
                <span>Saldo</span>
                <button onClick={() => setVisibled((prev) => !prev)}
                  data-tooltip-id="button"
                  aria-label={`Clique para ${visibled ? "ocultar saldo" : "mostrar saldo"}`}
                  data-tooltip-content={`Clique para ${visibled ? "ocultar saldo" : "mostrar saldo"}`}
                  data-tooltip-place="bottom">
                  {
                    visibled ?
                      // @ts-ignore 
                      <FaEyeSlash />
                      :
                      // @ts-ignore
                      <FaEye />
                  }
                </button>
              </h3>
            </div>
            <div className="border-white py-4 flex flex-col gap-2">
              <span className="text-lg text-white">Conta Corrente</span>
              <h2 className="text-3xl text-white">
                {visibled ? formatToBRL(balance) : "*******"}
              </h2>
            </div>
          </div>
        </div>
      )}
      <div className="gap-8">{children}</div>
      <Tooltip id="button" />
    </div>
  );
}

export function Root({ children }: { children?: React.ReactNode }) {
  return (
      <Providers>
        <GreetingCard></GreetingCard>
      </Providers>
  );
}