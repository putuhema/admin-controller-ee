import { FiHome } from "react-icons/fi";
import { BiChevronUp, BiFoodMenu } from "react-icons/bi";

import Link from "next/link";
import { useState, MouseEvent } from "react";

const Sidebar = () => {
  const [isClick, setIsClick] = useState(false);
  const [sidebarActive, setSidebarActive] = useState("Home");

  function handleSidebarOnClick(event: MouseEvent<HTMLAnchorElement>) {
    const text = event.currentTarget.textContent;
    setSidebarActive(text!);
  }

  return (
    <aside className="sticky mb-6 sm:mb-0 top-0 sm:w-[300px] w-full flex flex-shrink flex-grow-0 md:h-screen p-2 md:p-6 border bg-white">
      <ul className="w-full cursor-pointer flex flex-row justify-between  md:justify-start md:flex-col  text-lg">
        <li className="px-2">
          <Link
            href="/"
            className={`flex w-full  items-center gap-2 py-2 px-1 rounded group hover:bg-neutral-100
             ${sidebarActive === "Home" ? "bg-neutral-100" : ""}`}
            onClick={(e) => handleSidebarOnClick(e)}
          >
            <span className="text-4xl md:text-xl">
              <FiHome className="text-neutral-500 group-hover:text-black" />
            </span>
            <span className="hidden md:block">Home</span>
          </Link>
        </li>
        <li className="px-2">
          <Link
            onClick={(e) => {
              handleSidebarOnClick(e);
              setIsClick(!isClick);
            }}
            href="#"
            className={`flex justify-between w-full items-center gap-2 py-2 px-1 rounded grouphover:bg-neutral-100
             ${sidebarActive === "Program" ? "bg-neutral-100" : ""} 
            `}
          >
            <div className="flex items-center gap-2">
              <span className="text-4xl md:text-xl">
                <BiFoodMenu className="text-neutral-500 group-hover:text-black" />
              </span>
              <span className="hidden md:block">Program</span>
            </div>
            <BiChevronUp
              className={`${isClick ? "rotate-180" : ""} transition-all`}
            />
          </Link>
          <div
            className={`
             ${isClick ? "block" : "hidden"}  border-neutral-200 ml-2 `}
          >
            <ul className=" text-base text-neutral-500">
              <li className="sidebar-sublink">Calistung</li>
              <li className="sidebar-sublink">Matematika SD I,II,II</li>
              <li className="sidebar-sublink">Matematika SD IV,V,VI</li>
              <li className="sidebar-sublink">Matematika SMP</li>
              <li className="sidebar-sublink">B. Inggris SD I,II,II</li>
              <li className="sidebar-sublink">B. Inggris SD IV,V,VI</li>
              <li className="sidebar-sublink">B. Inggris SMP</li>
              <li className="sidebar-sublink">Prisma</li>
            </ul>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
