import Cookies from "js-cookie";
import { useRouter } from "next/router";

import React, { useEffect } from "react";

const HomeAdmin = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, []);

  return (
    <>
      <h1>Home Dashboard Page</h1>
    </>
  );
};

export default HomeAdmin;
