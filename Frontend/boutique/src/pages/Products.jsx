
import React, { useEffect } from 'react'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, removeErrors } from '../features/products/productSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

function Products() {
    const { loading, error, products } = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            toast.error(error.message || "An error occurred", { position: 'top-center', autoClose: 5000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])

    const categories = ["Sarees", "Bridal", "Accessories", "Casual", "Embroidery"];
        console.log("products:" ,products)
    return (
        <div className="bg-black min-h-screen flex flex-col">
            <PageTitle title='All Products' />
            <Navbar />

            {loading ? (
                <Loader />
            ) : (
                <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        
                        {/* Left Section */}
                        <aside className="md:col-span-1">
                            <div className="sticky top-24">
                                <h3 className="text-[#D4AF37] font-bold text-lg mb-4 tracking-widest border-b border-[#6D1A36] pb-2">
                                    CATEGORIES
                                </h3>
                                <ul className="space-y-3">
                                    {categories.map((cat) => (
                                        <li 
                                            key={cat} 
                                            className="text-gray-400 hover:text-[#D4AF37] cursor-pointer transition-colors duration-200 text-sm uppercase tracking-wider"
                                        >
                                            {cat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        {/* Right Section */}
                        <section className="md:col-span-3">
                            <h2 className="text-white text-2xl font-semibold mb-6">Our Collection</h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* FIX: Added ?. before .length to be 100% safe */}
                                {products?.length > 0 ? (
                                    products.map((product) => (
                                        <Product key={product?._id} product={product} />
                                    ))
                                ) : !loading ? (
                                    <p className="text-gray-500 col-span-full text-center py-20">
                                        No products found.
                                    </p>
                                ) : null}
                            </div>
                        </section>
                    </div>
                </main>
            )}

            <Footer />
        </div>
    )
}

export default Products