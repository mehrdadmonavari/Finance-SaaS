"use client"

import NewAccountSheet from "@/features/accounts/components/new-account-sheet";
import React from "react";
import { useMountedState } from "react-use";

const SheetProvider = () => {
   const isMounted = useMountedState();

   if (!isMounted) {
      return null;
   }

   return (
      <div>
         <NewAccountSheet />
      </div>
   );
};

export default SheetProvider;
