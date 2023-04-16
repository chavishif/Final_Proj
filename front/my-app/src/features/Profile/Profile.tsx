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

   
   
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const myOrders = useAppSelector(selectMYOrders);
    const access = useState(localStorage.getItem("access")||"");
    
   

  
    useEffect(() => {
       dispatch(getMyOrdersAsync(access[0]))
    }, [])

return (
    <div>

        

        <Col md={14}>
            <h2>My Orders</h2>
         
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
        

    </div>
);
}
      
    
                 
                                   
export default Profile