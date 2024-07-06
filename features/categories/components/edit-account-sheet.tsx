import { z } from "zod";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useOpenCategory } from "../hooks/use-open-category";
import CategoryForm from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { useGetCategory } from "../api/use-get-category";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertCategorySchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;

const EditCategorySheet = () => {
   const { isOpen, onClose, id } = useOpenCategory();

   const categoryQuery = useGetCategory(id);
   const editMutation = useEditCategory(id);
   const deleteMutation = useDeleteCategory(id);

   const isPending = editMutation.isPending || deleteMutation.isPending;
   const isLoading = categoryQuery.isLoading;

   const [ConfirmDialog, confirm] = useConfirm(
      "Are you sure?",
      "You are about to delete this account."
   );

   const defaultValues = categoryQuery.data
      ? {
           name: categoryQuery.data.name,
        }
      : { name: "" };

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
                  <SheetTitle>Edit Category</SheetTitle>
                  <SheetDescription>Edit an existing category</SheetDescription>
               </SheetHeader>
               {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Loader2 className="size-4 text-muted-foreground animate-spin" />
                  </div>
               ) : (
                  <CategoryForm
                     id={id}
                     onSubmit={onSubmit}
                     disabled={isPending}
                     defaultValues={defaultValues}
                     onDelete={onDelete}
                  />
               )}
            </SheetContent>
         </Sheet>
      </>
   );
};

export default EditCategorySheet;
