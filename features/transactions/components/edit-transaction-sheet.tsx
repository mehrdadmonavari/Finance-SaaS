import { z } from "zod";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useOpenTransaction } from "../hooks/use-open-transaction";
import TransactionForm from "./transaction-form";
import { useGetTransaction } from "../api/use-get-transaction";
import { Loader2 } from "lucide-react";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";
import { insertTransactionsSchema } from "@/db/schema";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { convertAmountFromMiliunits } from "@/lib/utils";

const formSchema = insertTransactionsSchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;

const EditTransactionSheet = () => {
   const { isOpen, onClose, id } = useOpenTransaction();

   const transactionsQuery = useGetTransaction(id);
   const editMutation = useEditTransaction(id);
   const deleteMutation = useDeleteTransaction(id);

   const categoryQuery = useGetCategories();
   const categoryMutation = useCreateCategory();
   const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
   const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
      label: category.name,
      value: category.id,
   }));

   const accountQuery = useGetAccounts();
   const accountMutation = useCreateAccount();
   const onCreateAccount = (name: string) => accountMutation.mutate({ name });
   const AccountOptions = (accountQuery.data ?? []).map((account) => ({
      label: account.name,
      value: account.id,
   }));

   const isPending =
      transactionsQuery.isLoading ||
      editMutation.isPending ||
      deleteMutation.isPending ||
      categoryMutation.isPending ||
      accountMutation.isPending;

   const isLoading =
      transactionsQuery.isLoading || categoryQuery.isLoading || accountQuery.isLoading;

   const [ConfirmDialog, confirm] = useConfirm(
      "Are you sure?",
      "You are about to delete this transaction."
   );

   const defaultValues = transactionsQuery.data
      ? {
           accountId: transactionsQuery.data.accountId,
           categoryId: transactionsQuery.data.categoryId,
           amount: convertAmountFromMiliunits(transactionsQuery.data.amount).toString(),
           date: transactionsQuery.data.date
              ? new Date(transactionsQuery.data.date)
              : new Date(),
           payee: transactionsQuery.data.payee,
           notes: transactionsQuery.data.notes,
        }
      : {
           accountId: "",
           categoryId: "",
           amount: "",
           date: new Date(),
           payee: "",
           notes: "",
        };

   const onSubmit = (values: FormValues) => {
      editMutation.mutate(values, {
         onSuccess: () => {
            onClose();
         },
      });
   };

   const onDelete = async () => {
      const ok = await confirm();

      if (ok) {
         deleteMutation.mutate(undefined, {
            onSuccess: () => {
               onClose();
            },
         });
      }
   };

   return (
      <>
         <ConfirmDialog />
         <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
               <SheetHeader>
                  <SheetTitle>Edit Transaction</SheetTitle>
                  <SheetDescription>Edit an existing transaction</SheetDescription>
               </SheetHeader>
               {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Loader2 className="size-4 text-muted-foreground animate-spin" />
                  </div>
               ) : (
                  <TransactionForm
                     id={id}
                     defaultValues={defaultValues}
                     onSubmit={onSubmit}
                     onDelete={onDelete}
                     disabled={isPending}
                     categoryOptions={categoryOptions}
                     onCreateCategory={onCreateCategory}
                     accountOptions={AccountOptions}
                     onCreateAccount={onCreateAccount}
                  />
               )}
            </SheetContent>
         </Sheet>
      </>
   );
};

export default EditTransactionSheet;
