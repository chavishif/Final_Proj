import axios from "axios"

import { MY_SERVER_AddOrder } from "../env";
import ShippingType from "../models/shipping";

// localStorage.setItem("cart", JSON.stringify(obj));


export function createorder(shipping:ShippingType) {
  
  return new Promise< {data: ShippingType} >((resolve) =>
    axios.post( MY_SERVER_AddOrder,{
      phone:shipping.phone,
      address:shipping.address,
      city:shipping.city,
      country:shipping.country,
      postalCode:shipping.postalCode,
      orderItems:shipping.cartItems,
    taxPrice:shipping.taxPrice,
    shippingPrice:shipping.shippingPrice,
    totalPrice:shipping.totalPrice
        
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      }
    })
    
    .then(res => resolve({ data: res.data }))
    // .catch(err => reject(err));
  )};


