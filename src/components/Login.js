import React, { useState, useContext } from "react";
import { FormControl, FormGroup, FormLabel, Button } from "react-bootstrap";
import "./Login.css";
import { store } from "../store/UserStore";
const Login = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_USER",
      payload: { userName: userName, password: password },
    });
    console.log(globalState);
  };
  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>User Name</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};
export default Login;
