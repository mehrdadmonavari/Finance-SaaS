"use client"

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import React from "react";

const DashboardPage = () => {
   const { onOpen } = useNewAccount();

   return (
      <div>
         <div className="py-6 font-semibold text-2xl">
            this is Home page!
         </div>
         <Button onClick={onOpen}>create new account</Button>
      </div>
   );
};

export default DashboardPage;
