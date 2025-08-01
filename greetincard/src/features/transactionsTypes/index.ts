import { createSlice } from "@reduxjs/toolkit";

interface TransactionsTypesState {
    types: string[];
}

const initialState: TransactionsTypesState = {
    types: ["Depósito", "Saque", "Transferência"]
}

const transactionsTypesSlice = createSlice({
    name: "transactionsTypes",
    initialState,
    reducers: {}
})

export default transactionsTypesSlice.reducer;