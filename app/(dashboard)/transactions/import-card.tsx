import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { ImportTable } from "./import-table";
import { convertAmountToMiliunits } from "@/lib/utils";
import { format, parse } from "date-fns";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectColumnsState {
   [key: string]: string | null;
}

interface ImportCardProps {
   data: string[][];
   onCancel: () => void;
   onSubmit: (data: any) => void;
}

export const ImportCard: React.FC<ImportCardProps> = ({ data, onCancel, onSubmit }) => {
   const [selectedColumns, setSelectedColumns] = useState<SelectColumnsState>({});

   const headers = data[0];
   const body = data.slice(1);

   const onTableHeadSelectChange = (columnIndex: number, value: string | null) => {
      setSelectedColumns((prev) => {
         const newSelectedColumns = { ...prev };

         for (const key in newSelectedColumns) {
            if (newSelectedColumns[key] === value) {
               newSelectedColumns[key] = null;
            }
         }

         if (value === "skip") {
            value = null;
         }

         newSelectedColumns[`column_${columnIndex}`] = value;
         return newSelectedColumns;
      });
   };

   const progress = Object.values(selectedColumns).filter(Boolean).length;

   const handleContinue = () => {
      const getColumnIndex = (column: string) => {
         return column.split("_")[1];
      };

      const mappedData = {
         headers: headers.map((_header, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] || null;
         }),
         body: body
            .map((row) => {
               const transformedRow = row.map((cell, index) => {
                  const columnIndex = getColumnIndex(`column_${index}`);
                  return selectedColumns[`column_${columnIndex}`] ? cell : null;
               });

               return transformedRow.every((item) => item === null) ? [] : transformedRow;
            })
            .filter((row) => row.length > 0),
      };

      const arrayOfData = mappedData.body.map((row) => {
         return row.reduce((acc: any, cell, index) => {
            const header = mappedData.headers[index];
            if (header !== null) {
               acc[header] = cell;
            }

            return acc;
         }, {});
      });

      const formattedData = arrayOfData.map((item) => ({
         ...item,
         amount: convertAmountToMiliunits(parseFloat(item.amount)),
         date: format(parse(item.date, dateFormat, new Date()), outputFormat),
      }));
   };

   return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
         <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
               <CardTitle className="text-xl line-clamp-1">Import Transcation</CardTitle>
               <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center gap-2">
                  <Button className="w-full" onClick={onCancel} size={"sm"}>
                     Cancel
                  </Button>
                  <Button
                     onClick={handleContinue}
                     disabled={progress < requiredOptions.length}
                     className="w-full"
                     size={"sm"}>
                     Continue ({progress} / {requiredOptions.length})
                  </Button>
               </div>
            </CardHeader>
            <CardContent>
               <ImportTable
                  headers={headers}
                  body={body}
                  selectedColumns={selectedColumns}
                  onTableHeadSelectChange={onTableHeadSelectChange}
               />
            </CardContent>
         </Card>
      </div>
   );
};
