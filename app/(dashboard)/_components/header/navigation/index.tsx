"use client";

import { usePathname } from "next/navigation";
import React from "react";
import NavButton from "./nav-button";
import { headerNavDesktop } from "@/constants/desktop-nav";

const Navigation = () => {
   const pathName = usePathname();

   return (
      <div className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
         {headerNavDesktop.map((navItem) => (
            <NavButton
               key={navItem.href}
               href={navItem.href}
               label={navItem.label}
               isActive={navItem.href === pathName}
            />
         ))}
      </div>
   );
};

export default Navigation;
