import { FiHome } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { TbReportMoney } from "react-icons/tb";
import { MouseEvent, useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isClick, setIsClick] = useState({ state: true, link: "Home" });
  const nav = [
    { text: "Home", logo: <FiHome /> },
    { text: "Student", logo: <BsPerson /> },
    { text: "Income", logo: <TbReportMoney /> },
  ].map((n) => (
    <li className="p-2" onClick={(e) => onNavClick(n.text, e)} key={n.text}>
      <Link
        href={`/${n.text === "Home" ? "" : n.text.toLowerCase()}`}
        className={`flex w-full md:w-fit items-center gap-2 py-2 px-1 rounded
       hover:bg-neutral-100 ${
         isClick.state && n.text === isClick.link ? `bg-neutral-200` : `bg-none`
       }`}
      >
        <span className="text-4xl md:text-xl">{n.logo}</span>
        <span className="hidden md:block">{n.text}</span>
      </Link>
    </li>
  ));

  const onNavClick = (text: string, e: MouseEvent<HTMLLIElement>) => {
    if (text === e.currentTarget.textContent) {
      setIsClick({ state: true, link: text });
    }
  };

  return (
    <aside className="sticky mb-6 sm:mb-0 top-0 sm:w-[300px] w-full flex flex-shrink flex-grow-0 md:h-screen p-2 md:p-6 border bg-white">
      {/* <div className="pb-8 hidden md:block">logo</div> */}
      <ul className="w-full cursor-pointer flex flex-row justify-between  md:justify-start md:flex-col  text-lg">
        {nav}
      </ul>
    </aside>
  );
};

export default Sidebar;
