import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IWalletState {
  connect: boolean;
  userAddress: `0x${string}` | undefined;
}

const initialState: IWalletState = {
  connect: false,
  userAddress: undefined,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAccount(state, action: PayloadAction<any>) {
      state.connect = action.payload.connect;
      state.userAddress = action.payload.userAddress;
    },
  },
});

export const { setAccount } = walletSlice.actions;

export const selectConnect = (state: any) => state.wallet.connect;
export const selectUserAddress = (state: any) => state.wallet.userAddress;

export default walletSlice.reducer;
