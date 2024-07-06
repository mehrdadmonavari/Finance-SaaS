"use client";

import EditAccountSheet from "@/features/accounts/components/edit-account-sheet";
import NewAccountSheet from "@/features/accounts/components/new-account-sheet";
import EditCategorySheet from "@/features/categories/components/edit-account-sheet";
import NewCategorySheet from "@/features/categories/components/new-category-sheet";
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
         <EditAccountSheet />

         <NewCategorySheet />
         <EditCategorySheet />
      </div>
   );
};

export default SheetProvider;
