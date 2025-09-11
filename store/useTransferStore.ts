import { create } from "zustand";

interface SendState {
  recipient: string;
  amount: number;
  keyword: string;
  message: string;
  isLoading: boolean;
  transactionCount : number;

  setRecipient: (address: string) => void;
  setAmount: (amount: number) => void;
  setKeyword: (keyword: string) => void;
  setMessage: (msg: string) => void;
  setTransactionCount : (tc : number) => void;
  setIsLoading : (loading : boolean) => void;
}

export const useTransferStore = create<SendState>((set, get) => ({
  recipient: "",
  amount: 0,
  keyword: "",
  message: "",
  isLoading: false,
  transactionCount : 0,

  setRecipient: (address: string) => set({ recipient: address }),
  setAmount: (amount) => set({ amount }),
  setKeyword: (keyword) => set({ keyword }),
  setMessage: (msg) => set({ message: msg }),
  setTransactionCount : (count : number) => set({transactionCount : count}),
  setIsLoading : (loading : boolean) => set({isLoading : loading}),
}));
