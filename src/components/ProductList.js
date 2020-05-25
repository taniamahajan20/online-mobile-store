import React, { Component } from "react";
import { connect } from "react-redux";
import { itemsFetchData, getCartData } from "../actions/products";
import ProductCard from "./ProductCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-js-pagination";
import {
  InputGroup,
  FormControl,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import axios from "axios";

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
      products: [],
      perPage: 6,
      currentPage: 0,
    };
  }
  products = [];
  allProductsArray = [];
  searchText = "";
  componentDidMount() {
    this.props.getCartData();
    axios.get("http://localhost:3333/products").then((res) => {
      this.products = res.data;
      this.allProductsArray = res.data;
      this.receivedData();
    });
  }
  updateCart(id) {
    if (localStorage.getItem("userId")) {
      let cart = this.props.cart;
      let productIndex = cart.products.findIndex((x) => x.productId === id);
      if (productIndex >= 0) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({
          productId: id,
          quantity: 1,
        });
      }
      axios
        .patch("http://localhost:3333/carts/" + cart.id, {
          products: cart.products,
        })
        .then((res) => {});
    } else {
      alert("You need to login to add to cart");
      this.props.history.push("/login");
    }
  }
  setProductsState(products) {
    this.products = products;
    this.setState(
      {
        currentPage: 0,
        offset: 0,
      },
      () => {
        this.receivedData(products);
      }
    );
  }
  updateSearchText(text) {
    this.searchText = text;
  }

  handlePageClick(e) {
    const selectedPage = e - 1;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  }

  receivedData() {
    const slice = this.products.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );

    const postData = slice.map((item) => (
      <Col style={{ padding: "25px" }} md={4} key={item.id}>
        {""}
        <ProductCard
          key={item.id}
          updateCart={() => this.updateCart(item.id)}
          item={item}
        />
      </Col>
    ));
    console.log(this.state);

    this.setState({
      pageCount: Math.ceil(this.products.length / this.state.perPage),
      activePage: this.state.currentPage,
      postData,
    });
  }

  searchProducts() {
    let products = this.allProductsArray.filter((x) =>
      x.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.setProductsState(products);
  }

  sort(isAscending = true) {
    let products;
    if (isAscending) {
      products = this.products.sort((a, b) => {
        return a.price - b.price;
      });
    } else {
      products = this.products.sort((a, b) => {
        return parseInt(b.price) - parseInt(a.price);
      });
    }
    this.setProductsState(products);
  }

  render() {
    return (
      <Container fluid="true">
        <Row>
          <Col>
            <DropdownButton id="dropdown-basic-button" title={"Sort"}>
              <Dropdown.Item
                onClick={() => {
                  this.sort(true);
                }}
              >
                Sort: Low to high
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  this.sort(false);
                }}
              >
                Sort: High to low
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search product"
                aria-label="Search Text"
                aria-describedby="basic-addon2"
                onChange={(e) => this.updateSearchText(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={() => this.searchProducts()}
              >
                Search
              </Button>
            </InputGroup>
          </Col>
          <Col></Col>
        </Row>
        <Row>{this.state.postData}</Row>
        <Row>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={6}
            hideNavigation={true}
            hideFirstLastPages={true}
            linkClass={"pagination"}
            totalItemsCount={this.products.length}
            onChange={(e) => this.handlePageClick(e)}
          />
        </Row>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    cart: state.cart,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
    getCartData: () => dispatch(getCartData(1)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
