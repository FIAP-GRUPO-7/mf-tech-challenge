export interface Transaction {
    id: string;
    type: string;
    value: number;
    date: string;
}
export declare const selectTransactions: (state: {
    transactions: Transaction[];
}) => Transaction[];
export declare const selectBalance: (state: {
    transactions: Transaction[];
}) => number;
export declare const addTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "transactions/addTransaction">, deleteTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "transactions/deleteTransaction">, editTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "transactions/editTransaction">;
declare const _default: import("redux").Reducer<Transaction[]>;
export default _default;
