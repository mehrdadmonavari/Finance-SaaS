import { z } from "zod";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useNewCategory } from "../hooks/use-new-category";
import { insertCategorySchema } from "@/db/schema";
import { useCreateCategory } from "../api/use-create-category";
import CategoryForm from "./category-form";

const formSchema = insertCategorySchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;

const NewCategorySheet = () => {
   const { isOpen, onClose } = useNewCategory();

   const mutation = useCreateCategory();

   const onSubmit = (values: FormValues) => {
      mutation.mutate(values, {
         onSuccess: () => {
            onClose();
         },
      });
   };

   return (
      <Sheet open={isOpen} onOpenChange={onClose}>
         <SheetContent className="space-y-4">
            <SheetHeader>
               <SheetTitle>New Category</SheetTitle>
               <SheetDescription>
                  Craete a new category to organize your transactions. 
               </SheetDescription>
            </SheetHeader>
            <CategoryForm
               onSubmit={onSubmit}
               disabled={mutation.isPending}
               defaultValues={{ name: "" }}
            />
         </SheetContent>
      </Sheet>
   );
};

export default NewCategorySheet;
