import { getCartProductFromLS } from "./getCartProducts";

export const updateCartProductTotal = () => {
  let productSubTotal = document.querySelector(".productSubTotal");
  let productFinalTotal = document.querySelector(".productFinalTotal");
  let productTax = document.querySelector(".productTax");

  let localCartProducts = getCartProductFromLS();
  let initialValue = 0;
  let totalProductPrice = localCartProducts.reduce((accum, curElem) => {
    let productPrice = parseInt(curElem.price) || 0;
    return accum + productPrice;
  }, initialValue);

  let taxAmount = totalProductPrice * 18 / 100;

  productSubTotal.textContent = `₹${totalProductPrice}`;
  productFinalTotal.textContent = `₹${totalProductPrice + taxAmount}`;
  if (productTax) {
    productTax.textContent = `₹${taxAmount}`;
  }
};
