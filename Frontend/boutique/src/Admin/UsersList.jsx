import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Edit, Delete, PeopleAlt, Person } from '@mui/icons-material';

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
        <div className="bg-black min-h-screen text-white flex flex-col">
            <Navbar />
            <PageTitle title="Admin: All Users" />

            <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <PeopleAlt className="text-[#D4AF37]" fontSize="large" />
                        <h1 className="text-2xl font-light uppercase tracking-widest">
                            User <span className="text-[#D4AF37]">Management</span>
                        </h1>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto border border-gray-900 rounded-sm shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0a0a0a] border-b border-gray-800">
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500">S.No</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500">Name</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500">Email</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500">Role</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500">Joined</th>
                                    <th className="p-4 text-[10px] uppercase tracking-widest text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-900">
                                {users && users.map((item, index) => (
                                    <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4 text-xs text-gray-500">{index + 1}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800">
                                                    <Person className="text-gray-500" sx={{ fontSize: 16 }} />
                                                </div>
                                                <span className="text-sm font-medium">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-300">{item.email}</td>
                                        <td className="p-4">
                                            <span className={`text-[10px] px-2 py-1 rounded uppercase tracking-wider ${
                                                item.role === 'admin' 
                                                ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20' 
                                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                            }`}>
                                                {item.role}
                                            </span>
                                        </td>
                                        <td className="p-4 text-xs text-gray-500">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link 
                                                    to={`/admin/user/${item._id}`} 
                                                    className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                                                    title="Update User"
                                                >
                                                    <Edit sx={{ fontSize: 18 }} />
                                                </Link>
                                                <button 
                                                    onClick={() => deleteHandler(item._id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                    title="Delete User"
                                                >
                                                    <Delete sx={{ fontSize: 18 }} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {(!users || users.length === 0) && (
                            <div className="text-center py-20 text-gray-600 uppercase tracking-widest text-[10px]">
                                No users found in database
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default UsersList;