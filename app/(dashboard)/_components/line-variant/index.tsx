import { format } from "date-fns";
import React from "react";
import {
   Tooltip,
   XAxis,
   ResponsiveContainer,
   CartesianGrid,
   LineChart,
   Line,
} from "recharts";
import { CustomTooltip } from "../custom-tooltip";

interface AreaVariantProps {
   data: {
      date: string;
      income: number;
      expenses: number;
   }[];
}

export const LineVariant: React.FC<AreaVariantProps> = ({ data }) => {
   return (
      <ResponsiveContainer width={"100%"} height={350}>
         <LineChart data={data}>
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis
               axisLine={false}
               tickLine={false}
               dataKey="date"
               tickFormatter={(value) => format(value, "dd MM")}
               style={{ fontSize: "12px" }}
               tickMargin={16}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
               dot={false}
               dataKey="income"
               stroke="#3b82F6"
               strokeWidth={2}
               className="drop-shadow-sm"
            />
            <Line
               dot={false}
               dataKey="expenses"
               stroke="#F43F5E"
               strokeWidth={2}
               className="drop-shadow-sm"
            />
         </LineChart>
      </ResponsiveContainer>
   );
};
