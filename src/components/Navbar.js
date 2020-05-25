import React, { Fragment, useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  DropdownButton,
  Dropdown,
  Button,
  Form,
} from "react-bootstrap";
import { store } from "../store/UserStore";
import { Redirect } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NavBar = (props) => {
  const { state } = useContext(store);

  const redirectToHome = () => {
    return <Redirect to="/" />;
  };
  const { dispatch } = useContext(store);

  const logout = () => {
    dispatch({
      type: "ADD_USER",
      payload: {},
    });
    window.location.href = "/";
  };

  const RightHeader = () => {
    console.log(state);
    let userSection =
      state.userName || localStorage.getItem("userId") ? (
        <div>
          <Form inline>
            <span style={{ padding: "5px" }}>
              <Link to="/cart">
                {" "}
                <FontAwesomeIcon icon="cart-plus" />
              </Link>
            </span>
            <DropdownButton
              id="dropdown-basic-button"
              title={localStorage.getItem("userName")}
            >
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </DropdownButton>
            <p>{redirectToHome()}</p>
          </Form>
        </div>
      ) : (
        <Fragment>
          <LinkContainer to="/login">
            <NavItem>
              <Button>Login</Button>
            </NavItem>
          </LinkContainer>
        </Fragment>
      );
    let rightHeader = <Nav>{userSection} </Nav>;
    return rightHeader;
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">My Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>

        <Nav>{RightHeader()}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
