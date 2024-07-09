import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import React from "react";
import { TableHeadSelect } from "./table-head-select";

interface ImportTableProps {
   headers: string[];
   body: string[][];
   selectedColumns: Record<string, any>;
   onTableHeadSelectChange: (columnsIndex: number, value: string | null) => void;
}

export const ImportTable: React.FC<ImportTableProps> = ({
   headers,
   body,
   selectedColumns,
   onTableHeadSelectChange,
}) => {
   return (
      <div className="rounded-md border overflow-hidden">
         <Table>
            <TableHeader className="bg-muted">
               <TableRow>
                  {headers.map((_item, index) => (
                     <TableHead key={index}>
                        <TableHeadSelect
                           columnIndex={index}
                           selectedColumns={selectedColumns}
                           onChange={onTableHeadSelectChange}
                        />
                     </TableHead>
                  ))}
               </TableRow>
            </TableHeader>
            <TableBody>
               {body.map((row: string[], index) => (
                  <TableRow key={index}>
                     {row.map((cell, index) => (
                        <TableCell key={index}>{cell}</TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
};
