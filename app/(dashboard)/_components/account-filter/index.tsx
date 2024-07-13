"use client";

import qs from "query-string";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

export const AccountFilter = () => {
   const router = useRouter();
   const pathName = usePathname();
   const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();
   const { isLoading: isLoadingSummary } = useGetSummary();

   const params = useSearchParams();
   const accountId = params.get("accountId") || "all";
   const from = params.get("from") || "";
   const to = params.get("to") || "";

   const onChange = (newValue: string) => {
      const query = {
         accountId: newValue,
         from,
         to,
      };

      if (newValue === "all") {
         query.accountId = "";
      }

      const url = qs.stringifyUrl(
         {
            url: pathName,
            query,
         },
         { skipNull: true, skipEmptyString: true }
      );

      router.push(url);
   };

   return (
      <Select
         value={accountId}
         onValueChange={onChange}
         disabled={isLoadingAccounts || isLoadingSummary}>
         <SelectTrigger className="w-full lg:w-auto h-9 rounded-md px-3 font-normal bg-white/10 border-none hover:bg-white/20 hover:text-white focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
            <SelectValue placeholder="Select account" />
         </SelectTrigger>
         <SelectContent>
            <SelectItem value="all">All account</SelectItem>
            {accounts?.map((account) => (
               <SelectItem key={account.id} value={account.id}>
                  {account.name}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
};