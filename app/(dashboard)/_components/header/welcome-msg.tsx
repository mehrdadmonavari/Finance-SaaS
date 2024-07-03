"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

const WelcomeMsg = () => {
   const {user, isLoaded} = useUser()

   return (
      <div className="space-y-2 mb-4">
         <h2 className="text-2xl lg:text-4xl text-white font-medium">welcome back {isLoaded ? ", " : " "}{user?.firstName} 🖐🏻 </h2>
         <p className="text-sm lg:text-base text-[#89B6FD]">
            this is your Financial Overview report
         </p>
      </div>
   );
};

export default WelcomeMsg;
