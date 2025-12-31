import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import CheckoutPath from './CheckoutPath'

function Payment() {
    const orderItem=JSON.parse(sessionStorage.getItem('orderItem'))
  return (
    <>
    <PageTitle title='Payment'></PageTitle>
    <Navbar></Navbar>
    <CheckoutPath activePath={2}></CheckoutPath>
        <Link to='/order/confirm'>GoBack</Link>
        <button>Pay{orderItem.total}</button>


    <Footer></Footer>
    </>
  )
}

export default Payment
