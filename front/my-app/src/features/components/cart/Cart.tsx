import { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import CartItemType from "../../../models/cartItem";
import { clearCart } from "../../../services/cartSlice";
import "../../../styles/cart.css";
import CartItem from "./CartItem";
import "../../../styles/cart.css";
import { Link } from "react-router-dom";
import { selectLooged } from "../../login/loginSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cartItems, totalAmount, quantity } = useAppSelector((state: RootState) => state.cart);
  const logged = useAppSelector(selectLooged)

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/shipping");
  }
  


  return (
    /* style to center the header text to middle in wishlistItem component from cart.css */
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div className="offcanvas-header">
        <h4 className="offcanvas-title" id="offcanvasRightLabel">Cart</h4>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div className="offcanvas-body">
        {quantity === 0 ? (
          <h2 className="no-items">No items in cart...</h2>
        ) : (
          <>
            {cartItems.map((item: CartItemType) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="d-flex justify-content-between mt-3">
              <h5>Just: ${totalAmount ? totalAmount.toFixed(2) : '0.00'}</h5>
              <button
                className="btn btn-danger mt-3"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>

              { logged? ( // <-- use isLoggedIn here
                <button type="button" className="btn btn-danger mt-3" data-bs-dismiss="offcanvas"
                  aria-label="Close">
                  <Link to="/shipping">
                    Checkout
                  </Link>
                </button>

              ) : (
                <button type="button" className="btn btn-danger mt-3" 
                data-bs-dismiss="offcanvas"
                  aria-label="Close">
                  <Link to="/auth" onClick={handleCheckout}> {/* <-- add onClick to set isLoggedIn to true */}
                    Checkout
                  </Link>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;



