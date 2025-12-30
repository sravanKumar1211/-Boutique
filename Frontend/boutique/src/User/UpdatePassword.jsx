// import React, { useState } from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import PageTitle from '../components/PageTitle'
// function UpdatePassword() {
//     const [oldPassword,setOldPassword]=useState("")
//     const [newPassword,setNewPassword]=useState("")
//     const [confirmPassword,setConfirmPassword]=useState("")
//   const updatePasswordSubmit=(e)=>{
//     e.preventDefault();
//     const myForm=new FormData();
//     myForm.set("oldPassword",oldPassword)
//     myForm.set("newPassword",newPassword)
//     myForm.set("confirmPassword",confirmPassword)
//   }

//   return (
//     <>
//     <Navbar></Navbar>
//     <PageTitle title='Password Update'></PageTitle>
//     <div>
//         <div>
//             <form onSubmit={updatePasswordSubmit}>
//                 <h2>Update Password</h2>
//                 <div>
//                     <input type="password" name='oldPssword' placeholder='oldPassword' 
//                     value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
//                 </div>
//                 <div>
//                     <input type="password" name='newPssword' placeholder='newPassword'
//                     value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
//                 </div>
//                 <div>
//                     <input type="password" name='ConfirmPssword' placeholder='Confirm Password'
//                     value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
//                 </div>
//                 <button>Update Password</button>
//             </form>
//         </div>
//     </div>
//     <Footer></Footer>
//     </>
//   )
// }

// export default UpdatePassword



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
        
        // Validation
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // We send a regular object since it's just JSON data
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
            
            <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full bg-[#111] p-8 rounded-lg border border-[#6D1A36] shadow-2xl">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#D4AF37] tracking-widest uppercase">
                            Update Password
                        </h2>
                        <div className="h-1 w-20 bg-[#6D1A36] mx-auto mt-2"></div>
                    </div>

                    <form className="space-y-6" onSubmit={updatePasswordSubmit}>
                        
                        {/* Old Password */}
                        <div>
                            <label className="block text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] mb-2">
                                Old Password
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Old Password"
                                required
                                value={oldPassword} 
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded focus:border-[#D4AF37] outline-none transition duration-300"
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] mb-2">
                                New Password
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter New Password"
                                required
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded focus:border-[#D4AF37] outline-none transition duration-300"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] mb-2">
                                Confirm New Password
                            </label>
                            <input 
                                type="password" 
                                placeholder="Confirm New Password"
                                required
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded focus:border-[#D4AF37] outline-none transition duration-300"
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded hover:bg-[#b8962d] transition duration-300 shadow-lg shadow-[#D4AF37]/10 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Processing..." : "Change Password"}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default UpdatePassword;