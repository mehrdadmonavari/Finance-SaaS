import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { Edit, MoreHorizontal } from "lucide-react";
import React from "react";

interface ActionsProps {
   id: string;
}

const Actions: React.FC<ActionsProps> = ({ id }) => {
   const { onOpen } = useOpenAccount();

   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant={"ghost"} className="size-8 p-0">
                  <MoreHorizontal className="size-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
                  <Edit className="size-4 mr-2" />
                  Edit
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   );
};

export default Actions;
