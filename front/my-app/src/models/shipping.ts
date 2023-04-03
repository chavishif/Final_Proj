import CartItemType from "./cartItem"

export default interface ShippingType {
    image?: any
    address?: string
    city?: string
    postalCode?: string
    country?: string
    phone?: string
    cartItems?:any
    taxPrice?:any
    shippingPrice?:any
    totalPrice?:any
    isDelivered?:boolean
    deliveredAt?:string
    orderItems?:CartItemType[]
   


}
