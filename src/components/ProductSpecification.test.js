import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import ProductSpecification from "./ProductSpecification";
const mockStore = configureStore([]);
describe("My Connected React-Redux Component", () => {
  let store;
  let component;

  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: 1,
      },
    });
    store = mockStore({
      myState: "sample text",
    });
    Storage.prototype.getItem = jest.fn(() => "1");

    jest.spyOn(window, "alert").mockImplementation(() => {});
    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <ProductSpecification />
      </Provider>
    );
  });

  it("should render with given state from Redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should dispatch an action on button click", () => {
    renderer.act(() => {});

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
