import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchUser } from "../lib/api";

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

      if (receivedData.user) {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(receivedData.user));
      }
      if (receivedData.token) {
        localStorage.removeItem('token');
        localStorage.setItem('token', receivedData.token);
      }
    } catch (error) {
      console.error('Erro ao processar dados da URL:', error);
    }
  }
  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.error("Usuário não autenticado");
          return;
        }
        const user = await fetchUser(token);
      } catch (e) {
        console.error("Erro ao buscar dados do usuário:", e);
      } finally {
        // --- Início da funcionalidade de limpeza da URL ---
        // Pega a URL atual sem o queryString
        const baseUrl = window.location.origin + window.location.pathname;
        // Substitui o estado atual do histórico para limpar a URL
        window.history.replaceState({}, document.title, baseUrl);
        // --- Fim da funcionalidade de limpeza da URL ---
      }
    }
    fetchUserData();
  }, []);

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