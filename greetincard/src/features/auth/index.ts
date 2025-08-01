import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

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

const storedUser =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  error: "",
  loading: false,
};

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return rejectWithValue("E-mail ou senha inválidos.");
    }

    const data: {
      result?: {
        token?: string;
        name?: string;
        email?: string;
      };
    } = await res.json();

    const token = data?.result?.token;
    const name = data?.result?.name;
    const userEmail = data?.result?.email;

    if (!token || !name || !userEmail) {
      return rejectWithValue("Token ou usuário não retornado pela API.");
    }

    Cookies.set("token", token, { secure: true });
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }

    const user: User = {
      id: "",
      name,
      email: userEmail,
      password,
      terms: true,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  } catch (err) {
    console.error(err);
    return rejectWithValue("Erro ao processar login.");
  }
});

export const registerUser = createAsyncThunk<
  void,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/register", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name, email, password }),
    });

    if (!res.ok) {
      return rejectWithValue("Erro ao registrar usuário.");
    }

    await res.json();
  } catch (err) {
    console.error(err);
    return rejectWithValue("Erro ao processar registro.");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        Cookies.remove("token");
      }
    },
    updateUser: (state, action) => {
      const updatedUser = { ...state.user, ...action.payload } as User;
      state.user = updatedUser;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      alert("Dados alterados com sucesso!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.user = action.payload;

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro desconhecido.";
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro ao registrar.";
      });
  },
});

export const { logout, updateUser } = authSlice.actions;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticad = (state: { auth: AuthState }) => !!state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;

export default authSlice.reducer;
