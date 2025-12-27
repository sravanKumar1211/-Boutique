import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <ImageSlider></ImageSlider>
      <h1>Home</h1>
      <Footer></Footer>
    </div>
  )
}

export default Home
