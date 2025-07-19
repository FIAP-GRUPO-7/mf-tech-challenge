import { createContext, useContext, useEffect, useState } from "react";

export type Extract = {
  id: string;
  type: string;
  value: number;
  date: string;
};

type TransactionContextType = {
  transactions: Extract[];
  addTransaction: (transaction: Extract) => void;
  editTransaction: (id: string, newValue: number) => void;
  deleteTransaction: (id: string) => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Extract[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(transaction: Extract) {
    setTransactions((prev) => [...prev, transaction]);
  }

  function editTransaction(id: string, newValue: number) {
    setTransactions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  }

  function deleteTransaction(id: string) {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  }

  //<!-- SCRIPT PARA RECEBER DADOS DO USUARIO DA URL  -->
  const queryString = window.location.search;

  const params = new URLSearchParams(queryString);

  const encodedData = params.get('data');

  if (encodedData) {
    try {
      const decodedString = decodeURIComponent(encodedData);

      const receivedData = JSON.parse(decodedString);
      console.log(receivedData)

      if (receivedData.user) {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(receivedData.user));
      }
      if (receivedData.users) {
        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify(receivedData.users));
      }
      if (receivedData.transactions) {
        localStorage.removeItem('transactions');
        localStorage.setItem('transactions', JSON.stringify(receivedData.transactions));
      }
    } catch (error) {
      console.error('Erro ao processar dados da URL:', error);
    }
  }

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, editTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactionContext deve ser usado dentro de TransactionProvider");
  }
  return context;
}
