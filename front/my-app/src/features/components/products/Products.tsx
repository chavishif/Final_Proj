import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';

import { Product } from '../../../models/products';
import "../../../../src/styles/cards.css"
import { Link, useParams } from 'react-router-dom';
import { getproductsAsync, selectProducts } from '../../../services/productsSlice';
import { addProdQuantity } from '../../../services/cartSlice';

const Products = () => {
  const { name } = useParams<{ name: string }>();
  console.log(name)
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<any>(name);
  const [selectedSubcat, setSelectedSubcat] = useState<string | null>(null);


 

  const filteredProducts = selectedSubcat
    ? products.filter((product) => product.category === selectedCategory && product.subcategory === selectedSubcat)
    : products.filter((product) => product.category === selectedCategory);

  const subcategories = [...new Set(filteredProducts.map((product) => product.subcategory))];


  const filteredSubcats = selectedCategory
    ? [...new Set(products.filter((product) => product.category === selectedCategory).map((product) => product.subcategory))]
    : [...new Set(products.map((product) => product.subcategory))];

  const handleSubcatClick = (category: string, subcat: string) => {
    setSelectedCategory( category);
    setSelectedSubcat( subcat);
  };

  const handleAddToCart = (product:any) => {
    dispatch(addProdQuantity(  { id: product.id,
       image: `http://127.0.0.1:8000${product.proimage}`,
        name: product.name,
         price: product.price, 
         quantity:1 }));
  };

  useEffect(() => {
    console.log('Fetching products with name:', name);
    dispatch(getproductsAsync());
  }, [selectedCategory]);

  useEffect(() => {
    const subcats = selectedCategory
      ? [...new Set(products.filter((product) => product.category === selectedCategory).map((product) => product.subcategory))]
      : [...new Set(products.map((product) => product.subcategory))];
      setSelectedSubcat(null);
  }, [selectedCategory, products]);
  

  return (
    <div>
   
  
      <div>
   <div className="subcategories-container">
        {filteredSubcats.map((subcat) => (
          <span key={subcat}>
            {' '}
            <button
              
              onClick={() => handleSubcatClick( selectedCategory || "", subcat  )}
              className="subcategory-link"
              style={{
                backgroundImage: `url(http://127.0.0.1:8000${filteredProducts.filter(
                  (product) =>
                    product.category === selectedCategory &&
                    product.subcategory === subcat
                )[0]?.subimage})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <br></br>
            {subcat}
            </button>
            |
          </span>
        
        ))}
        <span>
          <Link to="#" onClick={() => setSelectedSubcat(null)}>
            All
          </Link>
        </span>
      </div>
      </div>
      <div>
        {filteredProducts.map((product) => (

          <div className="card" key={product.id}>


            <h2>{product.name}</h2>
  
           
            <Link to={`/product/${product.id}`}>
              <img src={`http://127.0.0.1:8000${product.proimage}`}
                width={200}
                height={200}
                alt={product.name} />
            </Link>

    


            <div className="product">
            <div className='buttons'>
            <button  className="btn btn-primary" type="button"
           data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" 
           aria-controls="offcanvasRight" 
        
             onClick={() =>handleAddToCart(product)} >Add to Cart</button>

          <Link to={`/product/${product.id}`}><button>View Details</button></Link>
          </div>
          </div>
           

          </div>
        ))}

      </div>
    </div>
  );
};

export default Products;
