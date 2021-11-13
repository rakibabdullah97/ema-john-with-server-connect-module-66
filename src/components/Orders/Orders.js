import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Orders = () => {
    const {user} =useAuth()
    const [orders, setOrders] = useState([])
    const history = useHistory()
    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user.email}`,{
            headers:{
                'authorization':`Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res =>{
                if(res.status === 200){
                    return res.json()
                }
                else if(res.status === 401){
                    history.push('/login')
                }
            })
            .then(data => setOrders)
    }, [])
    return (
        <div>
            <h2>You Have Placed: {orders.length}  </h2>
            <ul>
                {orders.map(order => <li
                key={order._id}
                >{order.name}:{order.email}</li>)}
            </ul>
        </div>
    );
};

export default Orders;