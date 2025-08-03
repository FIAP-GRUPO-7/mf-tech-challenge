export interface User {
    id: string;
    name: string;
    email: string;
    terms: boolean;
    password: string;
}
export interface AuthState {
    user: User | null;
    error: string | null;
    loading: boolean;
}
export declare const login: import("@reduxjs/toolkit").AsyncThunk<User, {
    email: string;
    password: string;
}, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const registerUser: import("@reduxjs/toolkit").AsyncThunk<void, {
    name: string;
    email: string;
    password: string;
}, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/logout">, updateUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "auth/updateUser">;
export declare const selectUser: (state: {
    auth: AuthState;
}) => User;
export declare const selectIsAuthenticad: (state: {
    auth: AuthState;
}) => boolean;
export declare const selectLoading: (state: {
    auth: AuthState;
}) => boolean;
declare const _default: import("redux").Reducer<import("immer").WritableDraft<AuthState>>;
export default _default;
