import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserRole, removeErrors, removeSuccess, getSingleUser } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';
import { 
    PersonOutline, 
    MailOutline, 
    AdminPanelSettings, 
    ArrowBackIosNew, 
    VerifiedUserOutlined 
} from '@mui/icons-material';

function UpdateRole() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, success, loading, error } = useSelector(state => state.admin);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (!user || (user && user._id !== userId)) {
            dispatch(getSingleUser(userId));
        } else {
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
        dispatch(UpdateUserRole({ userId, role: { role } }));
    };

    return (
        <div className="bg-[#f0f2f2] min-h-screen text-gray-800 flex flex-col font-sans">
            <Navbar />
            <PageTitle title="Update User Role | Vendor Central" />

            <div className="flex-grow flex flex-col items-center px-4 py-12">
                {/* Back Link */}
                <div className="max-w-xl w-full mb-4">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-1 text-xs font-bold text-[#67B2D8] hover:underline uppercase tracking-tighter"
                    >
                        <ArrowBackIosNew sx={{ fontSize: 10 }} /> Back to User Management
                    </button>
                </div>

                <div className="max-w-xl w-full bg-white border border-gray-300 rounded-sm shadow-sm overflow-hidden">
                    {/* Amazon Vendor Header Section */}
                    <div className="bg-[#f7f7f7] border-b border-gray-300 px-8 py-5">
                        <div className="flex items-center gap-3">
                            <VerifiedUserOutlined className="text-[#5A0E24]" />
                            <div>
                                <h1 className="text-xl font-bold text-[#5A0E24]">User Permissions</h1>
                                <p className="text-[11px] text-gray-500 uppercase font-mono tracking-tighter">Reference ID: {userId}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <form onSubmit={submitHandler} className="space-y-8">
                            
                            {/* Section: Identity (Read Only) */}
                            <div className="space-y-5">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Account Profile</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                                    <label className="text-sm font-bold text-gray-600">Full Name</label>
                                    <div className="md:col-span-2 relative">
                                        <PersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 18 }} />
                                        <input
                                            type="text"
                                            disabled
                                            value={name}
                                            className="w-full bg-[#f9f9f9] border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-500 outline-none cursor-not-allowed rounded-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                                    <label className="text-sm font-bold text-gray-600">Email Address</label>
                                    <div className="md:col-span-2 relative">
                                        <MailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 18 }} />
                                        <input
                                            type="email"
                                            disabled
                                            value={email}
                                            className="w-full bg-[#f9f9f9] border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-500 outline-none cursor-not-allowed rounded-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Role Selection */}
                            <div className="space-y-5 pt-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Access Control</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                                    <label className="text-sm font-bold text-gray-700">Assign Role</label>
                                    <div className="md:col-span-2 relative">
                                        <AdminPanelSettings className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A0E24]" sx={{ fontSize: 18 }} />
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                            className="w-full bg-white border border-gray-400 py-2.5 pl-10 pr-4 text-sm text-gray-800 focus:border-[#67B2D8] focus:ring-1 focus:ring-[#67B2D8] outline-none transition-all appearance-none cursor-pointer rounded-sm shadow-inner"
                                        >
                                            <option value="" disabled>Select access level...</option>
                                            <option value="user">User (Standard Access)</option>
                                            <option value="admin">Admin (Full Control)</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button Section */}
                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading || !role}
                                    className={`w-full md:w-auto px-12 py-2.5 bg-[#BF124D] text-white font-bold rounded shadow-sm hover:bg-[#76153C] transition-all text-xs uppercase tracking-widest ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? "Processing..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="mt-6 text-[10px] text-gray-400 max-w-xl text-center">
                    Updating a user's role will immediately change their access to the luxury collection administrative suite. 
                    Ensure you have verified the identity of the account holder before granting administrative privileges.
                </p>
            </div>

            <Footer />
        </div>
    );
}

export default UpdateRole;