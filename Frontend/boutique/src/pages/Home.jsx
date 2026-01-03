import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/Product'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/products/productSlice'
import Loader from '../components/Loader'
import { removeErrors } from "../features/products/productSlice.js";
import { toast } from "react-toastify"

function Home() {
  const { loading, error, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct({ keyword: '' }))
  }, [dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 5000 });
      dispatch(removeErrors())
    }
  }, [dispatch, error])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-[#eaeded] min-h-screen font-sans">
          
          <PageTitle title="Home | Exclusive Collection" />
          <Navbar />

          {/* Hero Slider */}
          <div className="relative z-10 border-b border-gray-300">
            <ImageSlider />
          </div>

          {/* Products Section */}
          {/* Changed mt-20 to mt-8 and removed negative margin to prevent overlap on big screens */}
          <section className="max-w-[1400px] mx-auto px-4 py-8 mt-4 relative z-20">
            
            {/* 2x2 Feature Box */}
            <div className="bg-white p-4 sm:p-8 border border-gray-300 shadow-sm rounded-sm">
              
              {/* Heading */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#5A0E24]">
                  Featured <span className="text-[#BF124D]">Products</span>
                </h2>
                <button className="text-sm font-bold text-[#67B2D8] hover:text-[#76153C] hover:underline">
                  Shop all deals
                </button>
              </div>

              {/* Grid Logic */}
              {/* grid-cols-1 on mobile to stop touching, sm:grid-cols-2 for the 2x2 look */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                {products && products.slice(0, 4).map((product) => (
                  <div key={product._id} className="w-full h-full flex justify-center">
                    <Product product={product} />
                  </div>
                ))}
              </div>

              {/* Fallback */}
              {products && products.length === 0 && (
                <div className="py-20 text-center text-gray-500 italic">
                  Curating the best for you...
                </div>
              )}
            </div>
          </section>

          <Footer />
        </div>
      )}
    </>
  )
}

export default Home