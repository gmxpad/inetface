import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface IAuthState {
  isAuth: boolean;
  token: string;
}

const initialState: IAuthState = {
  isAuth: false,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  /* extraReducers: {
    [HYDRATE]: (state, action) => {
      return (state = {
        ...state,
        ...action.payload.auth,
      });
    },
  }, */
});

export const { setIsAuth, setToken } = authSlice.actions;
export const selectIsAuth = (state: any) => state.auth.isAuth;
export const selectToken = (state: any) => state.auth.token;
export default authSlice.reducer;
