export declare const makeStore: () => import("@reduxjs/toolkit").EnhancedStore<{
    auth: import("immer").WritableDraft<import("../features/auth").AuthState>;
    transactions: import("../features/transactions").Transaction[];
    transactionsTypes: import("../features/transactionsTypes").TransactionsTypesState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        auth: import("immer").WritableDraft<import("../features/auth").AuthState>;
        transactions: import("../features/transactions").Transaction[];
        transactionsTypes: import("../features/transactionsTypes").TransactionsTypesState;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
