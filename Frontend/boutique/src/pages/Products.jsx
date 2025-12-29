import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, removeErrors } from '../features/products/productSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useLocation, useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination'

function Products() {
    const { loading, error, products } = useSelector(state => state.product || {});
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword");
    const category = searchParams.get("category"); 
    const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;
    
    const [currentPage, setCurrentPage] = useState(pageFromURL);

    // Sync state with URL when back/forward or category clicks happen
    useEffect(() => {
        setCurrentPage(pageFromURL);
    }, [pageFromURL]);

    useEffect(() => {
        dispatch(getProduct({ keyword, page: currentPage, category }))
    }, [dispatch, keyword, currentPage, category])

    useEffect(() => {
        if (error) {
            toast.error(error.message || "An error occurred", { position: 'top-center', autoClose: 5000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])

    const handlePageChange = (page) => {
        if (page !== currentPage) {
            const newSearchParams = new URLSearchParams(location.search);
            page === 1 ? newSearchParams.delete('page') : newSearchParams.set('page', page);
            navigate(`?${newSearchParams.toString()}`)
        }
    }

    const categoryMap = {
        "Sarees": "saree",
        "Bridal": "bridal",
        "Accessories": "accessories",
        "Casual": "casual",
        "Embroidery": "embroidery",
        "Shirts": "shirts"
    };

    const handleCategoryClick = (displayCat) => {
        const dbCat = categoryMap[displayCat];
        const newSearchParams = new URLSearchParams(location.search);
        
        if (category === dbCat) {
            newSearchParams.delete('category');
        } else {
            newSearchParams.set('category', dbCat);
        }
        
        // Always reset to page 1 when category changes
        newSearchParams.delete('page');
        navigate(`?${newSearchParams.toString()}`);
    }

    return (
        <div className="bg-black min-h-screen flex flex-col">
            <PageTitle title='All Products' />
            <Navbar />
            {loading ? <Loader /> : (
                <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <aside className="md:col-span-1">
                            <div className="sticky top-24">
                                <h3 className="text-[#D4AF37] font-bold text-lg mb-4 tracking-widest border-b border-[#6D1A36] pb-2">CATEGORIES</h3>
                                <ul className="space-y-3">
                                    {Object.keys(categoryMap).map((displayCat) => (
                                        <li 
                                            key={displayCat} 
                                            onClick={() => handleCategoryClick(displayCat)}
                                            className={`text-sm uppercase tracking-wider cursor-pointer transition-colors duration-200 ${
                                                category === categoryMap[displayCat] ? "text-[#D4AF37] font-bold" : "text-gray-400 hover:text-[#D4AF37]"
                                            }`}
                                        >
                                            {displayCat}
                                        </li>
                                    ))}
                                    {category && (
                                        <li onClick={() => navigate('/products')} className="text-xs text-red-500 mt-4 cursor-pointer hover:underline uppercase">
                                            Clear Filters
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </aside>

                        <section className="md:col-span-3">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-white text-2xl font-semibold italic">Our Collection</h2>
                                {category && <span className="text-[#D4AF37] text-xs font-bold uppercase">Category: {category}</span>}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products?.length > 0 ? (
                                    products.map((product) => <Product key={product?._id} product={product} />)
                                ) : (
                                    <div className="col-span-full py-20 text-center text-gray-500">No products found.</div>
                                )}
                            </div>
                            <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
                        </section>
                    </div>
                </main>
            )}
            <Footer />
        </div>
    )
}

export default Products