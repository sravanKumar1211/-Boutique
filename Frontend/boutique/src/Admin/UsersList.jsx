import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Edit, Delete, PeopleAlt, Person, InfoOutlined, ChevronRight } from '@mui/icons-material';

import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { fetchUsers, removeErrors, deleteUser, clearMessage } from '../features/admin/adminSlice';

function UsersList() {
    const dispatch = useDispatch();
    const { users, loading, error, message } = useSelector(state => state.admin);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(removeErrors());
        }

        if (message) {
            toast.success(message);
            dispatch(clearMessage());
        }

        dispatch(fetchUsers());
    }, [dispatch, error, message]);

    const deleteHandler = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(userId)); 
        }
    };

    return (
        <div className="bg-[#eaeded] min-h-screen text-[#111] flex flex-col font-sans">
            <Navbar />
            <PageTitle title="Admin: All Users | Amazon Vendor" />

            {/* Sub-Header Breadcrumb */}
            <div className="bg-white border-b border-gray-300 py-3 px-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center gap-2 text-[12px] font-medium text-gray-600 uppercase tracking-tighter">
                    <Link to="/admin/dashboard" className="hover:text-[#67B2D8] hover:underline">Admin Central</Link>
                    <ChevronRight sx={{ fontSize: 14 }} />
                    <span className="text-[#5A0E24] font-bold">User Management</span>
                </div>
            </div>

            <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
                {/* Heading Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#111]">Manage Accounts</h1>
                        <p className="text-sm text-gray-600">View and update permissions for all registered customers and administrators.</p>
                    </div>
                    <div className="flex items-center gap-2 text-[#67B2D8] text-sm font-bold bg-white px-4 py-2 border border-gray-300 rounded shadow-sm">
                        <InfoOutlined fontSize="small" />
                        <span>System Status: Optimal</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-40 bg-white border border-gray-300 rounded shadow-sm">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#BF124D]"></div>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
                        {/* Summary Bar */}
                        <div className="bg-[#f6f6f6] border-b border-gray-300 px-6 py-3">
                            <span className="text-sm font-bold text-[#5A0E24]">
                                {users ? users.length : 0} Users Identified
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-300">
                                        <th className="p-4 text-[11px] font-bold uppercase text-gray-700">Ref</th>
                                        <th className="p-4 text-[11px] font-bold uppercase text-gray-700">Account Details</th>
                                        <th className="p-4 text-[11px] font-bold uppercase text-gray-700">Contact</th>
                                        <th className="p-4 text-[11px] font-bold uppercase text-gray-700">Security Group</th>
                                        <th className="p-4 text-[11px] font-bold uppercase text-gray-700">Registration Date</th>
                                        <th className="p-4 text-[11px] font-bold uppercase text-gray-700 text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users && users.map((item, index) => (
                                        <tr key={item._id} className="hover:bg-[#f7fafa] transition-colors group">
                                            <td className="p-4 text-[11px] font-mono text-gray-400">
                                                {item._id.substring(0, 8)}...
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-[#f0f2f2] flex items-center justify-center border border-gray-300 group-hover:border-[#67B2D8]">
                                                        <Person className="text-gray-500" sx={{ fontSize: 20 }} />
                                                    </div>
                                                    <span className="text-sm font-bold text-[#111]">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-[#007185] hover:text-[#BF124D] hover:underline cursor-pointer">
                                                {item.email}
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                                                    item.role === 'admin' 
                                                    ? 'bg-[#76153C]/10 text-[#76153C] border-[#76153C]/20' 
                                                    : 'bg-[#67B2D8]/10 text-[#67B2D8] border-[#67B2D8]/20'
                                                }`}>
                                                    {item.role}
                                                </span>
                                            </td>
                                            <td className="p-4 text-xs text-gray-600 font-medium">
                                                {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link 
                                                        to={`/admin/user/${item._id}`} 
                                                        className="px-3 py-1 text-xs font-medium border border-gray-300 rounded shadow-sm bg-white hover:bg-gray-50 text-[#111] transition-all flex items-center gap-1"
                                                    >
                                                        <Edit sx={{ fontSize: 14 }} /> Edit
                                                    </Link>
                                                    <button 
                                                        onClick={() => deleteHandler(item._id)}
                                                        className="px-3 py-1 text-xs font-medium border border-[#BF124D]/30 rounded shadow-sm bg-[#BF124D]/5 hover:bg-[#BF124D] hover:text-white text-[#BF124D] transition-all flex items-center gap-1"
                                                    >
                                                        <Delete sx={{ fontSize: 14 }} /> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {(!users || users.length === 0) && (
                                <div className="text-center py-24">
                                    <PeopleAlt className="text-gray-200 mx-auto mb-4" sx={{ fontSize: 60 }} />
                                    <p className="text-gray-500 text-sm font-medium italic">No accounts currently active in the directory.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default UsersList;