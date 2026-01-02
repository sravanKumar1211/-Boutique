import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, removeErrors, deleteProduct, removeSuccess } from '../features/admin/adminSlice';
import { Edit, Delete, Inventory } from '@mui/icons-material';
import { toast } from 'react-toastify';

function ProductsList() {
    const dispatch = useDispatch();
    const { products, loading, error, success, deleteLoading } = useSelector(state => state.admin);

    // FIX 1: Initial Load Only
    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    // FIX 2: Handle Success/Error separately to avoid infinite loops
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }

        if (success) {
            toast.success("Action Successful");
            dispatch(removeSuccess());
            dispatch(fetchAdminProducts()); // Refresh list after delete/update
        }
    }, [dispatch, error, success]);

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <div className="bg-black min-h-screen text-white flex flex-col">
            <Navbar />
            <PageTitle title="Admin: All Products" />

            <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <Inventory className="text-[#D4AF37]" fontSize="large" />
                        <h1 className="text-2xl font-light uppercase tracking-widest">
                            Product <span className="text-[#D4AF37]">Inventory</span>
                        </h1>
                    </div>
                    <Link 
                        to="/admin/product/create" 
                        className="bg-[#D4AF37] text-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
                    >
                        Create New
                    </Link>
                </div>

                {loading || deleteLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto border border-gray-900 rounded-sm shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0a0a0a] border-b border-gray-800">
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500">S.No</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500">Image</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500">Product Name</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500">Price</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500">Stock</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500">Category</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-900">
                                {products && products.map((item, index) => (
                                    <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4 text-xs text-gray-500">{index + 1}</td>
                                        <td className="p-4">
                                            <img 
                                                /* FIX 3: Changed item.images to item.image */
                                                src={item.image && item.image[0] ? item.image[0].url : 'https://via.placeholder.com/150'} 
                                                alt={item.name} 
                                                className="w-12 h-12 object-cover rounded border border-gray-800" 
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150' }} 
                                            />
                                        </td>
                                        <td className="p-4 text-sm font-medium">{item.name}</td>
                                        <td className="p-4 text-sm text-[#D4AF37]">₹{item.price?.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`text-[10px] px-2 py-1 rounded ${item.stock < 10 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                                {item.stock} in stock
                                            </span>
                                        </td>
                                        <td className="p-4 text-xs uppercase tracking-wider text-gray-400">{item.category}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link 
                                                    to={`/admin/product/${item._id}`} 
                                                    className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                                                >
                                                    <Edit sx={{ fontSize: 18 }} />
                                                </Link>
                                                <button 
                                                    onClick={() => deleteHandler(item._id)}
                                                    disabled={deleteLoading}
                                                    className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                                >
                                                    <Delete sx={{ fontSize: 18 }} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {(!products || products.length === 0) && (
                            <div className="text-center py-20 text-gray-600 uppercase tracking-widest text-xs">
                                No products found in inventory
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ProductsList;