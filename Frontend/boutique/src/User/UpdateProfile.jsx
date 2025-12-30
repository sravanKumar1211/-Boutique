import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeErrors, removeSuccess, updateProfile } from '../features/user/userSlice';
import PageTitle from '../components/PageTitle';

function UpdateProfile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { user, error, success, message, loading } = useSelector(state => state.user)

    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/default_avatar.png");

    const profileImageUpdate = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.onerror = () => {
            toast.error('Error reading file');
        }
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const updateSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('avatar', avatar);
        dispatch(updateProfile(myForm))
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setemail(user.email);
            setAvatarPreview(user.avatar?.url || "/default_avatar.png");
        }
        if (error) {
            toast.error(error.message || error);
            dispatch(removeErrors())
        }
        if (success) {
            toast.success("Profile Updated Successfully");
            dispatch(removeSuccess())
            navigate('/profile')
        }
    }, [dispatch, error, success, user, navigate]);

    return (
        <>
            <PageTitle title="Update Profile" />
            <Navbar />
            
            <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full bg-[#111] p-8 rounded-lg border border-[#6D1A36] shadow-2xl">
                    
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#D4AF37] tracking-widest uppercase">
                            Update Profile
                        </h2>
                        <div className="h-1 w-20 bg-[#6D1A36] mx-auto mt-2"></div>
                    </div>

                    <form 
                        className="space-y-6" 
                        encType='multipart/form-data' 
                        onSubmit={updateSubmit}
                    >
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center gap-4 mb-6">
                            <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] overflow-hidden">
                                <img 
                                    src={avatarPreview} 
                                    alt="Avatar Preview" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <input 
                                type="file" 
                                name='avatar' 
                                accept='image/*' 
                                onChange={profileImageUpdate}
                                className="block w-full text-xs text-gray-400
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-xs file:font-semibold
                                    file:bg-[#6D1A36] file:text-white
                                    hover:file:bg-[#D4AF37] hover:file:text-black
                                    transition-all cursor-pointer"
                            />
                        </div>

                        {/* Name Input */}
                        <div>
                            <label className="block text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] mb-2">Full Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter Name"
                                required
                                value={name} 
                                name='name' 
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded focus:border-[#D4AF37] outline-none transition duration-300"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] mb-2">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                required
                                value={email} 
                                name='email' 
                                onChange={(e) => setemail(e.target.value)}
                                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded focus:border-[#D4AF37] outline-none transition duration-300"
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded hover:bg-[#b8962d] transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default UpdateProfile