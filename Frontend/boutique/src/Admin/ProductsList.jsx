import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, removeErrors, deleteProduct, removeSuccess } from '../features/admin/adminSlice';
import { Edit, Delete, Inventory, Search, FilterList, InfoOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';

function ProductsList() {
    const dispatch = useDispatch();
    const { products, loading, error, success, deleteLoading } = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }

        if (success) {
            toast.success("Action Successful");
            dispatch(removeSuccess());
            dispatch(fetchAdminProducts());
        }
    }, [dispatch, error, success]);

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <div className="bg-[#f0f2f2] min-h-screen text-gray-800 flex flex-col font-sans">
            <Navbar />
            <PageTitle title="Manage Inventory | Vendor Central" />

            <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-6 md:py-10">
                {/* Amazon Vendor Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#5A0E24] flex items-center gap-2">
                            Manage Inventory
                        </h1>
                        <p className="text-sm text-gray-600">View and manage your luxury product listings</p>
                    </div>
                    
                    <Link 
                        to="/admin/product/create" 
                        className="bg-[#BF124D] text-white px-5 py-2 rounded-md text-sm font-bold shadow-sm hover:bg-[#76153C] transition-all flex items-center gap-2"
                    >
                        <Inventory fontSize="small" /> Add a Product
                    </Link>
                </div>

                {/* Search & Filter Bar (Amazon Style) */}
                <div className="bg-white border border-gray-300 p-3 rounded-t-md flex flex-wrap gap-4 items-center">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" fontSize="small" />
                        <input 
                            type="text" 
                            placeholder="Search by SKU, Title or Category..." 
                            className="w-full pl-8 pr-4 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-[#67B2D8] text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-600 border border-gray-300 px-3 py-1.5 rounded bg-[#f7f7f7] hover:bg-gray-100">
                        <FilterList fontSize="small" /> Filters
                    </button>
                    <div className="ml-auto text-xs text-gray-500 italic">
                        Showing {products?.length || 0} items
                    </div>
                </div>

                {loading || deleteLoading ? (
                    <div className="bg-white border border-t-0 border-gray-300 flex justify-center py-32 rounded-b-md">
                        <div className="flex flex-col items-center gap-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#BF124D]"></div>
                            <p className="text-sm font-medium text-gray-500">Retrieving Inventory Data...</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border border-t-0 border-gray-300 rounded-b-md shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f7f7f7] border-b border-gray-300">
                                        <th className="p-3 text-[11px] font-bold uppercase text-gray-600 w-12 text-center">#</th>
                                        <th className="p-3 text-[11px] font-bold uppercase text-gray-600">Image</th>
                                        <th className="p-3 text-[11px] font-bold uppercase text-gray-600 min-w-[200px]">Product Details</th>
                                        <th className="p-3 text-[11px] font-bold uppercase text-gray-600">Category</th>
                                        <th className="p-3 text-[11px] font-bold uppercase text-gray-600">Price</th>
                                        <th className="p-3 text-[11px] font-bold uppercase text-gray-600">Available</th>
                                        <th className="p-3 text-[11px] font-bold uppercase text-gray-600 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products && products.map((item, index) => (
                                        <tr key={item._id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="p-3 text-xs text-gray-400 text-center">{index + 1}</td>
                                            <td className="p-3">
                                                <img 
                                                    src={item.image && item.image[0] ? item.image[0].url : 'https://via.placeholder.com/150'} 
                                                    alt={item.name} 
                                                    className="w-14 h-14 object-contain rounded border border-gray-200 bg-white" 
                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150' }} 
                                                />
                                            </td>
                                            <td className="p-3">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-[#5A0E24] hover:underline cursor-pointer">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 mt-1 uppercase font-mono tracking-tighter">
                                                        SKU: {item._id.substring(0, 8)}...
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="p-3 text-sm font-bold">
                                                ₹{item.price?.toLocaleString()}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-xs font-bold ${item.stock < 10 ? 'text-[#BF124D]' : 'text-green-700'}`}>
                                                        {item.stock} units
                                                    </span>
                                                    <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full ${item.stock < 10 ? 'bg-[#BF124D]' : 'bg-green-500'}`} 
                                                            style={{ width: `${Math.min(item.stock, 100)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <Link 
                                                        to={`/admin/product/${item._id}`} 
                                                        className="p-1.5 border border-gray-300 rounded bg-white text-gray-600 hover:text-[#67B2D8] hover:border-[#67B2D8] transition-all shadow-sm"
                                                        title="Edit Listing"
                                                    >
                                                        <Edit sx={{ fontSize: 16 }} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => deleteHandler(item._id)}
                                                        disabled={deleteLoading}
                                                        className="p-1.5 border border-gray-300 rounded bg-white text-gray-600 hover:text-[#BF124D] hover:border-[#BF124D] transition-all shadow-sm disabled:opacity-50"
                                                        title="Delete Listing"
                                                    >
                                                        <Delete sx={{ fontSize: 16 }} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            {(!products || products.length === 0) && (
                                <div className="text-center py-24">
                                    <div className="flex flex-col items-center gap-2">
                                        <InfoOutlined sx={{ fontSize: 40, color: '#ccc' }} />
                                        <p className="text-sm font-bold text-gray-400">Your inventory is currently empty</p>
                                        <Link to="/admin/product/create" className="text-sm text-[#67B2D8] font-bold hover:underline">
                                            List your first product now
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Amazon Style Pagination Footer */}
                        <div className="p-4 bg-[#f7f7f7] border-t border-gray-300 flex justify-between items-center text-xs text-gray-600 font-medium">
                            <div>Items per page: 15</div>
                            <div className="flex gap-4">
                                <span>Page 1 of 1</span>
                                <div className="flex gap-2">
                                    <button className="px-2 border border-gray-300 bg-white disabled:opacity-50">Prev</button>
                                    <button className="px-2 border border-gray-300 bg-white disabled:opacity-50">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ProductsList;



