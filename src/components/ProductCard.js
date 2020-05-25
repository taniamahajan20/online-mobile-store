import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  render() {
    const style = { width: "18rem", paddingBottom: "10px" };
    return (
      <Card style={style}>
        <div className="image-size card-image-padding">
          <Card.Img
            variant="top"
            className="image-style"
            src={this.props.item.image}
          />
        </div>
        <Card.Body>
          <Card.Title>
            <Link to={"/" + this.props.item.id}>{this.props.item.name}</Link>
          </Card.Title>
          <Card.Text>
            $
            {this.props.item.price
              ? this.props.item.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : null}
          </Card.Text>
          <Button variant="primary" onClick={this.props.updateCart}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default ProductCard;
