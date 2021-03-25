import React, { useEffect } from "react";
import { useAppContext } from "../store/Context";
import { toast } from "react-toastify";
import { withAuthentication } from "../components";

const Logout = () => {
  const [state, dispatch] = useAppContext();
  useEffect(() => {
    dispatch({ type: "USER_LOGGED_OUT" });

    return () => {
      toast.dark("✨ Logging you out, Admin!");
    };
  }, []);

  return null;
};

export default withAuthentication(Logout);
