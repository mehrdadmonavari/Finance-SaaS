import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import React from "react";
import { useCSVReader } from "react-papaparse";

interface UploadButtonProps {
   onUpload: (result: any) => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({onUpload}) => {
   const { CSVReader } = useCSVReader();

   return (
      <CSVReader onUploadAccepted={onUpload}>
         {({ getRootProps }: any) => (
            <Button size={"sm"} className="w-full" {...getRootProps()}>
               <Upload className="size-4 mr-2" />
               Import
            </Button>
         )}
      </CSVReader>
   );
};
