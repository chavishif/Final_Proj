import Icred from "../../models/cred";
import axios from "axios"
import jwt_decode from "jwt-decode";
import Iprof from "../../models/profile";
import { MY_SERVER_CREATEORDERREVIEW, MY_SERVER_GETSHIPPINGINFO, MY_SERVER_MYADDRESSSBYID, MY_SERVER_MYORDERS,
   MY_SERVER_MYORDERSBYID,
    MY_SERVER_PROFILE } from "../../env";





export function addprofile(profile: Iprof) {
  let decoded: any = jwt_decode(profile.access);
  // console.log( decoded.user_id)
   return new Promise<{data : Iprof}>((resolve, reject) => {
    axios.post(MY_SERVER_PROFILE, {bio: profile.bio, 
      location: profile.location,
      birth_date: profile.birth_date,
      user: decoded.user_id}, 
     { 
      headers: {
        'Authorization': `Bearer ${profile.access}`
      }
    })
    .then(res => resolve({ data: res.data }))
    .catch(err => reject(err));
  });
}


export function updprofile(profile: Iprof) {
  let decoded: any = jwt_decode(profile.access);
   return new Promise<{data : Iprof}>((resolve, reject) => {
    axios.put(MY_SERVER_PROFILE + profile.id, {
      bio: profile.bio, 
      location: profile.location,
      birth_date: profile.birth_date,
      user: decoded.user_id}, 
     { 
      headers: {
        'Authorization': `Bearer ${profile.access}`
      }
    })
    .then(res => resolve({ data: res.data }))
    .catch(err => reject(err));
  });
}


export function getprofile(access : any) {
   return new Promise<{data : Iprof[]}>((resolve, reject) => {
    axios.get(MY_SERVER_PROFILE,{
      headers: {
        'Authorization': `Bearer ${access}`
      }
    })
    .then(res => resolve({ data: res.data }))
    .catch(err => reject(err));
  });
}


export function myOrders(access : any) {
  // console.log(access)
  return new Promise<any>((resolve, reject) => {
   axios.get(MY_SERVER_MYORDERS,{
     headers: {
       'Authorization': `Bearer ${access}`
     }
   })
   .then(res => resolve({ data: res.data }))
   .catch(err => reject(err));
 });
}

export function myOrdersById(accessId : any) {
  return new Promise<any>((resolve, reject) => {
   axios.get(MY_SERVER_MYORDERSBYID + `${accessId.id}`,{
     headers: {
       'Authorization': `Bearer ${accessId.access}`
     }
   })
   .then(res => resolve({ data: res.data }))
   .catch(err => reject(err));
 });
}


export function myAddressById(accessId : any) {
  return new Promise<any>((resolve, reject) => {
   axios.get(MY_SERVER_MYADDRESSSBYID + `${accessId.id}`,{
     headers: {
       'Authorization': `Bearer ${accessId.access}`
     }
   })
   .then(res => resolve({ data: res.data }))
   .catch(err => reject(err));
 });
}


export function createReview(reviewaccessId : any) {
  return new Promise<any>((resolve, reject) => {
   axios.post(MY_SERVER_CREATEORDERREVIEW ,{
    rating: reviewaccessId.rating, 
    comment: reviewaccessId.comment,
    product : reviewaccessId.product
   }, 
  {
     headers: {
       'Authorization': `Bearer ${reviewaccessId.access}`
     }
   })
   .then(res => resolve({ data: res.data }))
   .catch(err => reject(err));
 });
}

export function getmyshippinginfo(access : any) {
  return new Promise<any>((resolve, reject) => {
   axios.get(MY_SERVER_GETSHIPPINGINFO ,{
     headers: {
       'Authorization': `Bearer ${access}`
     }
   })
   .then(res => resolve({ data: res.data }))
   .catch(err => reject(err));
 });

}