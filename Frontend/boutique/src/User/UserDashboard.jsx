import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, Avatar, IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
 import { logout, removeSuccess } from '../features/user/userSlice'; // Assuming you'll have a logout action
import { toast } from 'react-toastify';

function UserDashboard({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const logoutUser = () => {
    handleClose();
    console.log("Logout triggered");
    dispatch(logout())
    .unwrap().then(()=>{
    toast.success('logout success')
    dispatch(removeSuccess())
     navigate("/login")
    }).catch((error)=>{
        toast.success(error.message)
    })
  };

  const options = [
    { name: 'My Orders', func: () => { navigate("/orders/user"); handleClose(); } },
    { name: 'Profile', func: () => { navigate("/profile"); handleClose(); } },
    { name: 'Logout', func: logoutUser },
  ];

  if (user?.role === 'admin') {
    options.unshift({ name: 'Dashboard', func: () => { navigate("/admin/dashboard"); handleClose(); } });
  }

  return (
    <>
      <Tooltip title={user?.name || "Account"}>
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <Avatar
            alt={user?.name}
            src={user?.avatar?.url || ""}
            sx={{ 
              width: 35, 
              height: 35, 
              border: '2px solid #D4AF37',
              backgroundColor: '#6D1A36' 
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        PaperProps={{
          sx: {
            bgcolor: '#111',
            color: '#D4AF37',
            border: '1px solid #6D1A36',
            minWidth: '150px',
            '& .MuiMenuItem-root': {
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              '&:hover': { bgcolor: '#6D1A36', color: 'white' },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className="px-4 py-2 text-[10px] text-gray-500 border-b border-gray-800 pointer-events-none">
          LOGGED IN AS: <span className="text-white block">{user?.email}</span>
        </div>
        
        {options.map((option) => (
          <MenuItem key={option.name} onClick={option.func}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default UserDashboard;