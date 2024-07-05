"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Plus } from "lucide-react";
import React from "react";
import { columns, Payment } from "./column";
import { DataTable } from "../_components/data-table";

const data: Payment[] = [
   {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
   },
   {
      id: "728ed52f",
      amount: 70,
      status: "success",
      email: "m2@example.com",
   },
];

const Account = () => {
   const newAccount = useNewAccount();

   return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
         <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
               <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
               <Button onClick={newAccount.onOpen} size={"sm"}>
                  <Plus className="size-4 mr-2" /> Add new
               </Button>
            </CardHeader>
            <CardContent>
               <DataTable
                  disabled={false}
                  onDelete={() => {}}
                  columns={columns}
                  data={data}
                  filterKey="email"
               />
            </CardContent>
         </Card>
      </div>
   );
};

export default Account;
