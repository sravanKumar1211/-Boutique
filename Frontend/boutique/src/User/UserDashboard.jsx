import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, Avatar, IconButton, Tooltip, Box, Typography, Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout, removeSuccess } from '../features/user/userSlice'; 
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
      .unwrap().then(() => {
        toast.success('logout success');
        dispatch(removeSuccess());
        navigate("/login");
      }).catch((error) => {
        toast.error(error.message);
      });
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
      <Tooltip title="Account & Lists">
        <IconButton
          onClick={handleOpen}
          disableRipple
          sx={{
            p: '4px 8px',
            borderRadius: '2px',
            border: open ? '1px solid #67B2D8' : '1px solid transparent',
            '&:hover': {
              border: '1px solid #67B2D8',
            },
            transition: '0.1s',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              alt={user?.name}
              src={user?.avatar?.url || ""}
              sx={{
                width: 32,
                height: 32,
                border: '1.5px solid #67B2D8',
                backgroundColor: '#76153C',
                fontSize: '0.9rem',
                color: 'white'
              }}
            >
              {user?.name?.charAt(0)}
            </Avatar>
            {/* Amazon-style Labels */}
            <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'left' }}>
              <Typography sx={{ fontSize: '11px', color: 'white', lineHeight: 1.2 }}>
                Hello, {user?.name?.split(' ')[0] || 'Sign in'}
              </Typography>
              <Typography sx={{ fontSize: '13px', color: '#67B2D8', fontWeight: 700, lineHeight: 1.2 }}>
                Account & Lists
              </Typography>
            </Box>
          </Box>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: '12px',
            bgcolor: '#5A0E24',
            color: 'white',
            border: '1px solid #76153C',
            minWidth: '220px',
            overflow: 'visible',
            // Amazon's Menu Triangle/Caret
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 18,
              width: 12,
              height: 12,
              bgcolor: '#5A0E24',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              borderLeft: '1px solid #76153C',
              borderTop: '1px solid #76153C',
            },
            '& .MuiList-root': { padding: 0 },
            '& .MuiMenuItem-root': {
              fontSize: '13px',
              padding: '10px 16px',
              transition: 'all 0.2s',
              '&:hover': { 
                bgcolor: '#BF124D', 
                color: 'white',
                textDecoration: 'underline'
              },
            },
          },
        }}
      >
        {/* Amazon-style User Header */}
        <Box sx={{ px: 2, py: 1.5, pointerEvents: 'none' }}>
          <Typography sx={{ fontSize: '10px', color: '#67B2D8', fontWeight: 700, letterSpacing: '0.5px' }}>
            YOUR ACCOUNT
          </Typography>
          <Typography sx={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
            {user?.email}
          </Typography>
        </Box>
        
        <Divider sx={{ borderColor: '#76153C', opacity: 0.5 }} />
        
        <Box sx={{ py: 1 }}>
          {options.map((option) => (
            <MenuItem key={option.name} onClick={option.func}>
              {option.name}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
}

export default UserDashboard;