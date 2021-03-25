import React from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../store/Context";

export default (Component) => (props) => {
  const [state] = useAppContext();
  const history = useHistory();

  if (state.isAuthenticated) {
    return <Component {...props} />;
  } else {
    history.push("/login");
  }
  return null;
};
