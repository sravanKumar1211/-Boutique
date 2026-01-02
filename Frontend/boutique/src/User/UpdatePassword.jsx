import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updatePassword, removeErrors, removeSuccess } from '../features/user/userSlice';

function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, success, loading } = useSelector((state) => state.user);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const myForm = {
            oldPassword,
            newPassword,
            confirmPassword,
        };

        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error.message || error);
            dispatch(removeErrors());
        }

        if (success) {
            toast.success("Password Updated Successfully");
            dispatch(removeSuccess());
            navigate('/profile');
        }
    }, [dispatch, error, success, navigate]);

    return (
        <>
            <PageTitle title="Update Password" />
            <Navbar />

            <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
                <div className="max-w-sm w-full border border-[#76153C]/30 rounded-md p-6">

                    {/* Header */}
                    <h2 className="text-xl font-semibold text-black mb-2">
                        Change your password
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Enter your current password and choose a new one.
                    </p>

                    <form className="space-y-4" onSubmit={updatePasswordSubmit}>

                        {/* Old Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Current password
                            </label>
                            <input
                                type="password"
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Current password"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded
                                           focus:outline-none focus:ring-1 focus:ring-[#67B2D8]
                                           focus:border-[#67B2D8]"
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                New password
                            </label>
                            <input
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded
                                           focus:outline-none focus:ring-1 focus:ring-[#67B2D8]
                                           focus:border-[#67B2D8]"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Re-enter new password
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
                            disabled={loading}
                            className={`w-full py-2.5 text-sm font-semibold rounded transition
                            ${loading
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
    );
}

export default UpdatePassword;
