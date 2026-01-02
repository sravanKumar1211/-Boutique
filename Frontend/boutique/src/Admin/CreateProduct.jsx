
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
    Inventory, 
    Description, 
    AttachMoney, 
    Category, 
    Storage, 
    CloudUpload,
    InfoOutlined
} from '@mui/icons-material';

import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { createProduct, removeErrors, removeSuccess } from '../features/admin/adminSlice';

function CreateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success, loading, error } = useSelector(state => state.admin);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = ["sarees","bridal","accessories","casual","embroidery","shirts","kurtis","kids"];

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }

        if (success) {
            toast.success("Product Created Successfully");
            navigate("/admin/products");
            dispatch(removeSuccess());
        }
    }, [dispatch, error, success, navigate]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const productData = { name, price, description, category, stock, images };
        dispatch(createProduct(productData));
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="bg-[#f0f2f2] min-h-screen text-gray-800 flex flex-col font-sans">
            <Navbar />
            <PageTitle title="Create Product | Admin Central" />

            <div className="flex-grow max-w-5xl w-full mx-auto py-8 px-4">
                {/* Header Section */}
                <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-300 pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-[#5A0E24]">Add a Product: Vital Info</h1>
                        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                            <InfoOutlined sx={{ fontSize: 16 }} /> Complete all required fields to list your luxury item.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => navigate("/admin/products")}
                            className="px-4 py-1.5 border border-gray-300 rounded-md bg-white text-sm hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            form="create-product-form"
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-1.5 bg-[#BF124D] text-white rounded-md text-sm font-medium shadow-sm transition ${loading ? 'opacity-50' : 'hover:bg-[#76153C]'}`}
                        >
                            {loading ? "Saving..." : "Save and Finish"}
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-gray-300 rounded-sm shadow-sm overflow-hidden">
                    {/* Tabs Placeholder (Amazon Style) */}
                    <div className="bg-[#f7f7f7] border-b border-gray-300 px-6 py-3 flex gap-8">
                        <span className="text-sm font-bold border-b-2 border-[#BF124D] text-[#BF124D] pb-3 -mb-3.5 cursor-pointer">Vital Info</span>
                        <span className="text-sm text-gray-500 cursor-not-allowed">Offer</span>
                        <span className="text-sm text-gray-500 cursor-not-allowed">Images</span>
                    </div>

                    <form id="create-product-form" className="p-8 space-y-8" onSubmit={createProductSubmitHandler}>
                        
                        {/* Vital Information Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <div className="md:col-span-1">
                                <h3 className="text-sm font-bold">Product Identity</h3>
                                <p className="text-xs text-gray-500 mt-1">Basic identification for the listing.</p>
                            </div>
                            
                            <div className="md:col-span-2 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold flex items-center gap-2">Product Name <span className="text-red-600">*</span></label>
                                    <input
                                        className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:border-[#67B2D8] focus:ring-1 focus:ring-[#67B2D8] transition-all text-sm"
                                        type="text"
                                        placeholder="e.g. Classic Gold Chronograph Watch"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold">Category <span className="text-red-600">*</span></label>
                                        <select
                                            className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:border-[#67B2D8] transition-all text-sm bg-white"
                                            value={category}
                                            required
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cate) => (
                                                <option key={cate} value={cate}>{cate}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold">Stock Quantity <span className="text-red-600">*</span></label>
                                        <input
                                            className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:border-[#67B2D8] transition-all text-sm"
                                            type="number"
                                            placeholder="0"
                                            required
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        {/* Pricing and Description Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <div className="md:col-span-1">
                                <h3 className="text-sm font-bold">Offer & Content</h3>
                                <p className="text-xs text-gray-500 mt-1">Set your price and tell customers about the product.</p>
                            </div>
                            
                            <div className="md:col-span-2 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold">Standard Price <span className="text-red-600">*</span></label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                        <input
                                            className="w-full border border-gray-400 p-2 pl-7 rounded focus:outline-none focus:border-[#67B2D8] transition-all text-sm"
                                            type="number"
                                            placeholder="0.00"
                                            required
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-bold">Product Description <span className="text-red-600">*</span></label>
                                    <textarea
                                        className="w-full border border-gray-400 p-2 h-32 rounded focus:outline-none focus:border-[#67B2D8] transition-all text-sm resize-none"
                                        placeholder="Enter detailed specifications and features..."
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        {/* Media Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <div className="md:col-span-1">
                                <h3 className="text-sm font-bold">Images</h3>
                                <p className="text-xs text-gray-500 mt-1">Upload high-quality images. Recommended size: 1000x1000px.</p>
                            </div>
                            
                            <div className="md:col-span-2">
                                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 hover:bg-gray-50 transition-all text-center relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={createProductImagesChange}
                                        multiple
                                        className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                                    />
                                    <CloudUpload sx={{ color: '#67B2D8', fontSize: 40, mb: 1 }} />
                                    <p className="text-sm font-medium text-gray-700">Drag and drop images here</p>
                                    <p className="text-xs text-gray-400 mt-1">or click to browse from your device</p>
                                </div>

                                {imagesPreview.length > 0 && (
                                    <div className="flex flex-wrap gap-4 mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
                                        {imagesPreview.map((img, index) => (
                                            <div key={index} className="relative group">
                                                <img src={img} alt="Preview" className="w-20 h-20 object-cover border border-gray-300 rounded" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                                                    <span className="text-[10px] text-white font-bold">Main</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                    
                    {/* Footer Action */}
                    <div className="bg-[#f7f7f7] border-t border-gray-300 px-8 py-4 flex justify-end">
                        <p className="text-[11px] text-gray-500 italic mr-6 self-center">By clicking 'Save and Finish', you agree to the Vendor Terms of Service.</p>
                        <button
                            form="create-product-form"
                            type="submit"
                            disabled={loading}
                            className={`px-10 py-2 bg-[#BF124D] text-white font-bold rounded shadow hover:bg-[#76153C] transition-all text-sm ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Creating listing..." : "Save and Finish"}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateProduct;