import React, { createContext, useReducer } from "react";
const initialState = {};
const store = createContext(initialState);
const { Provider } = store;
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_USER":
        if (action.payload.userName && action.payload.password) {
          localStorage.setItem("userId", 1);
          localStorage.setItem("userName", action.payload.userName);
          return {
            ...state,
            userName: action.payload.userName,
            userId: 1,
          };
        }
        if (localStorage.getItem("userId")) {
          localStorage.removeItem("userId");
        }
        return {
          state,
        };
      default:
        return state;
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { store, StateProvider };
