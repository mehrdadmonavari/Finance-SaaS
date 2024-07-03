"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import NavButton from "./nav-button";
import { headerNavDesktop } from "@/constants/desktop-nav";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navigation = () => {
   const [isOpen, setIsOpen] = useState(false);
   const pathName = usePathname();
   const router = useRouter();
   const isMobile = useMedia("(max-width: 1024px)", false);

   const onClick = (href: string) => {
      router.push(href);
      setIsOpen(false);
   };

   if (isMobile) {
      return (
         <Sheet>
            <SheetTrigger>
               <Button
                  variant={"outline"}
                  size={"sm"}
                  className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition">
                  <Menu className="size-4" />
               </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="px-2">
               <nav className="flex flex-col gap-y-2 pt-6">
                  {headerNavDesktop.map((navItem) => (
                     <Button
                        key={navItem.href}
                        variant={navItem.href === pathName ? "secondary" : "ghost"}
                        onClick={() => onClick(navItem.href)}
                        className="w-full justify-start"
                        >
                        {navItem.label}
                     </Button>
                  ))}
               </nav>
            </SheetContent>
         </Sheet>
      );
   }

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
