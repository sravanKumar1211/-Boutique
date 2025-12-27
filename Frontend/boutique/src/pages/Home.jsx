import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/Product'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/products/productSlice'


function Home() {

  const {loading,error,products,productCount}= useSelector((state)=>state.product);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch])

  return (
    <div>
      <PageTitle title="Home"></PageTitle>
      <Navbar></Navbar>
      <ImageSlider></ImageSlider>
      <h1>Home</h1>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-10">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>

      <Footer></Footer>
    </div>
  )
}

export default Home
