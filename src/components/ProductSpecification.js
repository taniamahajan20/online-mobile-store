import React, { Component } from "react";
import axios from "axios";
import { Jumbotron, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getCartData } from "../actions/products";

class ProductSpecification extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
  }
  description = [
    "Wi-Fi or cellular access to the internet",
    "A battery that powers the device for several hours",
    "A physical or onscreen keyboard for entering information",
    "Size and weight that allows it to be carried in one hand and manipulated with the other hand",
    "Touch-screen interface in almost all cases",
    "A virtual assistant, like Siri, Cortana or Google Assistant",
    "The ability to download data from the internet, including apps and books",
    "Wireless operation",
  ];
  cart = {};
  componentDidMount() {
    const id = window.location.pathname;
    this.props.getCartData();
    axios.get("http://localhost:3333/products" + id).then((res) => {
      this.setState({
        product: res.data,
      });
    });
  }

  addToCart() {
    if (localStorage.getItem("userId") && this.props.cart) {
      let cart = this.props.cart;
      let productIndex = cart.products.findIndex(
        (x) => x.productId === this.state.product.id
      );
      if (productIndex >= 0) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({
          productId: this.state.product.id,
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

  render() {
    return (
      <div>
        <Row>
          <Col>
            <img
              className="image-product"
              src={this.state.product.image}
              alt={this.state.product.name}
            />
          </Col>
          <Col>
            <h1>{this.state.product.name}</h1>

            <ul>
              {this.description.map((x, index) => {
                return <li key={index + 1}>{x}</li>;
              })}
            </ul>
            <p>
              <h2>
                $
                {this.state.product.price
                  ? this.state.product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                  : null}
              </h2>
            </p>
            <p>
              <Button variant="primary" onClick={() => this.addToCart()}>
                Add to cart
              </Button>
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getCartData: () => dispatch(getCartData(1)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSpecification);
