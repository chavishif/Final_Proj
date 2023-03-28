export default interface ShippingType {
    address: string
    city: string
    postalCode: string
    country: string
    phone: string
    cartItems?:any
    taxPrice?:any
    shippingPrice?:any
    totalPrice?:any

}
