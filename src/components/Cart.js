import React, { Component } from "react";
import { Table, Button, Modal, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { itemsFetchData, getCartData, addToCart } from "../actions/products";
import axios from "axios";
import CartRow from "./CartRow";
class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: {},
      show: false,
    };
  }
  componentDidMount() {
    this.props.fetchData("http://localhost:3333/products");
    this.props.getCartData();
  }
  products = [];
  cart = {};
  total = 0;
  getTotal() {
    this.total = 0;
    console.log(this.cart);
    console.log(this.products);
    if (this.cart.products && this.products.length > 0) {
      this.cart.products.forEach((element) => {
        this.total +=
          element.quantity *
          this.products.find((x) => x.id === element.productId).price;
      });
      return this.total;
    }
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  addQuantity(id) {
    let cart = this.props.cart;
    let productIndex = cart.products.findIndex((x) => x.productId === id);
    if (productIndex >= 0) {
      cart.products[productIndex].quantity += 1;
    }
    this.updateCart(cart);
  }
  subtractQuantity(id) {
    let cart = this.props.cart;
    let productIndex = cart.products.findIndex((x) => x.productId === id);
    if (productIndex >= 0) {
      cart.products[productIndex].quantity -= 1;
      if (cart.products[productIndex].quantity === 0) {
        cart.products.splice(productIndex, 1);
      }
    }
    this.updateCart(cart);
  }
  deleteProduct(id) {
    let cart = this.props.cart;
    let productIndex = cart.products.findIndex((x) => x.productId === id);
    if (productIndex >= 0) {
      cart.products.splice(productIndex, 1);
    }
    this.updateCart(cart);
  }

  updateCart(cart) {
    axios
      .patch("http://localhost:3333/carts/" + cart.id, {
        products: cart.products,
      })
      .then((res) => {
        this.setState({
          cart: res.data,
          show: false,
        });
      });
  }

  placeOrder() {
    axios
      .patch(`http://localhost:3333/carts/` + this.cart.id, {
        products: [],
      })
      .then((res) => {
        this.setState({
          cart: res.data,
          show: true,
        });
      });
  }

  render() {
    this.products = this.props.items;
    this.cart = !this.state.cart.products ? this.props.cart : this.state.cart;
    if (
      this.cart.products &&
      this.cart.products.length > 0 &&
      this.products.length > 0
    ) {
      return (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price per item</th>
                <th>Total price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.cart.products.map((item) => (
                <CartRow
                  key={item.productId}
                  item={item}
                  product={this.products.find((x) => x.id === item.productId)}
                  addQuanity={() => {
                    this.addQuantity(item.productId);
                  }}
                  subtractQuantity={() => {
                    this.subtractQuantity(item.productId);
                  }}
                  removeProduct={() => {
                    this.deleteProduct(item.productId);
                  }}
                />
              ))}

              <tr>
                <td>Total</td>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <b>{this.getTotal()}</b>
                </td>
              </tr>
            </tbody>
          </Table>
          <div style={{ textAlign: "center" }}>
            <button onClick={() => this.placeOrder()}>Place Order</button>
          </div>
        </div>
      );
    } else if (this.cart.products && this.cart.products.length === 0) {
      return (
        <div>
          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Order placed successfully</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your order id is {Math.floor(Math.random() * 100000000000)}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.handleClose()}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Row></Row>
          <Row>
            <Col></Col>
            <Col>
              <img
                src="data:image/png;base64,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"
                alt="Your cart is empty"
              />
            </Col>
            <Col></Col>
          </Row>
          <Row></Row>
        </div>
      );
    } else {
      return (
        <Row>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAASFBMVEX////+/v7Y2Njf39+Ghobq6uq8vLzV1dXZ2dn5+fn29vbc3Nx7e3vk5OT7+/v39/fp6enw8PDHx8e/v7/Pz8+Li4t6enqlpaU4eIotAAADr0lEQVR4nO3b2ZKjIBiG4R8cg0tLJN0zc/93OmwqJqZqTiyrwvscpaMH8BVbgBYBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANRKvSFqUO8ffrZ3tR601sPbp5/tXa0bn0lDJr6udukvu0xEWak1EzvpMfeXMhMZRj3ZOjOR2fgcDtqJ/2xmqTOTyeegnTxlIi58PVWaSZhrdGefMrGdfp6Dri70yXbDRGwosZdsmcj80kyqyqSPTeIuRSa58fS1ZpJG2RRFU34wbX1z8RqNHfMwu2SSBtjRrmHUkol1Lq/VcgRFOwkhGZef2nmKq7erC32yOJ4a0wy5CYQsdCs5E2nDn01uHO3jdntUkYkMJs4scRhd5mNpTRhFtnlYZPi5Ba3UkImLmeiuDf0izcf+k5t8h7Kh54R52E9Jt2SuIROlYgy+8qNPwTcNo3O94+LE+EYjavrOkfxUMsaKG3MqYVjpXbFmlcH1Iu6RE3mkSfnqQp8s1Vy1XUrFNxHZL/i9pdt8N6qauThOs7kD6f2KNTaVHIlZH11d6JNtVb83aRWvjjN5uO3lqwt9srKXuNHs90nyA+27zbx/9aPtKq/c4ba0tPN+D//qQp/suX4Hkbxk8OmZyL0t2DeZrJPxLXWjz3Y3Rq9MZw8jGX5//Vp9fX16KG0RiQ/leDxpikh8KI+rC30y9z+ZTPtMfq4u9NkmU2jfjCe3r82fv/bqMp9M7dcdh5E8Pbi6yKd7qvphKi8vXlri8+1q6sbmfrCOvTejq6mlFPUcGhP3Yl+MeRehtkykzz+MXxpK2o5cNifryUTUnDdQDtqJzTtOXbvexPhsy0Ci18awm4riX/2UFzFjPvO4utAni52jWbYe/VAqc9dsm0f3pmv9d8OYU2mGOs4y+uXHTmgFcWHbhd7UhzbRpRMvUa7LqfRVZJKX9+mILw0eVvqxG/sUVzwZFTun5FwVZxl97hSxV7TpFD0e80xSnKBL7mK2hnYSjjKaZfDs88HfcjZa3rTwHSgs3qrIJMSxTLJxkTIV9wqWL1T54tWFPtnB8qyzWyZHN7fqymS5VVDeySluFtSYSZqB4kq2uONX3kCpL5P1ltLujt/+plJlmaR5eHq5Hzvp5xttVxf6ZGVNp+28uMykL6ee2jJxej0b3d23n43Rrs5M/C++2S0fd/+r4uZ7rWOs2v7eZ3Lw3idTx8Lt4aM7BjVnotQ8tW+fXV1oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBl/gFw0B0fcg9NagAAAABJRU5ErkJggg=="
            alt="LOADING"
          ></img>
        </Row>
      );
    }
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
    getCartData: () => dispatch(getCartData(localStorage.getItem("userId"))),
    addToCart: (cart, productId) => dispatch(addToCart(cart, productId)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
