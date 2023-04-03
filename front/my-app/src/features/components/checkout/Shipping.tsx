import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Form, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ShippingType from '../../../models/shipping';
import { createorderAsync, createshippingAsync, updateshippingAsync } from '../../../services/shippingSlice';
import "../../../styles/details.css"
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getmyshippinginfoAsync, selectMYShippingInfo } from '../../Profile/profileSlice';

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
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const MyAddress = useAppSelector(selectMYShippingInfo);
    const access = useState(localStorage.getItem("access") || "");


    const cart = localStorage.getItem("cart"); // Get the value of the "cart" key from localStorage
    const cartObject = JSON.parse(cart || ""); // Convert the JSON string to a JavaScript object
    const cartItems = cartObject.cartItems; // Get the value of "cartItems" from the "cart" object
    const totalPrice = cartObject.totalAmount

    cartItems.price = cartItems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0).toFixed(2)
    const shippingPrice = (cartItems.price > 100 ? 0 : 10).toFixed(2)
    const taxPrice = Number((0.082) * totalPrice).toFixed(2)

    const totalOrder = (Number(cartItems.price) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
    const navigate = useNavigate();

    const handleOrder = (dispatch: ThunkDispatch<{}, {}, AnyAction>, navigate: (path: string) => void) => {
        return async (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault(); // Prevent the default behavior of the button

            if ((address || MyAddress.address) && (city || MyAddress.city) && (country || MyAddress.country) && (phone || MyAddress.phone) && (postalCode || MyAddress.postalCode)) {

                try {
                    // Dispatch the create order and create shipping actions
                    await Promise.all([
                        dispatch(createorderAsync({
                            cartItems,
                            taxPrice,
                            shippingPrice,
                            totalPrice
                        })),
                        dispatch(createshippingAsync({
                            address,
                            city,
                            country,
                            phone,
                            postalCode,
                        }))
                    ]);

                    // Navigate to the PayPal page
                    navigate('/paypal');
                } catch (error) {
                    console.error(error);
                    // Handle the error and display a message to the user
                    alert('An error occurred while placing your order. Please try again later.');
                }

            } else {
                alert('Please fill all the required fields.');
                return; // Exit the function early if any required field is missing
            }
        }
    };


    const handleupdate = () => {
        dispatch(updateshippingAsync({
            address: address || MyAddress.address,
            phone: phone || MyAddress.phone,
            postalCode: postalCode || MyAddress.postalCode,
            country: country || MyAddress.country,
            city: city || MyAddress.city,
        })).then(response => {
              alert("The changes are saved");
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    }

    useEffect(() => {

        dispatch(getmyshippinginfoAsync(access[0]))
    }, [])


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



                        <div>
                            <h2>Shipping Details</h2>
                            Name : {username}

                            {MyAddress.address != "" ?
                                <>
                                    <div className="form-group">
                                        <label style={{ fontSize: "22px" }} htmlFor="address">Address</label>
                                        <input
                                            required
                                            placeholder='Street Number, Floor'
                                            type="text"
                                            id="address"
                                            defaultValue={MyAddress.address}
                                            onChange={(event) => setAddress(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: "22px" }} htmlFor="city">City</label>
                                        <input
                                            required
                                            placeholder='City'
                                            type="text"
                                            id="city"
                                            defaultValue={MyAddress.city}

                                            onChange={(event) => setCity(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: "22px" }} htmlFor="postalCode">Postal Code</label>
                                        <input
                                            required
                                            placeholder='Postal Code'
                                            type="text"
                                            id="postalCode"
                                            defaultValue={MyAddress.postalCode}
                                            onChange={(event) => setPostalCode(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: "22px" }} htmlFor="country">Country</label>
                                        <input
                                            required
                                            placeholder='Country'
                                            type="text"
                                            id="country"
                                            defaultValue={MyAddress.country}
                                            onChange={(event) => setCountry(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: "22px" }} htmlFor="phone">Phone number</label>
                                        <input
                                            required
                                            placeholder='Phone number'
                                            type="text"
                                            id="phone"
                                            value={MyAddress.phone}
                                            onChange={(event) => setPhone(event.target.value)}
                                        />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="form-group">
                                        <label style={{ fontSize: "22px" }} htmlFor="address">Address</label>
                                        <input
                                            required
                                            placeholder='Street Number, Floor'
                                            type="text"
                                            id="address"
                                            value={address}
                                            onChange={(event) => setAddress(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: "22px" }} htmlFor="city">City</label>
                                        <input
                                            required
                                            placeholder='City'
                                            type="text"
                                            id="city"
                                            value={city}
                                            onChange={(event) => setCity(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: "22px" }} htmlFor="postalCode">Postal Code</label>
                                        <input
                                            required
                                            placeholder='Postal Code'
                                            type="text"
                                            id="postalCode"
                                            value={postalCode}
                                            onChange={(event) => setPostalCode(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: "22px" }} htmlFor="country">Country</label>
                                        <input
                                            required
                                            placeholder='Country'
                                            type="text"
                                            id="country"
                                            value={country}
                                            onChange={(event) => setCountry(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ fontSize: "22px" }} htmlFor="phone">Phone</label>
                                        <input
                                            required
                                            placeholder='phone'
                                            type="text"
                                            id="phone"
                                            value={phone}
                                            onChange={(event) => setPhone(event.target.value)}
                                        />
                                    </div>
                                </>
                            }
                            <br></br>
                            <button className="button-33" role="button" onClick={handleOrder(dispatch, navigate)}>continue to payment</button>
                            <button className="button-33" role="button" onClick={handleupdate}>save changes</button>

                        </div>
                    </form>

                </Col>
            </Row>
        </div>





    )
};
export default Shipping