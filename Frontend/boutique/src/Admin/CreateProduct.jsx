import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Inventory, Description, AttachMoney, Category, Storage, CloudUpload } from '@mui/icons-material';

function CreateProduct() {
  const dispatch = useDispatch();
  
  // Controlled States
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Watches",
    "Jewelry",
    "Apparel",
    "Handbags",
    "Fragrance"
  ];

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    // Using FormData to handle multipart/form-data
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    // Append each image to the form
    images.forEach((image) => {
      myForm.append("images", image);
    });

    // dispatch(createNewProduct(myForm)); // Your action call here
    console.log("Form Submitted Successfully");
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

          <form 
            className="space-y-6" 
            encType="multipart/form-data" 
            onSubmit={createProductSubmitHandler}
          >
            {/* Name Input */}
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

            {/* Price Input */}
            <div className="relative">
              <AttachMoney className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                className="w-full bg-black border border-gray-800 p-3 pl-10 focus:border-[#D4AF37] outline-none transition-all text-sm"
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Description Input */}
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

            {/* Category Dropdown */}
            <div className="relative">
              <Category className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <select
                className="w-full bg-black border border-gray-800 p-3 pl-10 focus:border-[#D4AF37] outline-none transition-all text-sm appearance-none"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>{cate}</option>
                ))}
              </select>
            </div>

            {/* Stock Input */}
            <div className="relative">
              <Storage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                className="w-full bg-black border border-gray-800 p-3 pl-10 focus:border-[#D4AF37] outline-none transition-all text-sm"
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-800 p-4 hover:border-[#D4AF37] transition-all cursor-pointer relative">
               <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                  className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                />
                <div className="text-center">
                   <p className="text-xs text-gray-500 uppercase tracking-widest">Click to upload images</p>
                </div>
            </div>

            {/* Image Preview Container */}
            <div className="flex flex-wrap gap-4 overflow-x-auto py-2">
              {imagesPreview.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt="Preview" 
                  className="w-20 h-20 object-cover border border-[#D4AF37]" 
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-black font-bold py-4 uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-lg"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CreateProduct;