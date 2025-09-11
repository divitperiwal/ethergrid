"use client";

import TransactionCard from "./TransactionCard";
import { useWalletStore } from "../store/UseWalletStore";
import { getAllTransactions } from "@/utils/Transaction";
import { useEffect, useState } from "react";

interface Transaction {
  receiver: string;
  sender: string;
  message: string;
  keyword: string;
  timestamp: string;
  amount: string;
}

const Transactions = () => {
  const { account } = useWalletStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const fetchTransactions = async () => {
    const transactions = await getAllTransactions();
    setTransactions(transactions || []);
  };

  useEffect(() => {
    fetchTransactions();
  }, [account]);
  return (
    <div className="w-full bg-gradient-to-br from-[#0f0e13] via-[#1a1c24] to-[#0f0e13] min-h-screen py-12">
      <div className="flex flex-col md:px-12 px-4">
        {account ? (
          <>
            <h3 className="text-white text-3xl font-bold text-center my-2">
              Latest Transactions
            </h3>
            <div
              className="grid gap-6 mt-10 
                    grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                    place-items-center"
            >
              {[...transactions].reverse().map((transaction, i) => (
                <TransactionCard key={i} {...transaction} />
              ))}
            </div>
          </>
        ) : (
          <h3 className="text-white text-3xl font-bold text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}
      </div>
    </div>
  );
};

export default Transactions;
