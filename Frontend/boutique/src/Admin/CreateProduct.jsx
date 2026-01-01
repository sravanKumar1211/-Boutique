import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Inventory, Description, AttachMoney, Category, Storage, CloudUpload } from '@mui/icons-material';

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

    const categories = ["Watches", "Jewelry", "Apparel", "Handbags", "Fragrance"];

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }

        if (success) {
            toast.success("Product Created Successfully");
            navigate("/admin/products"); // Redirect to list
            dispatch(removeSuccess());
        }
    }, [dispatch, error, success, navigate]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        // Since we are sending Base64 strings, 
        // a simple object is often cleaner for Express.json limit handling
        const productData = {
            name,
            price,
            description,
            category,
            stock,
            images // This is the array of Base64 strings
        };

        dispatch(createProduct(productData));
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        // Clear previous selection if you want a fresh start per click
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
        <div className="bg-black min-h-screen text-white flex flex-col">
            <Navbar />
            <PageTitle title="Create Product | Admin" />

            <div className="flex-grow flex justify-center py-12 px-4">
                <div className="max-w-2xl w-full bg-[#0a0a0a] border border-gray-900 p-8 shadow-2xl rounded-sm">
                    
                    <div className="flex items-center gap-3 mb-8">
                        <CloudUpload className="text-[#D4AF37]" fontSize="large" />
                        <h1 className="text-2xl font-light uppercase tracking-widest">
                            Add New <span className="text-[#D4AF37]">Product</span>
                        </h1>
                    </div>

                    <form className="space-y-6" onSubmit={createProductSubmitHandler}>
                        <div className="relative">
                            <Inventory className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                            <input
                                className="w-full bg-black border border-gray-800 p-3 pl-10 focus:border-[#D4AF37] outline-none transition-all text-sm"
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <AttachMoney className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                            <input
                                className="w-full bg-black border border-gray-800 p-3 pl-10 focus:border-[#D4AF37] outline-none transition-all text-sm"
                                type="number"
                                placeholder="Price"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <Description className="absolute left-3 top-3 text-gray-500 text-sm" />
                            <textarea
                                className="w-full bg-black border border-gray-800 p-3 pl-10 h-24 focus:border-[#D4AF37] outline-none transition-all text-sm resize-none"
                                placeholder="Product Description"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="relative">
                            <Category className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                            <select
                                className="w-full bg-black border border-gray-800 p-3 pl-10 focus:border-[#D4AF37] outline-none transition-all text-sm appearance-none"
                                value={category}
                                required
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>{cate}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <Storage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                            <input
                                className="w-full bg-black border border-gray-800 p-3 pl-10 focus:border-[#D4AF37] outline-none transition-all text-sm"
                                type="number"
                                placeholder="Stock"
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div className="border-2 border-dashed border-gray-800 p-4 hover:border-[#D4AF37] transition-all cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                                className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                            />
                            <div className="text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-widest">Click to upload images</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 overflow-x-auto py-2">
                            {imagesPreview.map((img, index) => (
                                <img key={index} src={img} alt="Preview" className="w-20 h-20 object-cover border border-[#D4AF37]" />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={loading ? true : false}
                            className={`w-full bg-[#D4AF37] text-black font-bold py-4 uppercase tracking-[0.2em] text-xs transition-all shadow-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-white"}`}
                        >
                            {loading ? "Creating..." : "Create Product"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateProduct;