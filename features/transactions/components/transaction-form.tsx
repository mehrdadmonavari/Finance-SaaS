import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTransactionsSchema } from "@/db/schema";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Select } from "@/app/(dashboard)/_components/select";
import { DatePicker } from "@/app/(dashboard)/_components/date-picker";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
   date: z.coerce.date(),
   accountId: z.string(),
   categoryId: z.string().nullable().optional(),
   payee: z.string(),
   amount: z.string(),
   notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionsSchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
   id?: string;
   defaultValues?: FormValues;
   onSubmit: (values: ApiFormValues) => void;
   onDelete?: () => void;
   disabled?: boolean;
   accountOptions: { label: string; value: string }[];
   onCreateAccount: (name: string) => void;
   categoryOptions: { label: string; value: string }[];
   onCreateCategory: (name: string) => void;
};

const TransactionForm = ({
   id,
   defaultValues,
   onSubmit,
   onDelete,
   disabled,
   accountOptions,
   onCreateAccount,
   categoryOptions,
   onCreateCategory,
}: Props) => {
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues,
   });

   const handleSubmit = (values: FormValues) => {
      // onSubmit(values);
      console.log(values);
   };

   const handleDelete = () => {
      onDelete?.();
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
            <FormField
               name="date"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <DatePicker
                           value={field.value}
                           onChange={field.onChange}
                           disabled={field.disabled}
                        />
                     </FormControl>
                  </FormItem>
               )}
            />
            <FormField
               name="accountId"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Account</FormLabel>
                     <FormControl>
                        <Select
                           placeholder="Select an account"
                           options={accountOptions}
                           onCreate={onCreateAccount}
                           value={field.value}
                           onChange={field.onChange}
                           disabled={disabled}
                        />
                     </FormControl>
                  </FormItem>
               )}
            />
            <FormField
               name="categoryId"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Category</FormLabel>
                     <FormControl>
                        <Select
                           placeholder="Select an category"
                           options={categoryOptions}
                           onCreate={onCreateCategory}
                           value={field.value}
                           onChange={field.onChange}
                           disabled={disabled}
                        />
                     </FormControl>
                  </FormItem>
               )}
            />
            <FormField
               name="payee"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Payee</FormLabel>
                     <FormControl>
                        <Input disabled={disabled} placeholder="Add a payee" {...field} />
                     </FormControl>
                  </FormItem>
               )}
            />
            <FormField
               name="notes"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Notes</FormLabel>
                     <FormControl>
                        <Textarea
                           {...field}
                           value={field.value ?? ""}
                           disabled={disabled}
                           placeholder="Optional notes"
                        />
                     </FormControl>
                  </FormItem>
               )}
            />
            <Button className="w-full" disabled={disabled}>
               {id ? "Save changes" : "Create account"}
            </Button>
            {!!id && (
               <Button
                  type="button"
                  disabled={disabled}
                  onClick={handleDelete}
                  className="w-full"
                  variant={"outline"}>
                  <Trash className="size-4 mr-2" />
                  Delete account
               </Button>
            )}
         </form>
      </Form>
   );
};

export default TransactionForm;