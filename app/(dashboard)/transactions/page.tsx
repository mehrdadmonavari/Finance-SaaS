"use client";

import React, { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { transactions as transactionsSchema } from "@/db/schema";
import { columns } from "./column";
import { DataTable } from "../_components/data-table";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";

enum VARIANTS {
   LIST = "LIST",
   IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
   data: [],
   errors: [],
   meta: [],
};

const TransactionsPage = () => {
   const [AccountDialog, confirm] = useSelectAccount();
   const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
   const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

   const onCancelImport = () => {
      setImportResults(INITIAL_IMPORT_RESULTS);
      setVariant(VARIANTS.LIST);
   };

   const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
      setImportResults(results);
      setVariant(VARIANTS.IMPORT);
   };

   const newTransactions = useNewTransaction();
   const createTransactions = useBulkCreateTransactions();
   const deleteTransactions = useBulkDeleteTransactions();
   const transactionsQuery = useGetTransactions();
   const transactions = transactionsQuery.data || [];

   const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

   const onSubmitImport = async (values: (typeof transactionsSchema.$inferInsert)[]) => {
      const accountId = await confirm();

      if (!accountId) {
         return toast.error("Please select an account to continue.");
      }

      const data = values.map((value) => ({ ...value, accountId: accountId as string }));

      createTransactions.mutate(data, {
         onSuccess: () => {
            onCancelImport();
         },
      });
   };

   if (transactionsQuery.isLoading) {
      return (
         <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
               <CardHeader>
                  <Skeleton className="h-8 w-48" />
               </CardHeader>
               <CardContent>
                  <div className="h-[500px] w-full flex items-center justify-center">
                     <Loader2 className="size-12 text-slate-300 animate-spin" />
                  </div>
               </CardContent>
            </Card>
         </div>
      );
   }

   if (variant === VARIANTS.IMPORT) {
      return (
         <>
            <AccountDialog />
            <ImportCard
               data={importResults.data}
               onCancel={onCancelImport}
               onSubmit={onSubmitImport}
            />
         </>
      );
   }

   return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
         <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
               <CardTitle className="text-xl line-clamp-1">Transaction history</CardTitle>
               <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center gap-2">
                  <UploadButton onUpload={onUpload} />
                  <Button className="w-full" onClick={newTransactions.onOpen} size={"sm"}>
                     <Plus className="size-4 mr-2" /> Add new
                  </Button>
               </div>
            </CardHeader>
            <CardContent>
               <DataTable
                  onDelete={(row) => {
                     const ids = row.map((r) => r.original.id);
                     deleteTransactions.mutate({ ids });
                  }}
                  disabled={isDisabled}
                  columns={columns}
                  data={transactions}
                  filterKey="payee"
               />
            </CardContent>
         </Card>
      </div>
   );
};

export default TransactionsPage;
