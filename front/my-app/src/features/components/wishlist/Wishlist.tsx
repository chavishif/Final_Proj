import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { clearWishlist } from '../../../services/wishlistSlice';
import WishItem from './WishItem';
import "../../../styles/cart.css"

const Wishlist = () => {
  const dispatch = useAppDispatch();

  const { cartItems, totalAmount, quantity } = useAppSelector((state: RootState) => state.wishlist);

  return (
    <div>
      {/* style to center the header text to middle in wishlistItem component from cart.css */}
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvas2" aria-labelledby="offcanvas2Label">
    <div className="offcanvas-header" >
      <h4 className="offcanvas-title" id="offcanvas2Label" >Wishlist</h4>
      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body">
    {quantity === 0 ? (
          <h2 className="no-items">No saved items</h2>
        ) : (
          <>
      {cartItems.map((item: any) => (
        <WishItem key={item.id} item={item} />
      ))}

        <button
          className="btn btn-danger mt-3"
          onClick={() => dispatch(clearWishlist())}
        >
          Clear Cart
        </button>
        </>
      )}
    </div>
     
  </div>
  
    </div >
  )
}

export default Wishlist