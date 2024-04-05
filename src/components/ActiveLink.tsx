"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export type SidebarItemType = {
  path: string;
  svg: ReactNode;
  data1: string;
  data2: string;
};

const ActiveLink = ({ path, svg, data1, data2 }: SidebarItemType) => {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={`w-full px-2 flex justify-start items-center space-x-2 border-b border-slate-700 py-3 ${
        pathName !== path && "hover:bg-green-800"
      } transition ease-linear duration-150 ${
        pathName === path && "bg-blue-800"
      }`}
    >
      <div>{svg}</div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{data1}</span>
        <span className="text-sm text-white/50 hidden md:block">{data2}</span>
      </div>
    </Link>
  );
};

export default ActiveLink;
