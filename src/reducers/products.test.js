import rootReducer from "./index";

describe("products reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual({
      cart: {},
      items: [],
    });
  });
  it("should handle ITEMS_FETCH_DATA_SUCCESS", () => {
    expect(
      rootReducer([], {
        type: "ITEMS_FETCH_DATA_SUCCESS",
        items: [
          {
            id: 1,
            name: "Samsung Galaxy Note 8",
            price: "80000",
            image:
              "https://rukminim1.flixcart.com/image/832/832/jc5458w0/mobile/x/d/s/samsung-galaxy-note-8-sm-n950f-original-imafffj7e42ym2zj.jpeg?q=70",
          },
          {
            id: 2,
            name: "iPhone X",
            price: "40000",
            image:
              "https://rukminim1.flixcart.com/image/832/832/j9d3bm80/mobile/g/x/j/apple-iphone-x-mqa62hn-a-original-imaeyysgjbe3qzwz.jpeg?q=70",
          },
          {
            id: 3,
            name: "iPhone XR",
            price: "50000",
            image:
              "https://rukminim1.flixcart.com/image/832/832/jnj7iq80/mobile/u/b/g/apple-iphone-xr-mryj2hn-a-original-imafa6zkm7qhv2zd.jpeg?q=70",
          },
        ],
      }).items
    ).toEqual([
      {
        id: 1,
        name: "Samsung Galaxy Note 8",
        price: "80000",
        image:
          "https://rukminim1.flixcart.com/image/832/832/jc5458w0/mobile/x/d/s/samsung-galaxy-note-8-sm-n950f-original-imafffj7e42ym2zj.jpeg?q=70",
      },
      {
        id: 2,
        name: "iPhone X",
        price: "40000",
        image:
          "https://rukminim1.flixcart.com/image/832/832/j9d3bm80/mobile/g/x/j/apple-iphone-x-mqa62hn-a-original-imaeyysgjbe3qzwz.jpeg?q=70",
      },
      {
        id: 3,
        name: "iPhone XR",
        price: "50000",
        image:
          "https://rukminim1.flixcart.com/image/832/832/jnj7iq80/mobile/u/b/g/apple-iphone-xr-mryj2hn-a-original-imafa6zkm7qhv2zd.jpeg?q=70",
      },
    ]);
  });
});
