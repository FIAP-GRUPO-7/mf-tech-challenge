import { useState, useEffect } from "react";
import { HiPencil } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import { formatToBRL } from "./helpers/formatToBRL";
import { TransactionProvider, useTransactionContext } from "./context/TransactionContext";

export function ExtractList() {
  const { transactions, editTransaction, deleteTransaction } = useTransactionContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleEdit(id: string, currentValue: number) {
    const newValue = prompt("Novo valor da transação:", currentValue.toString());
    if (newValue) {
      const numeric = Number(newValue);
      if (!isNaN(numeric)) {
        editTransaction(id, numeric);
      } else {
        alert("Valor inválido.");
      }
    }
  }

  function handleDelete(id: string) {
    if (confirm("Deseja excluir esta transação?")) {
      deleteTransaction(id);
      setSelectedId(null);
    }
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-md px-6 py-8 xl:w-[282px] text-center">
        <p className="text-lg font-semibold">Nenhuma transação registrada.</p>
      </div>
    );
  }

  return (
    <div className="max-h-max bg-white rounded-md px-6 py-8 xl:w-[282px]">
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <h4 className="text-2xl font-bold">Extrato</h4>
        <div className="flex gap-2">
          <RoundedButton
            onClick={() => {
              const item = transactions.find((e) => e.id === selectedId);
              if (item) handleEdit(item.id, item.value);
              else alert("Selecione uma transação para editar.");
            }}
          >
            {// @ts-ignore
              <HiPencil color="white" size={25} />
            }
          </RoundedButton>
          <RoundedButton
            onClick={() => {
              if (selectedId) handleDelete(selectedId);
              else alert("Selecione uma transação para excluir.");
            }}
          >
            {// @ts-ignore
              <IoTrashOutline color="white" size={25} />
            }
          </RoundedButton>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {transactions.map((extract) => {
          const [day, month, year] = extract.date.split("/");
          const dateObj = new Date(
            +`20${year.length === 2 ? year : year}`,
            +month - 1,
            +day
          );
          const monthName = dateObj.toLocaleDateString("pt-BR", {
            month: "long",
          });

          return (
            <div
              key={extract.id}
              onClick={() => setSelectedId(extract.id)}
              className={`cursor-pointer p-2 rounded transition ${selectedId === extract.id
                  ? "bg-gray-100 border border-azul-claro"
                  : ""
                } flex justify-between items-center flex-wrap-reverse`}
            >
              <div
                className={`flex-1 flex flex-col gap-2 border-b-1 pb-2 ${extract.type.toLowerCase() === "depósito"
                    ? "border-sucesso"
                    : "border-erro"
                  }`}
              >
                <h4 className="text-label font-semibold text-md">{monthName}</h4>
                <p className="text-lg">{extract.type}</p>
                <b
                  className={`text-lg font-bold ${extract.value < 0 ? "text-red-600" : ""
                    }`}
                >
                  {extract.value < 0
                    ? `- R$ ${formatToBRL(Math.abs(extract.value)).replace("R$", "").trim()}`
                    : formatToBRL(extract.value)}
                </b>
              </div>
              <span className="text-label">{extract.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const RoundedButton = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="appearance-none rounded-full bg-azul-escuro w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
    >
      {children}
    </button>
  );
};

export function Root({ children }: { children?: React.ReactNode }) {
  return (
    <TransactionProvider>
      <ExtractList></ExtractList>
    </TransactionProvider>
  );
}