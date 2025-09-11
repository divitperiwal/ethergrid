"use client";
import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const NavBarItem = ({
  title,
  classprops,
}: {
  title: string;
  classprops?: string;
}) => (
  <li
    className={`relative mx-4 cursor-pointer text-white transition-all duration-300 group ${classprops}`}
  >
    <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
      {title}
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav
      className="w-full flex justify-between items-center px-6 md:px-12 lg:px-20 py-4 
  bg-gradient-to-r from-[#0f0e13] via-[#1a1c24] to-[#0f0e13] fixed top-0 left-0 z-50 shadow-lg"
    >

      <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer">
        Ethergrid
      </h1>

      <ul className="hidden md:flex space-x-10 text-white font-medium items-center">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem
            key={item + index}
            title={item}
            classprops="hover:scale-105"
          />
        ))}
        <li
          className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 py-2 px-6 rounded-full 
          cursor-pointer font-semibold shadow-md hover:opacity-90 hover:scale-105 transition-all"
        >
          Login
        </li>
      </ul>

      <div className="md:hidden flex items-center">
        {!toggleMenu ? (
          <HiMenuAlt4
            size={28}
            className="text-white cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        ) : (
          <AiOutlineClose
            size={28}
            className="text-white cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
      </div>

      <div
        className={`fixed top-0 right-0 w-72 h-screen bg-gradient-to-b from-[#1a1c24] via-[#111113] to-[#0f0e13] 
        shadow-xl flex flex-col items-start p-6 space-y-6 text-white transform transition-transform duration-500 ease-in-out z-50 list-none
        ${toggleMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        <li className="text-xl w-full flex justify-end">
          <AiOutlineClose
            className="cursor-pointer hover:text-red-400 transition"
            onClick={() => setToggleMenu(false)}
          />
        </li>
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem
            key={item + index}
            title={item}
            classprops="text-lg w-full hover:scale-105"
          />
        ))}
        <li
          className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 py-2 px-6 rounded-full 
          cursor-pointer font-semibold shadow-md hover:opacity-90 transition-all mt-4 list-none"
        >
          Login
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
