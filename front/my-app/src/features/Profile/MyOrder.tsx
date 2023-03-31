import React, { useEffect, useState } from 'react'
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectEmail } from '../login/loginSlice';
import Message from './Message';
import {
  getMyAddressByIdsAsync,
  getMyOrderByIdsAsync,
  selectMYAddressOrders,
  selectMYOrdersById
} from './profileSlice'
import Review from './Review';



const MyOrder = () => {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch()
  const access = useState(localStorage.getItem("access") || "");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const email = useAppSelector(selectEmail);
  const MyAddress = useAppSelector(selectMYAddressOrders);
  const MyOrder = useAppSelector(selectMYOrdersById);
  const orderItem = MyOrder?.[0]?.orderItems;
  const shippinPrice = MyOrder?.[0]?.shippingPrice;
  const totPrice = MyOrder?.[0]?.totalPrice;
  const taxsPrice = MyOrder?.[0]?.taxPrice;



// console.log(MyOrder)
  useEffect(() => {
    dispatch(getMyOrderByIdsAsync({ access: access[0], id }))
    dispatch(getMyAddressByIdsAsync({ access: access[0], id }))

  }, [])



  return (

    <div>
      <h1>Order</h1>
      <Row>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {username}</p>
              <p><strong>Email: </strong>{email}</p>
              <p><strong>Phone: </strong>
                {MyAddress.map((add: any, index: any) => (
                  <div key={index}>
                    {add.phone}
                  </div>
                ))}
              </p>
              <p><strong>Shipping: </strong>
                {MyAddress.map((add: any, index: any) => (
                  <div key={index}>
                    {add.address}, {add.city}, {add.postalCode} , {add.country}
                  </div>
                ))}
              </p>
              {MyOrder.map((order: any, index: any) => (
                <div key={index}>
                  {order.isDelivered ? (
                    <h5> Delivered on: {order.deliveredAt} </h5>
                  ) : (
                    <Message variant='warning'>Not Delivered</Message>
                  )}
                </div>
              ))}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderItem?.length === 0 ? <div > Order is empty </div> : (
                <ListGroup variant='flush' >
                  {orderItem?.map((item: any, index: any) => (
                    <ListGroup.Item key={index}>
                      <Row >
                        <Col md={1}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}</Link>
                        </Col>
                        <Col md={1}>
                        </Col>
                        <Col md={3}>
                          {item.quantity} X ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                        </Col>
                        <Col md={7}>
                          {MyOrder.map((order: any, index: any) => (
                            <div key={index}>
                              {/* //////////////////////////////////////////////// */}
                              {order ? (
                                <div>
                                  <Review product={item.product} />
                                </div>

                              ) : (
                                <></>
                              )}
                            </div>
                          ))} 
                            </Col>                    
                            </Row>
                    </ListGroup.Item>
                
                  ))}
                  
                </ListGroup>
                  
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          <ListGroup variant='flush' style={{ display: "flex", marginTop: "20%" }}>
            <ListGroup.Item>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping:</Col>
                      <Col>${shippinPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>${taxsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total:</Col>
                      <Col>${totPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}
export default MyOrder