import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.transactions)[":id"]["$patch"]>;
type RequestType = InferRequestType<
   (typeof client.api.transactions)[":id"]["$patch"]
>["json"];

export const useEditTransaction = (id?: string) => {
   const queryClient = useQueryClient();
   const mutation = useMutation<ResponseType, Error, RequestType>({
      mutationFn: async (json) => {
         const response = await client.api.transactions[":id"]["$patch"]({
            param: { id },
            json,
         });
         return await response.json();
      },
      onSuccess: () => {
         toast.success("Transactions updated");
         queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
         queryClient.invalidateQueries({ queryKey: ["transactions"] });
         queryClient.invalidateQueries({ queryKey: ["summary"] });
      },
      onError: () => {
         toast.error("Failed to update transactions");
      },
   });

   return mutation;
};
