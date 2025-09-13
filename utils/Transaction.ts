import { ethers } from "ethers";
import { contractABI, contractAddress } from "./constant";
import { useWalletStore } from "@/store/UseWalletStore";
import { useTransferStore } from "@/store/useTransferStore";
import { showErrorToast, showSuccessToast } from "./utils";




export async function checkNetwork() {
  if (!window.ethereum) return showSuccessToast("Please install Metamask");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const chainID = (await provider.getNetwork()).chainId.toString();
  if (chainID === "11155111") {
    return true;
  }
  showErrorToast("Please switch to Sepolia Test Network");
  return false;
}

export async function getEthereumContract() {
  const network = await checkNetwork();
  if (!network) return;

  const { setProvider, setSigner, setContract } = useWalletStore.getState();
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  setContract(contract);
  setProvider(provider);
  setSigner(signer);

  return contract;
}

export async function checkIfWalletConnected() {
  const { setAccount } = useWalletStore.getState();
  try {
    const { ethereum } = window;
    if (!ethereum) return showErrorToast("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      const network = await checkNetwork();
      if (!network) return;
      setAccount(accounts[0]);
      showSuccessToast("Wallet is connected");
    } else {
      showErrorToast("No Accounts found")
    }
  } catch (error) {
    console.error(error);
  }
}

export async function connectWallet() {
  const { setAccount, setProvider, setSigner } = useWalletStore.getState();
  try {
    const { ethereum } = window;
    if (!ethereum) return showErrorToast("Please install Metamask");
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) {
      const network = await checkNetwork();
      if (!network) return;
      const account = accounts[0];
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      setAccount(account);
      setProvider(provider);
      setSigner(signer);
      showSuccessToast("Wallet connected successfully");
    }
  } catch (error) {
    console.error("Error : ", error);
  }
}

export async function disconnectWallet() {
  const { setAccount, setProvider, setSigner } = useWalletStore.getState();
  setAccount(null);
  setProvider(null);
  setSigner(null);
  showSuccessToast("Wallet disconnected successfully");
}
export async function sendTransaction() {
  const {
    recipient,
    amount,
    keyword,
    message,
    setTransactionCount,
    setIsLoading,
  } = useTransferStore.getState();
  const { account } = useWalletStore.getState();

  try {
    const { ethereum } = window;
    if (!ethereum) return showErrorToast("Please install Metamask");
    const network = await checkNetwork();
    if (!network) return;
    const transactionContract = await getEthereumContract();
    const parsedEther = ethers.parseEther(amount.toString());

    setIsLoading(true);

    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: account,
          to: recipient,
          gas: "0x5208",
          value: ethers.toBeHex(parsedEther),
        },
      ],
    });

    const transactionHash = await transactionContract?.addToBlockchain(
      recipient,
      parsedEther,
      message,
      keyword
    );

    await transactionHash.wait();
    setIsLoading(false);
    showSuccessToast(`Transaction Successful ${transactionHash} `);
    const TransactionCount = await transactionContract?.getTransactionCount();
    setTransactionCount(TransactionCount);
    setTimeout(() => {
      window.location.reload();
    }, 4000);


  } catch (error) {
    console.error("Error : ", error);
  }
}

export async function getAllTransactions() {
  try {
    if (window.ethereum) {
      const transactionContract = await getEthereumContract();

      const availableTransactions =
        await transactionContract?.getAllTransaction();

      const transactionList = availableTransactions.map((transaction: any) => ({
        receiver: transaction.receiver,
        sender: transaction.sender,
        keyword: transaction.keyword,
        message: transaction.message,
        timestamp: new Date(
          Number(transaction.timestamp) * 1000
        ).toLocaleString("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        amount: ethers.formatEther(transaction.amount.toString()),
      }));

      return transactionList;
    }
  } catch (error: any) {
    console.log("Error : ", error);
  }
}
