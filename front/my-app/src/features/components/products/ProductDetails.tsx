import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { Product } from '../../../models/products';
import { Link, useParams } from 'react-router-dom';
import '../../../styles/details.css';
import { RootState } from '../../../app/store';
import { IoArrowBack } from 'react-icons/io5';
import { AiOutlineArrowLeft, AiOutlineHeart } from "react-icons/ai";
import { selectProducts } from '../../../services/productsSlice';
import { addToWishlist } from '../../../services/wishlistSlice';
import { addToCart } from '../../../services/cartSlice';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import Message from '../../Profile/Message';
import Rating from './Rating';
import CartItemType from '../../../models/cartItem';

const ProductDetails = () => {
  const { id } = useParams<{ id: any }>();
  const products = useAppSelector(selectProducts);
  const product: Product | undefined = products.find((product) => product.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  const handleAddToWishlist = (product: any) => {
    dispatch(addToWishlist({
      id: product.id, image: `http://127.0.0.1:8000${product.proimage}`,
      name: product.name, price: product.price, quantity
    }))
  }

  const handleAddToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItem = cart.cartItems.find((item: { id: any; }) => item.id === product.id);

    if ((cartItem? cartItem.count_in_stock >= 2: product.count_in_stock > 0) && (product.count_in_stock > 0)) {
      dispatch(
        addToCart({
          id: product.id,
          image: `http://127.0.0.1:8000${product.proimage}`,
          name: product.name,
          price: product.price,
          quantity,
          count_in_stock: product.count_in_stock
        })
      );
    } else {
      alert(`no items in stock`);
    }
  };
  


  return (
    <div className="details">
      {product ? (
        <>
          <div className="image">
           
            <img src={`http://127.0.0.1:8000${product.proimage}`} height={400} width={500} alt={product.name} />
            <Link to={`/category/${product.category}`}>
       

              <button className="button-33" role="button">
                <AiOutlineArrowLeft /> Back
              </button>
            </Link>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

          </div>
        

          <div className="info">
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <p className="size">Size: {product.size_spec}</p>
            <br></br>
            <div className="quantity">
              <label htmlFor="quantity">Quantity:</label>
              <button onClick={decrementQuantity}>-</button>
              <input type="number" id="quantity" value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))} />
              <button onClick={incrementQuantity}>+</button>
            </div>
            <br></br>

            {/* low in stock */}
            <div 
              style={{ color: product.count_in_stock < 5 ? "red" : "inherit", fontWeight: "bold" }}>
              {product.count_in_stock < 5 && product.count_in_stock > 0 ? <span> Low in stock </span> : ""}
              {product.count_in_stock <= 0 && <span>Out of stock</span>}
            </div>
            <br></br>



            <p className="price">${product.price}</p>



            <button className="button-33"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight" onClick={() => handleAddToCart(product)}


            >
              Add to cart </button>


            <button className="btn btn-outline-dark"
              type="button" data-bs-toggle="offcanvas"
              data-bs-target="#offcanvas2"
              aria-controls="offcanvas2" onClick={() => handleAddToWishlist(product)}>
              <AiOutlineHeart />

            </button>
            <br></br>
            <br></br>
            <h4>Reviews</h4>
            {product.reviews && product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

            {product.reviews && product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} color='#f8e825' />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </div>

        </>
      ) : (
        <div>

        </div>

      )
      }

    </div >
  );
};

export default ProductDetails;
