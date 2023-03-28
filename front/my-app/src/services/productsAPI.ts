import axios from "axios"

import { MY_SERVER_PRODUCTS } from "../env";
import { Product } from "../models/products";

export function getproducts() {
  // console.log(cred)
  return new Promise<{ data: Product[] }>((resolve) =>
    axios.get( MY_SERVER_PRODUCTS).then(res => resolve({ data: res.data }))
  );
}

// export function register(reg : Icred) {
//   // console.log(cred)
//   return new Promise<{ data: any }>((resolve) =>
//     axios.post(MY_SERVER + "register/", reg).then(res => resolve({ data: res.data }))
//   );
// }

// export function refresh(token: string) {
//   // console.log(cred)
//   return new Promise<{ data: any }>((resolve) =>
//     axios.post(MY_SERVER + "login/refresh/",{refresh:token}).then(res => resolve({ data: res.data }))
//   );
// }