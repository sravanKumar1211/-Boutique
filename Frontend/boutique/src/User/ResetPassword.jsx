import React, { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword, removeErrors, removeSuccess } from '../features/user/userSlice';

function ResetPassword() {
    const { token } = useParams();
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

        const userData = { password, confirmPassword };
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
            
            <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
                <div className="max-w-sm w-full border border-[#76153C]/30 rounded-md p-6">
                    
                    {/* Header */}
                    <h2 className="text-xl font-semibold text-black mb-2">
                        Create new password
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Enter a new password for your account.
                    </p>

                    <form onSubmit={resetPasswordSubmit} className="space-y-4">
                        
                        {/* New Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                New password
                            </label>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded
                                           focus:outline-none focus:ring-1 focus:ring-[#67B2D8]
                                           focus:border-[#67B2D8]"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Re-enter password
                            </label>
                            <input 
                                type="password" 
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded
                                           focus:outline-none focus:ring-1 focus:ring-[#67B2D8]
                                           focus:border-[#67B2D8]"
                            />
                        </div>

                        {/* Submit */}
                        <button 
                            type="submit"
                            className="w-full py-2.5 bg-[#67B2D8] text-black text-sm font-semibold rounded
                                       hover:bg-[#BF124D] hover:text-white transition"
                        >
                            {loading ? "Updating..." : "Save changes"}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ResetPassword;
