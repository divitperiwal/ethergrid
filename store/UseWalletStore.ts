import { create } from "zustand";
import { ethers } from "ethers";

interface useWalletState {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
  setAccount: (account: string | null) => void;
  setProvider: (provider: ethers.BrowserProvider | null) => void;
  setSigner: (signer: ethers.Signer | null) => void;
  setContract: (contract: ethers.Contract | null) => void;
}

export const useWalletStore = create<useWalletState>((set, get) => ({
  account: null,
  provider: null,
  signer: null,
  contract: null,

  setAccount: (account: string | null) => set({ account }),
  setProvider: (provider: ethers.BrowserProvider | null) => set({ provider }),
  setSigner: (signer: ethers.Signer | null) => set({ signer }),
  setContract: (contract: ethers.Contract | null) => set({ contract }),
}));
