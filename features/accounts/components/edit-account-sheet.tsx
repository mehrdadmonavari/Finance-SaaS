import { z } from "zod";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useOpenAccount } from "../hooks/use-open-account";
import AccountForm from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { useGetAccount } from "../api/use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account";

const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;

const EditAccountSheet = () => {
   const { isOpen, onClose, id } = useOpenAccount();

   const accountQuery = useGetAccount(id);
   const editMutation = useEditAccount(id);

   const isPending = editMutation.isPending;
   const isLoading = accountQuery.isLoading;

   const defaultValues = accountQuery.data
      ? {
           name: accountQuery.data.name,
        }
      : { name: "" };

   const onSubmit = (values: FormValues) => {
      editMutation.mutate(values, {
         onSuccess: () => {
            onClose();
         },
      });
   };
   return (
      <Sheet open={isOpen} onOpenChange={onClose}>
         <SheetContent className="space-y-4">
            <SheetHeader>
               <SheetTitle>Edit Account</SheetTitle>
               <SheetDescription>Edit an existing account</SheetDescription>
            </SheetHeader>
            {isLoading ? (
               <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="size-4 text-muted-foreground animate-spin" />
               </div>
            ) : (
               <AccountForm
                  id={id}
                  onSubmit={onSubmit}
                  disabled={isPending}
                  defaultValues={defaultValues}
               />
            )}
         </SheetContent>
      </Sheet>
   );
};

export default EditAccountSheet;