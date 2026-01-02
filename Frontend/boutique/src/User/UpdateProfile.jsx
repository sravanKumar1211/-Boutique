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
        reader.onerror = () => toast.error('Error reading file');
        if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
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

            <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
                <div className="max-w-sm w-full border border-[#76153C]/30 rounded-md p-6">

                    {/* Header */}
                    <h2 className="text-xl font-semibold text-black mb-2">
                        Edit profile
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Update your personal information below.
                    </p>

                    <form
                        className="space-y-4"
                        encType="multipart/form-data"
                        onSubmit={updateSubmit}
                    >

                        {/* Avatar */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-[#76153C]/30">
                                <img
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={profileImageUpdate}
                                className="text-xs text-gray-600
                                           file:mr-3 file:py-1.5 file:px-3
                                           file:rounded file:border-0
                                           file:text-xs file:font-semibold
                                           file:bg-[#67B2D8] file:text-black
                                           hover:file:bg-[#BF124D] hover:file:text-white
                                           cursor-pointer transition"
                            />
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Full name
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded
                                           focus:outline-none focus:ring-1 focus:ring-[#67B2D8]
                                           focus:border-[#67B2D8]"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                name="email"
                                onChange={(e) => setemail(e.target.value)}
                                placeholder="Email address"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded
                                           focus:outline-none focus:ring-1 focus:ring-[#67B2D8]
                                           focus:border-[#67B2D8]"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2.5 text-sm font-semibold rounded transition
                            ${
                                loading
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-[#67B2D8] hover:bg-[#BF124D] hover:text-white text-black"
                            }`}
                        >
                            {loading ? "Updating..." : "Save changes"}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default UpdateProfile
