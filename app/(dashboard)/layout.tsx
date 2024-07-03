import React from "react";
import Header from "./_components/header";

interface DashboardLayoutProps {
   children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
   return (
      <>
         <Header />
         <main>{children}</main>
      </>
   );
};

export default DashboardLayout;
