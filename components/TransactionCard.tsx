"use client";

import { formatAddress } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SiEthereum } from "react-icons/si";

interface TransactionProps {
  receiver: string;
  sender: string;
  message: string;
  keyword: string;
  timestamp: string;
  amount : string;
}

const TransactionCard = ({
  receiver,
  sender,
  message,
  keyword,
  timestamp,
  amount,
}: TransactionProps) => {
  const [gifUrl, setGifUrl] = useState("");

  useEffect(() => {
    async function fetchGif() {
      const cached = localStorage.getItem(`gif_${keyword}`);
      if (cached) {
        setGifUrl(cached);
        return;
      }

      try {
        const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
        const res = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
            keyword
          )}&limit=1`
        );
        const data = await res.json();
        const url = data?.data?.[0]?.images?.downsized_medium?.url || "";

        if (url) {
          localStorage.setItem(`gif_${keyword}`, url);
          setGifUrl(url);
        }
      } catch (error) {
        console.error("Giphy error:", error);
      }
    }

    if (keyword) fetchGif();
  }, [keyword]);

  return (
    <div className="bg-gradient-to-br from-[#1e1e2f] via-[#2a2a3d] to-[#1c1c27] rounded-2xl shadow-xl p-5 w-full max-w-md border border-gray-700 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <SiEthereum className="text-blue-400" size={28} />
        <span className="text-xs text-gray-400">{timestamp}</span>
      </div>

      <div className="mb-3 space-y-1">
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">Sender: </span>
          <Link
            href={`https://sepolia.etherscan.io/address/${sender}`}
            target="_blank"
            className="hover:underline"
          >
            {formatAddress(sender)}
          </Link>
        </p>
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">Receiver: </span>
          <Link
            href={`https://sepolia.etherscan.io/address/${receiver}`}
            className="hover:underline"
            target="_blank"
          >
            {formatAddress(receiver)}
          </Link>
        </p>


        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">Amount: </span>
          <span className="text-green-400">{Number(amount)} ETH</span>
        </p>
      </div>

      {message && (
        <p className="text-gray-200 text-sm italic mb-3 border-l-4 border-blue-500 pl-3">
          "{message}"
        </p>
      )}

      {gifUrl && (
        <div className="w-full h-56 overflow-hidden rounded-xl mb-3 border border-gray-600">
          <Image
            src={gifUrl}
            alt={keyword}
            width={600}
            height={600}
            unoptimized={true}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <p className="text-xs text-gray-400 text-right">
        Keyword: <span className="text-blue-400">{keyword}</span>
      </p>
    </div>
  );
};

export default TransactionCard;
