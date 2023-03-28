import React, { useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Form, Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import ShippingType from '../../../models/shipping';
import { createorderAsync } from '../../../services/shippingSlice';
import "../../../styles/details.css"
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface ShippingAddressFormProps {
    initialValues: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phone: string;
    };
}
const Shipping = () => {
    const dispatch = useAppDispatch();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");

    const cart = localStorage.getItem("cart"); // Get the value of the "cart" key from localStorage
    const cartObject = JSON.parse(cart || ""); // Convert the JSON string to a JavaScript object
    const cartItems = cartObject.cartItems; // Get the value of "cartItems" from the "cart" object
    const totalPrice = cartObject.totalAmount

    cartItems.price = cartItems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0).toFixed(2)
    const shippingPrice = (cartItems.price > 100 ? 0 : 10).toFixed(2)
    const taxPrice = Number((0.082) * totalPrice).toFixed(2)

    const totalOrder = (Number(cartItems.price) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
    const navigate = useNavigate();

    const handleorder = (dispatch: ThunkDispatch<{}, {}, AnyAction>, navigate: (path: string) => void) => {
        return async (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault(); // Prevent the default behavior of the button
            // Check if any of the required fields are empty
            if (!address || !city || !country || !phone || !postalCode || !cartItems || !taxPrice || !shippingPrice || !totalOrder) {
                alert('Fill all the fields');
                return;
            }
            try {
                await dispatch(
                    createorderAsync({
                        address,
                        city,
                        country,
                        phone,
                        postalCode,
                        cartItems,
                        taxPrice,
                        shippingPrice,
                        totalPrice: totalOrder,
                    })
                );
                navigate('/paypal');
            } catch (error) {
                console.error(error);
                // Handle error and display a message to the user
            }
        };
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
    }




    return (
        <div>

            <Row>
                <Col md={4}>
                    <Card style={{ display: "flex", marginTop: "20%" }}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col style={{ fontSize: "20px" }}>Items:</Col>
                                    <Col >x {cartObject.quantity}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col style={{ fontSize: "20px" }}>Shipping:</Col>
                                    <Col>$ {shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col style={{ fontSize: "20px" }}>Tax:</Col>
                                    <Col>$ {taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col style={{ fontSize: "20px" }}>Total:</Col>
                                    <Col>$ {totalOrder}</Col>
                                </Row>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>

                </Col>
                <Col md={4} >
                    <ListGroup variant='flush' style={{ display: "flex", marginTop: "20%" }} >
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.length === 0 ? <div >Your cart is empty</div> : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item: any, index: any) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <img src={item.image} alt={item.name} width={100} height={100} />

                                                </Col>

                                                <Col>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <Link to={`/product/${item.id}`}>
                                                        {item.name}</Link>

                                                </Col>

                                                <Col md={7}>
                                                    {item.quantity} X ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>

                </Col >

                <Col md={4} >
                    <form onSubmit={handleSubmit} style={{ backgroundColor: "white" }}>
                        <div >
                            <h2>Shipping Details</h2>
                            <label style={{ fontSize: "22px" }} htmlFor="address">Address</label>
                            <br></br>
                            <input
                                required
                                placeholder='Street Number, Floor'
                                type="text"
                                id="address"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: "22px" }} htmlFor="city">City</label>
                            <br></br>
                            <input
                                placeholder='City'
                                type="text"
                                id="city"
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="postalCode" style={{ fontSize: "22px" }}>Postal Code</label>
                            <br></br>
                            <input
                                placeholder='Postal Code'
                                type="text"
                                id="postalCode"
                                value={postalCode}
                                onChange={(event) => setPostalCode(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="country" style={{ fontSize: "22px" }}>Country</label>
                            <br></br>
                            <input
                                placeholder='Country'
                                type="text"
                                id="country"
                                value={country}
                                onChange={(event) => setCountry(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" style={{ fontSize: "22px" }}>Phone number</label>
                            <br></br>
                            <input
                                placeholder='Phone number'
                                type="number"
                                id="phone"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                required
                            />
                        </div>
                        <br></br>
                        <button className="button-33" role="button" onClick={handleorder(dispatch, navigate)} >continue to payment</button>

                    </form>
                </Col>
            </Row>



        </div>


    )
};
export default Shipping