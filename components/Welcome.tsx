"use client";

import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Input, Loader } from "@/components/index";
import { useTransferStore } from "@/store/useTransferStore";
import { useWalletStore } from "@/store/UseWalletStore";
import { formatAddress } from "@/utils/utils";
import { useEffect} from "react";
import {
  checkIfWalletConnected,
  connectWallet,
  sendTransaction,
  disconnectWallet,
  checkNetwork,
} from "@/utils/Transaction";
import { AiFillPlayCircle } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { showErrorToast } from "@/utils/utils";

const Welcome = () => {
  const {
    recipient,
    amount,
    keyword,
    message,
    isLoading,
    setRecipient,
    setAmount,
    setKeyword,
    setMessage,
  } = useTransferStore();

  const { account } = useWalletStore();

  useEffect(() => {
    checkNetwork();
    checkIfWalletConnected();
  }, []);

  const handleSubmit = async () => {
    const isValid = !recipient || !amount || !keyword || !message;
    if (isValid) return showErrorToast("Please fill all the fields");
    await sendTransaction();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0e13] via-[#1a1c24] to-[#0f0e13] flex justify-center items-center px-6 lg:px-20">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-16">
        <div className="flex flex-1 flex-col items-start">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
            Send Crypto
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {" "}
              Anywhere
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              Across the Globe
            </span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-md leading-relaxed">
            Explore Web3 with a seamless crypto experience. Send and view details with ease on
            <span className="text-purple-400 font-semibold"> Ethergrid</span>.
          </p>

          {!account ? (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center mt-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-7 py-3 rounded-full shadow-lg cursor-pointer hover:opacity-90 transition-all"
            >
              <AiFillPlayCircle className="text-white mr-2 text-xl" />
              <span className="text-white font-semibold">Connect Wallet</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={disconnectWallet}
              className="flex flex-row justify-center items-center mt-8 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 px-7 py-3 rounded-full shadow-lg cursor-pointer hover:opacity-90 transition-all"
            >
              <MdLogout className="text-white mr-2 text-xl" />
              <span className="text-white font-semibold">
                Disconnect ({formatAddress(account)})
              </span>
            </button>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full mt-12 select-none">
            {[
              "Reliability",
              "Security",
              "Ethereum",
              "Web 3.0",
              "Low Fees",
              "Blockchain",
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 text-white text-sm font-medium text-center bg-[#1c1f2b]/60 backdrop-blur-md rounded-lg border border-gray-700 hover:border-purple-500 transition-all cursor-normal"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full">
          <div className="p-5 flex flex-col justify-between rounded-2xl h-44 w-full sm:w-80 bg-[#1c1f2b]/70 backdrop-blur-xl shadow-xl border border-gray-700">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full border-2 border-white flex justify-center items-center bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
                <SiEthereum size={24} color="#fff" />
              </div>
              <BsInfoCircle size={18} color="#fff" />
            </div>
            <div>
              <Link
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
              >
                <p
                  className={`text-gray-300 text-sm ${
                    account ? "cursor-pointer hover:underline" : ""
                  }`}
                >
                  {account ? formatAddress(account) : "..."}
                </p>
              </Link>
              <p className="text-white font-semibold text-lg mt-1">Ethereum</p>
            </div>
          </div>

          <div className="p-6 sm:w-96 w-full flex flex-col justify-start items-center bg-[#1c1f2b]/70 backdrop-blur-xl rounded-2xl mt-6 shadow-xl border border-gray-700">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={(e) => setRecipient(e.target.value)}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={(e) => setAmount(Number(e.target.value))}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={(e) => setKeyword(e.target.value)}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={(e) => setMessage(e.target.value)}
            />

            <div className="h-px w-full bg-gray-600/60 my-4" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full py-3 rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg hover:opacity-90 transition-all"
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
