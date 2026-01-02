// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
// import PageTitle from '../components/PageTitle'
// import Navbar from '../components/Navbar';
// import Loader from '../components/Loader'
// function Profile() {
//     const { loading, isAuthenticated, user } = useSelector(state => state.user)
//     const navigate=useNavigate()
//     console.log(user)
//     useEffect(()=>{
//         if(isAuthenticated==false)
//             navigate('/login')
//     },[isAuthenticated])
//     return (
//         <>
//         <Navbar />
//         <div className="min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-center px-6 py-12 gap-10 md:gap-20">
//             {/* Left Section - Avatar and Edit */}
//             <PageTitle title={`${user?.name} Profile`}></PageTitle>
//             <div className="flex flex-col items-center space-y-6">
//                 <h1 className="text-[#D4AF37] text-3xl font-bold tracking-[0.3em] uppercase md:hidden">My Profile</h1>
                
//                 <div className="w-64 h-64 rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.3)]">
//                     <img 
//                         src={user?.avatar?.url} 
//                         alt="User Profile" 
//                         className="w-full h-full object-cover"
//                     />
//                 </div>
                
//                 <Link 
//                     to='/profile/update' 
//                     className="bg-[#6D1A36] text-white px-10 py-3 rounded-md font-semibold tracking-widest hover:bg-[#8b2245] transition-all duration-300 uppercase text-sm"
//                 >
//                     Edit Profile
//                 </Link>
//             </div>

//             {/* Right Section - User Details */}
//             <div className="flex flex-col space-y-10 w-full max-w-md">
//                 <h1 className="hidden md:block text-[#D4AF37] text-4xl font-bold tracking-[0.3em] uppercase border-b border-[#6D1A36] pb-4">
//                     My Profile
//                 </h1>

//                 <div className="space-y-8">
//                     <div>
//                         <h2 className="text-[#D4AF37] text-xs uppercase tracking-widest opacity-60 mb-1">Full Name</h2>
//                         <p className="text-xl font-medium tracking-wide">{user?.name}</p>
//                     </div>

//                     <div>
//                         <h2 className="text-[#D4AF37] text-xs uppercase tracking-widest opacity-60 mb-1">Email Address</h2>
//                         <p className="text-xl font-medium tracking-wide">{user?.email}</p>
//                     </div>

//                     <div>
//                         <h2 className="text-[#D4AF37] text-xs uppercase tracking-widest opacity-60 mb-1">Joined On</h2>
//                         <p className="text-xl font-medium tracking-wide">
//                             {String(user?.createdAt).substring(0, 10)}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Bottom Links */}
//                 <div className="flex flex-col gap-4 pt-6">
//                     <Link 
//                         to='/orders/user' 
//                         className="bg-[#111] border border-[#D4AF37] text-[#D4AF37] py-3 text-center rounded-md font-bold tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300 uppercase text-xs"
//                     >
//                         My Orders
//                     </Link>
//                     <Link 
//                         to='/password/update' 
//                         className="bg-[#111] border border-gray-700 text-gray-400 py-3 text-center rounded-md font-bold tracking-widest hover:border-[#D4AF37] hover:text-white transition-all duration-300 uppercase text-xs"
//                     >
//                         Change Password
//                     </Link>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }

// export default Profile





import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar';
import Loader from '../components/Loader'

function Profile() {
    const { loading, isAuthenticated, user } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated == false)
            navigate('/login')
    }, [isAuthenticated])

    return (
        <>
            <Navbar />
            <PageTitle title={`${user?.name} Profile`} />

            <div className="min-h-screen bg-white flex flex-col lg:flex-row items-start justify-center px-4 py-12 gap-10">

                {/* LEFT */}
                <div className="w-full max-w-sm border border-[#76153C]/30 rounded-md p-6 flex flex-col items-center gap-6">
                    
                    <div className="w-40 h-40 rounded-full overflow-hidden border border-[#76153C]/40">
                        <img
                            src={user?.avatar?.url}
                            alt="User Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <Link
                        to='/profile/update'
                        className="w-full text-center py-2.5 text-sm font-semibold rounded
                                   bg-[#67B2D8] text-black
                                   hover:bg-[#BF124D] hover:text-white transition"
                    >
                        Edit profile
                    </Link>

                    <Link
                        to='/password/update'
                        className="w-full text-center py-2.5 text-sm font-semibold rounded
                                   border border-[#76153C]/40 text-[#76153C]
                                   hover:border-[#67B2D8] hover:text-[#67B2D8] transition"
                    >
                        Change password
                    </Link>
                </div>

                {/* RIGHT */}
                <div className="w-full max-w-2xl border border-[#76153C]/30 rounded-md p-6">

                    <h1 className="text-xl font-semibold text-black mb-6">
                        Account information
                    </h1>

                    <div className="space-y-6 text-sm">

                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                                Full name
                            </p>
                            <p className="text-black font-medium">
                                {user?.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                                Email address
                            </p>
                            <p className="text-black font-medium">
                                {user?.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                                Member since
                            </p>
                            <p className="text-black font-medium">
                                {String(user?.createdAt).substring(0, 10)}
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-8 border-t border-[#76153C]/20"></div>

                    <Link
                        to='/orders/user'
                        className="inline-block px-6 py-2.5 text-sm font-semibold rounded
                                   bg-white border border-[#67B2D8]
                                   text-[#67B2D8]
                                   hover:bg-[#67B2D8] hover:text-black transition"
                    >
                        View your orders
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Profile
