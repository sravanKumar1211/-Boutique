import React, { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword, removeErrors, removeSuccess } from '../features/user/userSlice';

function ResetPassword() {
    const { token } = useParams(); // To get the token from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { loading, error, success } = useSelector((state) => state.user);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }

    // Use a plain object instead of FormData for JSON compatibility
    const userData = {
        password,
        confirmPassword
    };

    dispatch(resetPassword({ token, userData }));
};

    useEffect(() => {
        if (error) {
            toast.error(error.message || error);
            dispatch(removeErrors());
        }
        if (success) {
            toast.success("Password Updated Successfully");
            dispatch(removeSuccess());
            navigate("/login");
        }
    }, [dispatch, error, success, navigate]);

    return (
        <>
            <PageTitle title='Reset Password' />
            <Navbar />
            
            <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full bg-[#111] p-8 rounded-lg border border-[#6D1A36] shadow-2xl">
                    
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#D4AF37] tracking-widest uppercase">
                            New Password
                        </h2>
                        <div className="h-1 w-20 bg-[#6D1A36] mx-auto mt-2"></div>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-6">
                            Set your new security credentials
                        </p>
                    </div>

                    <form onSubmit={resetPasswordSubmit} className="space-y-6">
                        {/* New Password */}
                        <div>
                            <label className="block text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] mb-2">
                                New Password
                            </label>
                            <input 
                                type="password" 
                                placeholder='Enter your password' 
                                required
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded focus:border-[#D4AF37] outline-none transition duration-300 placeholder:text-gray-700"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] mb-2">
                                Confirm Password
                            </label>
                            <input 
                                type="password" 
                                placeholder='Confirm Password' 
                                required
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded focus:border-[#D4AF37] outline-none transition duration-300 placeholder:text-gray-700"
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            className="w-full py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded hover:bg-[#b8962d] transition duration-300 shadow-lg shadow-[#D4AF37]/10 active:scale-95"
                        >
                            {loading ? "Resetting..." : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ResetPassword;
