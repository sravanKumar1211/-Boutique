import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserRole, removeErrors, removeSuccess, getSingleUser } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';
import { PersonOutline, MailOutline, AdminPanelSettings } from '@mui/icons-material';

function UpdateRole() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, success, loading, error } = useSelector(state => state.admin);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        // Fetch user if not loaded or if the loaded user doesn't match the URL ID
        if (!user || (user && user._id !== userId)) {
            dispatch(getSingleUser(userId));
        } else {
            // Populate form once user data is available in state
            setName(user.name || "");
            setEmail(user.email || "");
            setRole(user.role || "");
        }

        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }

        if (success) {
            toast.success("User Role Updated Successfully");
            dispatch(removeSuccess());
            navigate('/admin/users');
        }
    }, [dispatch, userId, user, error, success, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        // Matching your slice: UpdateUserRole( {userId, role} )
        dispatch(UpdateUserRole({ userId, role: { role } }));
    };

    return (
        <div className="bg-black min-h-screen text-white flex flex-col">
            <Navbar />
            <PageTitle title="Admin: Update User Role" />

            <div className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full bg-[#0a0a0a] border border-gray-900 p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <AdminPanelSettings className="text-[#D4AF37] mb-2" sx={{ fontSize: 40 }} />
                        <h1 className="text-xl font-light uppercase tracking-[0.2em]">
                            Update User <span className="text-[#D4AF37]">Role</span>
                        </h1>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        {/* Name Field (Disabled as we usually only update the Role) */}
                        <div className="relative opacity-60">
                            <PersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" sx={{ fontSize: 20 }} />
                            <input
                                type="text"
                                placeholder="Name"
                                disabled
                                value={name}
                                className="w-full bg-black border border-gray-800 py-3 pl-10 pr-4 text-sm outline-none cursor-not-allowed"
                            />
                        </div>

                        {/* Email Field (Disabled) */}
                        <div className="relative opacity-60">
                            <MailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" sx={{ fontSize: 20 }} />
                            <input
                                type="email"
                                placeholder="Email"
                                disabled
                                value={email}
                                className="w-full bg-black border border-gray-800 py-3 pl-10 pr-4 text-sm outline-none cursor-not-allowed"
                            />
                        </div>

                        {/* Role Dropdown */}
                        <div className="relative">
                            <AdminPanelSettings className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" sx={{ fontSize: 20 }} />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                className="w-full bg-black border border-gray-800 py-3 pl-10 pr-4 text-sm focus:border-[#D4AF37] outline-none transition-colors appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !role}
                            className="w-full bg-[#D4AF37] text-black font-bold py-3 uppercase tracking-widest text-xs hover:bg-white transition-all disabled:bg-gray-700 disabled:cursor-not-allowed"
                        >
                            {loading ? "Updating..." : "Update Role"}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default UpdateRole;