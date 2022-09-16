import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import { UserContext } from "../../context/UserContext";

const Employees = () => {
  const token = Cookies.get("token");
  const { userGlobal } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!token || Object.values(userGlobal).includes("")) {
      console.log("entro");
      router.push("/admin/login");
    }
  }, []);

  return (
    <LayoutDashboard>
      <h1>Employee</h1>
    </LayoutDashboard>
  );
};

export default Employees;
