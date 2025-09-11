"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#0f0e13] via-[#1a1c24] to-[#0f0e13] px-6 md:px-12 lg:px-20 py-10 border-t border-gray-800 shadow-inner">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">


        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer">
            Ethergrid
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Empowering your journey into Web3 and Blockchain.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-white font-semibold mb-3">Explore</h3>
          <ul className="flex flex-wrap justify-center gap-6 text-sm">
            {["Market", "Exchange", "Tutorials", "Wallets"].map((link) => (
              <li
                key={link}
                className="relative cursor-pointer text-gray-300 transition group"
              >
                <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition">
                  {link}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-white font-semibold mb-3">Stay Connected</h3>
          <p className="text-gray-400 text-sm">help@ethergrid.com</p>
          <div className="flex gap-5 mt-3">
            <Link href="https://www.linkedin.com/in/divitperiwal/" className="text-gray-400 hover:text-blue-400 transition">
              LinkedIn
            </Link>
            <Link href="https://www.instagram.com/divit_periwal/?" className="text-gray-400 hover:text-purple-400 transition">
              Instagram
            </Link>
            <Link href="https://github.com/divitperiwal/" className="text-gray-400 hover:text-pink-400 transition">
              GitHub
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-700 my-6" />

      <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
        <p>© 2025 Ethergrid</p>
        <p className="mt-2 md:mt-0">All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
