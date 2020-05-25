import rootReducer from "./index";

describe("cart reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual({
      cart: {},
      items: [],
    });
  });
  it("should handle GET_CART", () => {
    expect(
      rootReducer(
        {},
        {
          type: "GET_CART",
          cart: {
            userId: 1,
            products: [
              {
                productId: 2,
                quantity: 1,
              },
              {
                productId: 3,
                quantity: 3,
              },
            ],
            id: 1,
          },
        }
      ).cart
    ).toEqual({
      userId: 1,
      products: [
        {
          productId: 2,
          quantity: 1,
        },
        {
          productId: 3,
          quantity: 3,
        },
      ],
      id: 1,
    });
  });
});
