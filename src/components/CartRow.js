import React, { Component } from "react";

class CartRow extends Component {
  render() {
    return (
      <tr key={this.props.item.productId}>
        <td>
          <img
            src={this.props.product.image}
            style={{ padding: "2px", height: "100px", width: "75px" }}
            alt={this.props.product.name}
          />
        </td>
        <td>{this.props.product.name}</td>
        <td>
          <button onClick={this.props.addQuanity}>+</button>
          {this.props.item.quantity}
          <button onClick={this.props.subtractQuantity}>-</button>
        </td>
        <td>{this.props.product.price}</td>
        <td>{this.props.product.price * this.props.item.quantity}</td>
        <td>
          <button onClick={this.props.removeProduct}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default CartRow;
