// import React, { useEffect } from 'react'
// import Navbar from '../components/Navbar'
// import PageTitle from '../components/PageTitle'
// import Footer from '../components/Footer'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { getProductDetails } from '../features/products/productSlice'
// import { updateProduct } from '../features/admin/adminSlice'

// function UpdateProduct() {

//     make all controled fields declare states 

//     const {product}=useSelector(state=>state.product)
//     useDispatch()
//     const{updateId}=useParams()
//     useEffect inside this dispatch(getProductDetails(updateId))
//     display that in form

//     useEffect inside this dispatch(updateProduct)

//     function handleImageChange
//     function updateProductSubmit make FormData

//   return (
//     <>
//     <Navbar></Navbar>
//     <PageTitle title='Update Poduct'></PageTitle>
//     <div>
//         <h1>Update Product</h1>
//         <form encType='multipart/form-data'onSubmit={updateProductSubmit} >
//         <label htmlFor='name'>Product Name</label>
//         <input type="text"  id='name' name='name'/>
        
//         similarly product price, description, product categary, stock,
//         images and preview images
//         below old preview images

//         <button>Update</button>
//         </form>
//     </div>
//     <Footer></Footer>
//     </>
//   )
// }

// export default UpdateProduct




import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Inventory, AttachMoney, Description, Category, Storage, CloudUpload } from '@mui/icons-material';

import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { getProductDetails, removeErrors as clearProductErrors } from '../features/products/productSlice';
import { updateProduct, removeErrors, removeSuccess } from '../features/admin/adminSlice';

function UpdateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { updateId } = useParams(); // URL should be /admin/product/:id

    const { product, error: productError } = useSelector((state) => state.product);
    const { loading, error: updateError, success } = useSelector((state) => state.admin);

    // Form States
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = ["Watches", "Jewelry", "Apparel", "Handbags", "Fragrance"];

    useEffect(() => {
        // 1. Fetch Product Details if not present or ID mismatch
        if (product && product._id !== updateId) {
            dispatch(getProductDetails(updateId));
        } else if (product) {
            // 2. Populate states with existing data
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images || []);
        }

        if (productError) {
            toast.error(productError);
            dispatch(clearProductErrors());
        }

        if (updateError) {
            toast.error(updateError);
            dispatch(removeErrors());
        }

        if (success) {
            toast.success("Product Updated Successfully");
            dispatch(removeSuccess());
            navigate("/admin/products");
        }
    }, [dispatch, updateId, product, productError, updateError, success, navigate]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]); // Clear old images once user selects new ones

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

    const updateProductSubmit = (e) => {
        e.preventDefault();

        const productData = {
            name,
            price,
            description,
            category,
            stock,
            images // Send the new Base64 images
        };

        dispatch(updateProduct({ updateId, productData }));
    };

    return (
        <div className="bg-black min-h-screen text-white flex flex-col">
            <Navbar />
            <PageTitle title="Update Product | Admin" />

            <div className="flex-grow flex justify-center py-12 px-4">
                <div className="max-w-2xl w-full bg-[#0a0a0a] border border-gray-900 p-8 shadow-2xl rounded-sm">
                    
                    <div className="flex items-center gap-3 mb-8">
                        <h1 className="text-2xl font-light uppercase tracking-widest">
                            Update <span className="text-[#D4AF37]">Product</span>
                        </h1>
                    </div>

                    <form className="space-y-6" onSubmit={updateProductSubmit}>
                        {/* Name */}
                        <div className="relative">
                            <Inventory className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                            <input
                                className="w-full bg-black border border-gray-800 p-3 pl-10 focus:border-[#D4AF37] outline-none text-sm"
                                type="text"
                                placeholder="Product Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Price */}
                        <div className="relative">
                            <AttachMoney className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                            <input
                                className="w-full bg-black border border-gray-800 p-3 pl-10 focus:border-[#D4AF37] outline-none text-sm"
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="relative">
                            <Description className="absolute left-3 top-3 text-gray-500 text-sm" />
                            <textarea
                                className="w-full bg-black border border-gray-800 p-3 pl-10 h-24 focus:border-[#D4AF37] outline-none text-sm resize-none"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="relative">
                            <Category className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                            <select
                                className="w-full bg-black border border-gray-800 p-3 pl-10 focus:border-[#D4AF37] outline-none text-sm appearance-none"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Choose Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Stock */}
                        <div className="relative">
                            <Storage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                            <input
                                className="w-full bg-black border border-gray-800 p-3 pl-10 focus:border-[#D4AF37] outline-none text-sm"
                                type="number"
                                placeholder="Stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                            />
                        </div>

                        {/* File Upload */}
                        <div className="border-2 border-dashed border-gray-800 p-4 hover:border-[#D4AF37] relative text-center">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                            />
                            <p className="text-xs text-gray-500 tracking-widest">SELECT NEW IMAGES TO REPLACE OLD ONES</p>
                        </div>

                        {/* Old Images Preview */}
                        {oldImages.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-900">
                                {oldImages.map((img, index) => (
                                    <img key={index} src={img.url} alt="Old" className="w-16 h-16 object-cover border border-gray-800 grayscale" />
                                ))}
                            </div>
                        )}

                        {/* New Images Preview */}
                        <div className="flex gap-2 overflow-x-auto">
                            {imagesPreview.map((img, index) => (
                                <img key={index} src={img} alt="New" className="w-16 h-16 object-cover border border-[#D4AF37]" />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-[#D4AF37] text-black font-bold py-4 uppercase tracking-[0.2em] text-xs transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}`}
                        >
                            {loading ? "Updating..." : "Update Product"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UpdateProduct;