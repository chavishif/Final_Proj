import React, { useState } from 'react'
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import Message from './Message';
import { createOrderReviewAsync } from './profileSlice';


const Review = (props: any) => {
    const dispatch = useAppDispatch()
    const product = props.product;
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')
    const access = useState(localStorage.getItem("access") || "");



    const submitHandler = (e: any) => {

        e.preventDefault()
        // console.log(id)

        dispatch(createOrderReviewAsync(
            {
                access: access[0],
                product,
                rating,
                comment
            }
        )).then((res: any) => {
            console.log(res)
            alert(res.payload.detail);
            setRating('');
            setComment('');
        })
            .catch((error) => {
                console.error(error);
            });


    }


    return (
        <div>
            <ListGroup>
                <ListGroup.Item>
                    <h4>Write a review</h4>

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                as='select'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            >
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='comment'>
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                                as='textarea'
                                // row='5'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button

                            type='submit'
                            variant='primary'
                        >
                            Submit
                        </Button>

                    </Form>


                </ListGroup.Item>

            </ListGroup>

        </div >

    )
}

export default Review