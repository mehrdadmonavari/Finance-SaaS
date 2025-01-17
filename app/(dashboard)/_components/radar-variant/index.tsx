import React from "react";
import {
   PolarAngleAxis,
   PolarGrid,
   PolarRadiusAxis,
   Radar,
   RadarChart,
   ResponsiveContainer,
} from "recharts";

interface RadarVariantProps {
   data?: {
      name: string;
      value: number;
   }[];
}

export const RadarVariant: React.FC<RadarVariantProps> = ({ data }) => {
   return (
      <ResponsiveContainer width="100%" height={350}>
         <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
            <PolarGrid />
            <PolarAngleAxis style={{ fontSize: "12px" }} dataKey="name" />
            <PolarRadiusAxis style={{ fontSize: "12px" }} />
            <Radar dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
         </RadarChart>
      </ResponsiveContainer>
   );
};
