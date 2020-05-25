import axios from "axios";

export function itemsFetchDataSuccess(items) {
  return {
    type: "ITEMS_FETCH_DATA_SUCCESS",
    items,
  };
}
export function getCart(cart) {
  return {
    type: "GET_CART",
    cart,
  };
}
export function addToCartSuccess(cart) {
  return {
    type: "ADD_TO_CART",
    cart,
  };
}

export function itemsFetchData(url) {
  return (dispatch) => {
    axios.get(url).then((response) => {
      dispatch(itemsFetchDataSuccess(response.data));
    });
  };
}

export function getCartData(cartId) {
  return (dispatch) => {
    axios.get("http://localhost:3333/carts/" + cartId).then((response) => {
      dispatch(getCart(response.data));
    });
  };
}

export function addToCart(cart, productId) {
  let productIndex = cart.products.findIndex((x) => x.productId === productId);
  if (productIndex >= 0) {
    cart.products[productIndex].quantity += 1;
  } else {
    cart.products.push({
      productId: productId,
      quantity: 1,
    });
  }
  return (dispatch) => {
    axios
      .patch("http://localhost:3333/carts/" + cart.id, {
        products: cart.products,
      })
      .then((response) => {
        dispatch(addToCart(response.data));
      });
  };
}

// export function AddToCartSuccess(productId) {
//   return {
//     type: "ADD_TO_CART",
//     productId,
//   };
// }

// export const addToCart = (productId) => (dispatch, getState) => {
//   if (getState().items.byId[productId].inventory > 0) {
//     dispatch(AddToCartSuccess(productId));
//   }
// };
