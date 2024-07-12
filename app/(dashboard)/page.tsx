import React from "react";
import { Button } from "@/components/ui/button";
import { DataGrid } from "./_components/data-grid";
import { DataCharts } from "./_components/data-charts";

const DashboardPage = () => {
   return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
         <DataGrid />
         <DataCharts />
      </div>
   );
};

export default DashboardPage;
