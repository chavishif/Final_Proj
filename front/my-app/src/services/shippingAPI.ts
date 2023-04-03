import axios from "axios"

import { MY_SERVER_ADDSHIPPING, MY_SERVER_AddOrder, MY_SERVER_UPDSHIPPING } from "../env";
import ShippingType from "../models/shipping";

// localStorage.setItem("cart", JSON.stringify(obj));


export function createorder(shipping:ShippingType) {
  
  return new Promise< {data: ShippingType} >((resolve) =>
    axios.post( MY_SERVER_AddOrder,{
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


  export function createshipping(shipping:any) {
  
    return new Promise< {data: any} >((resolve) =>
      axios.post( MY_SERVER_ADDSHIPPING,{
        phone:shipping.phone,
        address:shipping.address,
        city:shipping.city,
        country:shipping.country,
        postalCode:shipping.postalCode,
          
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
        }
      })
      
      .then(res => resolve({ data: res.data }))
      // .catch(err => reject(err));
    )};
  
  
    
  export function updateshipping(shipping:any) {
  console.log(shipping)
    return new Promise< {data: any} >((resolve) =>
      axios.put( MY_SERVER_UPDSHIPPING,{
        phone:shipping.phone,
        address:shipping.address,
        city:shipping.city,
        country:shipping.country,
        postalCode:shipping.postalCode,
          
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
        }
      })
      
      .then(res => resolve({ data: res.data }))
    )};
  
  

    