import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TransactionProvider, useTransactionContext } from "./context/TransactionContext";
import { formatToBRL } from "./helpers/formatToBRL";
import './globals.css'

export function GreetingCard({ children }: { children?: React.ReactNode }) {
  const [name, setName] = useState<string>("Usuário");
  const [date, setDate] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const { transactions } = useTransactionContext();

  const balance = transactions.reduce((acc, item) => {
    const isEntrada = item.type.toLowerCase() === "depósito";
    const valor = Number(item.value);
    return acc + (isEntrada ? valor : -valor);
  }, 0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        try {
          const users = JSON.parse(storedUsers);
          if (Array.isArray(users) && users.length > 0) {
            setName(users[0].name.split(" ")[0]);
          }
        } catch (error) {
          console.error("Erro ao parsear usuários:", error);
        }
      }

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
    <div className="w-full bg-blue-900 rounded-md p-6 flex gap-4 flex-col sm:flex-row sm:h-[406px]">
      <div className="flex flex-col gap-6 flex-1">
        <h2 className="text-2xl text-white">Olá, {name}! :)</h2>
        <p className="text-white">{date}</p>
      </div>
      <div className="flex-1 flex sm:justify-center sm:relative">
        <div className="w-[180px] sm:absolute sm:top-[75px]">
          <div className="border-white border-b-2 py-4">
            <h3 className="text-xl text-white flex items-center gap-6">
              <span>Saldo</span>
              <button onClick={() => setShow((prev) => !prev)}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </h3>
          </div>
          <div className="border-white py-4 flex flex-col gap-2">
            <span className="text-lg text-white">Conta Corrente</span>
            <h2 className="text-3xl text-white">
              {show ? formatToBRL(balance) : "*******"}
            </h2>
          </div>
        </div>
      </div>
      <div className="gap-8">{children}</div>
    </div>
  );
}

export function Root({ children }: { children?: React.ReactNode }) {
  return (
    <TransactionProvider>
      <GreetingCard></GreetingCard>
    </TransactionProvider>
  );
}
