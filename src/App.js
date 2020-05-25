import React, { Component } from "react";
import "./index.css";
import configureStore from "./store/configureStore";
import ProductList from "./components/ProductList";
import ProductSpecification from "./components/ProductSpecification";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import Cart from "./components/Cart";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { StateProvider } from "./store/UserStore";

const store = configureStore();
class App extends Component {
  render() {
    library.add(faCartPlus);
    return (
      <main>
        <StateProvider>
          <Provider store={store}>
            <NavBar />
            <Switch>
              <Route path="/" component={ProductList} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/cart" component={Cart} exact />
              <Route path="/:id" component={ProductSpecification} exact />
              <Route path="**" component={ProductList} />
            </Switch>
          </Provider>
        </StateProvider>
      </main>
    );
  }
}

export default App;
