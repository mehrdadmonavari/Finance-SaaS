import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardPage = () => {
   return <div>
      <UserButton afterSwitchSessionUrl="/" />
   </div>;
};

export default DashboardPage;
