import React from "react";
// import ChangePassForm from '../../components/forms/ChangePassForm';
import LayoutEmployee from "./layoutEmployee";
import dynamic from "next/dynamic";

const ChangePasswordPage = () => {
  const ChangePassForm = dynamic(() =>
    import("../../components/forms/ChangePassForm").then((res) => res.default)
  );

  return (
    <LayoutEmployee name="Cambiar la contraseña">
      <h3>Cambia tu contraseña</h3>

      <ChangePassForm />
    </LayoutEmployee>
  );
};

export default ChangePasswordPage;
