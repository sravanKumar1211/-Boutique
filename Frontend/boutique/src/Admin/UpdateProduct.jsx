import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
    Inventory, 
    AttachMoney, 
    Description, 
    Category, 
    Storage, 
    CloudUpload, 
    InfoOutlined, 
    ArrowBackIosNew 
} from '@mui/icons-material';

import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { getProductDetails, removeErrors as clearProductErrors } from '../features/products/productSlice';
import { updateProduct, removeErrors, removeSuccess } from '../features/admin/adminSlice';

function UpdateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { updateId } = useParams();

    const { product, error: productError } = useSelector((state) => state.product);
    const { loading, error: updateError, success } = useSelector((state) => state.admin);

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
        if (product && product._id !== updateId) {
            dispatch(getProductDetails(updateId));
        } else if (product) {
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
        setOldImages([]);

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
        const productData = { name, price, description, category, stock, images };
        dispatch(updateProduct({ updateId, productData }));
    };

    return (
        <div className="bg-[#f0f2f2] min-h-screen text-gray-800 flex flex-col font-sans">
            <Navbar />
            <PageTitle title="Update Product | Vendor Central" />

            <div className="flex-grow max-w-4xl mx-auto w-full px-4 py-8">
                {/* Back Link */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-1 text-xs font-bold text-[#67B2D8] hover:underline mb-6 uppercase"
                >
                    <ArrowBackIosNew sx={{ fontSize: 10 }} /> Back to Inventory
                </button>

                <div className="bg-white border border-gray-300 rounded-sm shadow-sm overflow-hidden">
                    {/* Amazon Style Header Tab */}
                    <div className="bg-[#f7f7f7] border-b border-gray-300 px-6 py-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-[#5A0E24]">Edit Listing</h1>
                            <p className="text-[11px] text-gray-500 uppercase tracking-tighter">Product ID: {updateId}</p>
                        </div>
                        <div className="flex items-center gap-2 text-[#67B2D8]">
                            <InfoOutlined fontSize="small" />
                            <span className="text-xs font-medium underline cursor-pointer">Help</span>
                        </div>
                    </div>

                    <form className="p-8 space-y-8" onSubmit={updateProductSubmit}>
                        
                        {/* Section: Product Identity */}
                        <section className="space-y-6">
                            <h3 className="text-sm font-bold text-gray-700 border-b border-gray-100 pb-2">Vital Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                <label className="text-sm font-bold text-gray-600 md:text-right">Product Name:</label>
                                <div className="md:col-span-3">
                                    <input
                                        className="w-full border border-gray-400 p-2 rounded-sm focus:border-[#67B2D8] focus:ring-1 focus:ring-[#67B2D8] outline-none text-sm shadow-inner"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                <label className="text-sm font-bold text-gray-600 md:text-right">Category:</label>
                                <div className="md:col-span-3">
                                    <select
                                        className="w-full border border-gray-400 p-2 rounded-sm bg-[#f7f7f7] focus:border-[#67B2D8] outline-none text-sm cursor-pointer"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Section: Offer Details */}
                        <section className="space-y-6 pt-4 border-t border-gray-100">
                            <h3 className="text-sm font-bold text-gray-700 border-b border-gray-100 pb-2">Offer Details</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                <label className="text-sm font-bold text-gray-600 md:text-right">Your Price (INR):</label>
                                <div className="md:col-span-1">
                                    <div className="relative">
                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">₹</span>
                                        <input
                                            className="w-full border border-gray-400 p-2 pl-6 rounded-sm focus:border-[#67B2D8] outline-none text-sm"
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <label className="text-sm font-bold text-gray-600 md:text-right">Quantity:</label>
                                <div className="md:col-span-1">
                                    <input
                                        className="w-full border border-gray-400 p-2 rounded-sm focus:border-[#67B2D8] outline-none text-sm"
                                        type="number"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <label className="text-sm font-bold text-gray-600 md:text-right pt-2">Description:</label>
                                <div className="md:col-span-3">
                                    <textarea
                                        className="w-full border border-gray-400 p-3 rounded-sm h-32 focus:border-[#67B2D8] outline-none text-sm resize-none shadow-inner"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                    <p className="text-[10px] text-gray-400 mt-1 italic">Amazon recommends using bullet points for key features.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section: Images */}
                        <section className="space-y-6 pt-4 border-t border-gray-100">
                            <h3 className="text-sm font-bold text-gray-700 border-b border-gray-100 pb-2">Product Images</h3>
                            
                            <div className="bg-[#fcf8f8] border border-[#76153C]/20 p-6 rounded-sm">
                                <div className="flex flex-col items-center justify-center gap-2 mb-4">
                                    <CloudUpload sx={{ fontSize: 40, color: '#BF124D' }} />
                                    <p className="text-xs font-bold text-[#5A0E24]">Click or drag files to replace product media</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="opacity-0 absolute w-32 h-32 cursor-pointer"
                                    />
                                </div>

                                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                                    {/* Existing Images */}
                                    {oldImages.map((img, index) => (
                                        <div key={index} className="relative aspect-square border border-gray-300 bg-white p-1">
                                            <img src={img.url} alt="Old" className="w-full h-full object-contain grayscale opacity-60" />
                                            <span className="absolute bottom-0 left-0 right-0 bg-gray-500 text-[8px] text-white text-center font-bold">OLD</span>
                                        </div>
                                    ))}
                                    {/* New Images */}
                                    {imagesPreview.map((img, index) => (
                                        <div key={index} className="relative aspect-square border border-[#BF124D] bg-white p-1">
                                            <img src={img} alt="New" className="w-full h-full object-contain" />
                                            <span className="absolute bottom-0 left-0 right-0 bg-[#BF124D] text-[8px] text-white text-center font-bold">NEW</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Amazon Style Action Footer */}
                        <div className="pt-8 flex justify-end gap-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/products")}
                                className="px-6 py-2 border border-gray-400 rounded bg-white text-sm font-medium hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-10 py-2 bg-[#BF124D] text-white font-bold rounded shadow-sm hover:bg-[#76153C] transition-all text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? "Saving Changes..." : "Save and Finish"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UpdateProduct;