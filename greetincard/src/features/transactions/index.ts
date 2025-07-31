import { createSlice } from "@reduxjs/toolkit";

interface Transaction {
    id: string;
    type: string;
    value: number;
    date: string;
}

const initialState: Transaction[] = [];

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            const newTransaction: Transaction = {
                id: crypto.randomUUID(),
                type: action.payload.type,
                value: action.payload.value,
                date: new Date().toLocaleDateString("pt-BR"),
            };
            state.push(newTransaction);
        },
        editTransaction: (state, action) => {
            const { id, value } = action.payload;

            const transaction = state.find((item) => item.id === id);
            if (transaction) {
                transaction.value = value;
            }
        },
        deleteTransaction: (state, action) => {
            const id = action.payload;
            return state.filter((item) => item.id !== id);
        },
    }
})

export const selectTransactions = (state: { transactions: Transaction[] }) => state.transactions;
export const selectBalance = (state: { transactions: Transaction[] }) => {
    return state.transactions.reduce((acc, item) => {
        return item.type === "Depósito" ? acc + item.value : acc - item.value;
    }, 0);
};

export const { addTransaction, deleteTransaction, editTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;