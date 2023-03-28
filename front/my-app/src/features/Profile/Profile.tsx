import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import { getUserDetails, updateUserProfile } from '../actions/userActions'
// import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
// import { listMyOrders } from '../actions/orderActions'
import Loader from './Loader'
import Message from './Message'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getMyOrdersAsync, selectMYOrders } from './profileSlice'
import { selectAccess } from '../login/loginSlice'
import { LinkContainer } from 'react-router-bootstrap'
import "../../../src/styles/cart.css";

function Profile() {

   
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const myOrders = useAppSelector(selectMYOrders);
    const access = useState(localStorage.getItem("access")||"");
    
    // const userDetails = useSelector(state => state.userDetails)
    // const { error, loading, user } = userDetails

    // const userLogin = useSelector(state => state.userLogin)
    // const { userInfo } = userLogin

    // const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    // const { success } = userUpdateProfile

    // const orderListMy = useSelector(state => state.orderListMy)
    // const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


    // useEffect(() => {
    //     if (!userInfo) {
    //         navigate('/login')
    //     } else {
    //         if (!user || !user.name || success || userInfo._id !== user._id) {
    //             // dispatch({ type: USER_UPDATE_PROFILE_RESET })
    //             // dispatch(getUserDetails('profile'))
    //             // dispatch(listMyOrders())
    //         } else {
    //             setName(user.name)
    //             setEmail(user.email)
    //         }
    //     }
    // }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e: any) => {
        e.preventDefault()

     
            console.log("first")
            // dispatch(updateUserProfile({
            //     'id': user._id,
            //     'name': name,
            //     'email': email,
            //     'password': password
        
        setMessage('')
    }
    useEffect(() => {
       dispatch(getMyOrdersAsync(access[0]))
    }, [])

return (
    <div>
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>

            {/* {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />} */}


            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='address'
                        placeholder='Enter address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label> City </Form.Label>
                    <Form.Control
                        required
                        type='city'
                        placeholder='Enter city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control

                        type='postalCode'
                        placeholder='Enter postalCode'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='phone'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control

                        type='phone'
                        placeholder='Enter phone'
                        value={confirmPassword}
                        onChange={(e) => setPhone(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>

            </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
            {/* {loadingOrders ? (
                <Loader />
            ) : errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
            ) : ( */}
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody> 
                        {myOrders.map(order => (
                            <tr key={order._id}>
                                <td>######98764{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                               
                                <td>
                                    <LinkContainer to={`/myorder/${order._id}`}>
                                        <Button className="button-33" role="button">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
          
            
        </Col>
        
    </Row>
    </div>
);
}
      
    
                 
                                   
export default Profile