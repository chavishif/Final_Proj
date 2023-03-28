import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks'
import { getMyOrderByIdsAsync } from './profileSlice'



const MyOrder = () => {
    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch()
    const access = useState(localStorage.getItem("access")||"");

    useEffect(() => {
        dispatch(getMyOrderByIdsAsync({access:access[0], id}))
    },  [dispatch, access, id])
    
  return (

    <div>
        MyOrder
        <h1>{id}</h1>
        </div>
  )
}

export default MyOrder