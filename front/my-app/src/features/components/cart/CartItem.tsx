import { useDispatch } from "react-redux";
import { removeFromCart, addItemQuantity, subtractItemQuantity } from "../../../services/cartSlice";
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5";
import  CartItemType  from "../../../models/cartItem";
import  "../../../styles/details.css"
import { Link } from "react-router-dom";

interface Props {
item: any;
}

const CartItem: React.FC<Props> = ({ item }) => {
const dispatch = useDispatch();
const { image, name, price, quantity, count_in_stock } = item;



const handleRemoveItem = (): void => {
dispatch(removeFromCart(item));
};

const handleAddItemQuantity = (): void => {
  if (item.quantity <= item.count_in_stock) {
    dispatch(addItemQuantity(item));
  }
  else {
    alert(`${item.count_in_stock} in stock`);
  }
};

const handleSubtractItemQuantity = (): void => {
dispatch(subtractItemQuantity(item));
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
</div>
<div className="quantity">
<button onClick={handleSubtractItemQuantity}>
<IoRemoveSharp />
</button>
<p>{quantity}</p>
<button onClick={handleAddItemQuantity}>
<IoAddSharp />
</button>
</div>
</div>
);
};

export default CartItem;