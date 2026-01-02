
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
        "Shirts": "shirts",
        "Kurtis":"kurtis",
        "Kids":"kids"
    };

    const handleCategoryClick = (displayCat) => {
        const dbCat = categoryMap[displayCat];
        const newSearchParams = new URLSearchParams(location.search);
        
        if (category === dbCat) {
            newSearchParams.delete('category');
        } else {
            newSearchParams.set('category', dbCat);
        }
        
        newSearchParams.delete('page');
        navigate(`?${newSearchParams.toString()}`);
    }

    return (
        <div className="bg-[#f8f8f8] min-h-screen flex flex-col font-sans">
            <PageTitle title='All Products | Exclusive Collection' />
            <Navbar />

            {loading ? <Loader /> : (
                <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-grow">
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        
                        {/* Sidebar */}
                        <aside className="md:col-span-1">
                            <div className="sticky top-24 border border-gray-200 bg-white shadow-sm rounded-sm p-5">
                                <h3 className="text-[#76153C] font-bold text-xs mb-5 tracking-[0.2em] uppercase border-b border-gray-100 pb-3">
                                    Filter by Category
                                </h3>

                                <ul className="space-y-4">
                                    {Object.keys(categoryMap).map((displayCat) => (
                                        <li 
                                            key={displayCat}
                                            onClick={() => handleCategoryClick(displayCat)}
                                            className={`text-sm cursor-pointer transition-all duration-200 flex items-center justify-between group
                                            ${
                                                category === categoryMap[displayCat]
                                                    ? "text-[#BF124D] font-bold"
                                                    : "text-gray-500 hover:text-[#67B2D8]"
                                            }`}
                                        >
                                            <span>{displayCat}</span>
                                            {category === categoryMap[displayCat] && <span className="w-1.5 h-1.5 rounded-full bg-[#BF124D]"></span>}
                                        </li>
                                    ))}

                                    {category && (
                                        <li
                                            onClick={() => navigate('/products')}
                                            className="text-[10px] text-[#67B2D8] font-bold mt-6 cursor-pointer hover:text-[#BF124D] uppercase tracking-widest border-t border-gray-50 pt-4"
                                        >
                                            × Clear all filters
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </aside>

                        {/* Products Content Area */}
                        <section className="md:col-span-3">
                            
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4 bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
                                <h2 className="text-lg font-bold text-gray-800">
                                    Our <span className="text-[#BF124D]">Collection</span>
                                    {category && <span className="text-gray-400 font-normal ml-2">/ {category}</span>}
                                </h2>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    {products?.length || 0} Products Found
                                </span>
                            </div>

                            {/* Strict 2-Column Grid */}
                            <div className="grid grid-cols-2 gap-4 sm:gap-8">
                                {products?.length > 0 ? (
                                    products.map((product) => (
                                        <div key={product?._id} className="w-full">
                                            <Product product={product} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-32 text-center bg-white border border-dashed border-gray-300 rounded-sm">
                                        <p className="text-gray-400 font-medium italic">No pieces found matching your criteria.</p>
                                    </div>
                                )}
                            </div>

                            {/* Styled Pagination Section */}
                            <div className="mt-16 flex justify-center border-t border-gray-200 pt-10">
                                <div className="pagination-wrapper">
                                    <Pagination
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            )}

            <Footer />

                <style jsx="true">{`
            /* 1. THE INACTIVE NUMBERS (The ones you couldn't see) */
            .pagination-wrapper :global(.page-link),
            .pagination-wrapper :global(button) {
                color: #76153C !important;          /* Dark Maroon Text */
                background-color: #f3f3f3 !important; /* Light Gray Background (not white!) */
                border: 1px solid #d1d1d1 !important;
                font-weight: 600;
            }

            /* 2. THE ACTIVE NUMBER (Current Page) */
            .pagination-wrapper :global(.active),
            .pagination-wrapper :global(.page-item.active .page-link),
            .pagination-wrapper :global(.page-item.active button) {
                background-color: #BF124D !important; /* Bright Crimson Background */
                color: #ffffff !important;            /* Pure White Text */
                border-color: #76153C !important;
            }

            /* 3. THE HOVER STATE */
            .pagination-wrapper :global(.page-link:hover),
            .pagination-wrapper :global(button:hover) {
                color: #67B2D8 !important;            /* Sky Blue Text */
                background-color: #ffffff !important; /* White background only on hover */
                border-color: #67B2D8 !important;
            }

            .pagination-wrapper :global(.page-item) {
                margin: 0 4px;
            }
        `}</style>
            
        </div>
    )
}

export default Products