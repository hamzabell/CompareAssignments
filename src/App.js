import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//PAGE Imports
import Home from "./pages";
import History from "./pages/history";
import Login from "./pages/login";
import Logout from "./pages/logout";

//STYLE Imports
import { Global } from "./styled";

// CSS Imports
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-circular-progressbar/dist/styles.css";

function App() {
  return (
    <HashRouter>
      <Global />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/history" component={History} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </HashRouter>
  );
}

export default App;
