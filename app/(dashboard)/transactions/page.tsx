"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import { columns } from "./column";
import { DataTable } from "../_components/data-table";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";

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
   const deleteTransactions = useBulkDeleteTransactions();
   const transactionsQuery = useGetTransactions();
   const transactions = transactionsQuery.data || [];

   const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

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
            <ImportCard data={importResults.data} onCancel={onCancelImport} onSubmit={() => {}} />
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
