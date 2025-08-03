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
export declare function TransactionProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useTransactionContext(): TransactionContextType;
export {};
