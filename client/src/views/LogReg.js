import React from "react";

import SignIn from "../components/LoginReg/SignIn";
import SignUp from "../components/LoginReg/SignUp";

const LogReg = ({ setLoggedIn }) => {
  return (
    <div className="container-flex">
      <SignIn setLoggedIn={setLoggedIn} />
      <SignUp />
    </div>
  );
};

export default LogReg;