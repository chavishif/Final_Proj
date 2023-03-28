import { useDispatch } from "react-redux";
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5";
import  CartItemType  from "../../../models/cartItem";
import  "../../../styles/details.css"
import { Link } from "react-router-dom";
import { removeFromWishlist, addWishlistItemToCart } from "../../../services/wishlistSlice";
import { addProdQuantity, addToCart } from "../../../services/cartSlice";

interface Props {
item: CartItemType;
}

const WishItem: React.FC<Props> = ({ item }) => {
const dispatch = useDispatch();
const { image, name, price, quantity ,id} = item;

const handleRemoveItem = (): void => {
dispatch(removeFromWishlist(item));
};


  const handleAddToCart = (product:any) => {
    dispatch(addProdQuantity(  { id: product.id,
       image: product.image,
        name: product.name,
         price: product.price, 
         quantity:1 }));
         handleRemoveItem()
  };

  

return (
<div className="cart-item">
<div className="product-image">
<Link to={`/product/${item.id}`}>
    <img src={image} alt={name} />
  </Link>
</div>
<div className="product-name">
<h2>{name}</h2>
<h2 className="product-price">${price}</h2>
<button  className="button-33" role="button" onClick={handleRemoveItem}>Remove </button>
<button  className="button-33" role="button" onClick={()=>handleAddToCart(item)}>Add to cart </button>
</div>
</div>
);
};

export default WishItem;

