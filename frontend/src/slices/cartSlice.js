import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // check for existing item in cart
      const existingItem = state.cartItems.find((x) => x._id === item._id);
      // if item exists, update quantity
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existingItem._id ? item : x
        );
      }
      // if item doesnot exist, add to cart
      else {
        state.cartItems = [...state.cartItems, item];
      }

      // calculae item price
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      // calculate shipping price
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
      // calculate tax price
      state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));
      // calculate total price
      state.totalPrice =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice);

      // save to localstorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
