import transactions from "../features/transactions";
import transactionsTypes from "../features/transactionsTypes";
import auth from "../features/auth";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
    return configureStore({
    reducer: {
        auth,
        transactions,
        transactionsTypes
    }
})
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];