import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import CheckoutPath from './CheckoutPath'
import axios from 'axios'

function Payment() {
    const orderItem=JSON.parse(sessionStorage.getItem('orderInfo'))
    const completePayment=async(amount)=>{
        const {data:keyData}=await axios.get('/api/v1/getkey');
        const {key}=keyData;
        const {data:orderData}=await axios.post('/api/v1/payment/process',{amount});
        const {order}=orderData
        console.log(key,order)
    }
    console.log(orderItem)
  return (
    <>
    <PageTitle title='Payment'></PageTitle>
    <Navbar></Navbar>
    <CheckoutPath activePath={2}></CheckoutPath>
        <Link to='/order/confirm'>GoBack</Link>
       
        <button onClick={()=>completePayment(orderItem.totalPrice)}>Pay{orderItem.totalPrice}</button>


    <Footer></Footer>
    </>
  )
}

export default Payment
