import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CartRow from "./CartRow";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    item: {
      productId: 1,
      quantity: 1,
    },
    product: {
      id: 1,
      name: "Samsung Galaxy Note 8",
      price: "80000",
      image:
        "https://rukminim1.flixcart.com/image/832/832/jc5458w0/mobile/x/d/s/samsung-galaxy-note-8-sm-n950f-original-imafffj7e42ym2zj.jpeg?q=70",
    },
    addQuanity: {},
    subtractQuantity: {},
    removeProduct: {},
  };

  const enzymeWrapper = shallow(<CartRow {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe("components", () => {
  describe("Header", () => {
    it("should call addTodo if length of text is greater than 0", () => {
      const { enzymeWrapper, props } = setup();
      expect(enzymeWrapper.find("tr").key()).toBe(
        props.item.productId.toString()
      );
    });
  });
});
