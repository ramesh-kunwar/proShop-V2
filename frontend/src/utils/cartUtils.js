export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
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
  return state;
};
