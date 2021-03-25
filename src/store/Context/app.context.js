import React, { createContext, useContext, useReducer } from "react";
import AppDispatcher from "../Dispatchers/app.dispatcher";
import { INITIAL_STATE } from "../StateDefs";

const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppDispatcher, INITIAL_STATE);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
