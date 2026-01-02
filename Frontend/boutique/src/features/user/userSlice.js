
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// This is required for cookies/sessions to work through the proxy
axios.defaults.withCredentials = true;

/* --- THUNKS (Exactly as per your original schema) --- */

export const register=createAsyncThunk('user/register',async(userData,{rejectWithValue})=>{
    try{
        const config={ headers:{ 'Content-Type':'multipart/form-data' } }
        const {data}=await axios.post('/api/v1/register',userData,config)
        return data
    }catch(error){
        return rejectWithValue(error.response?.data || 'Registration failed.')
    }
})

export const login=createAsyncThunk('user/login',async({email,password},{rejectWithValue})=>{
    try{
        const config={ headers:{ 'Content-Type':'application/json' } }
        const {data}=await axios.post('/api/v1/login',{email,password},config)
        return data
    }catch(error){
        return rejectWithValue(error.response?.data || 'Login failed.')
    }
})

export const loadUser=createAsyncThunk('user/loadUser',async(_,{rejectWithValue})=>{
    try{
            const {data}=await axios.get('/api/v1/profile');
            return data
    }catch(error){
        return rejectWithValue(error.response?.data || 'LoadUser failed.')
    }
})

export const logout=createAsyncThunk('user/logout',async(_,{rejectWithValue})=>{
    try{
            const {data}=await axios.post('/api/v1/logout');
            return data
    }catch(error){
        return rejectWithValue(error.response?.data || 'Unable to Logout')
    }
})

export const updateProfile=createAsyncThunk('user/updateProfile',async(userData,{rejectWithValue})=>{
    try{    
        const config={ headers:{ 'Content-Type':'multipart/form-data' } }
        const {data}=await axios.post('/api/v1/profile/update',userData,config);
        return data
    }catch(error){
        return rejectWithValue(error.response?.data || {message:'Profile Update failed'})
    }
})

export const updatePassword=createAsyncThunk('user/updatePassword',async(formData,{rejectWithValue})=>{
    try{    
         const config={ headers:{ 'Content-Type':'application/json' } }
        const {data}=await axios.put('/api/v1/password/update',formData,config);
        return data
    }catch(error){
        return rejectWithValue(error.response?.data || 'Password Update failed')
    }
})

export const forgotPassword=createAsyncThunk('user/forgotPassword',async(email,{rejectWithValue})=>{
    try{    
         const config={ headers:{ 'Content-Type':'application/json' } }
        const {data}=await axios.post('/api/v1/password/forgot',email,config);
        return data
    }catch(error){
        return rejectWithValue(error.response?.data ||{message: 'EmailSent failed'})
    }
})

export const resetPassword=createAsyncThunk('user/resetPassword',async({token,userData},{rejectWithValue})=>{
    try{    
         const config={ headers:{ 'Content-Type':'application/json' } }
        const {data}=await axios.post(`/api/v1/password/reset/${token}`,userData,config);
        return data
    }catch(error){
        return rejectWithValue(error.response?.data ||{message: 'ResetPassword failed'})
    }
})

const userSlice=createSlice({
    name:'user',
    initialState:{
        user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
        loading: false, // Changed to false so refresh doesn't hang
        error:null,
        success:false,
        isAuthenticated:localStorage.getItem('isAuthenticated')==='true',
        message:null
    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null
        },
        removeSuccess:(state)=>{
            state.success=null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false; 
            state.user=action.payload?.user;
            state.isAuthenticated=true;
            localStorage.setItem('user',JSON.stringify(state.user))
            localStorage.setItem('isAuthenticated','true')
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Registration failed.';
        })
        
        //login
         builder.addCase(login.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload?.user;
            state.isAuthenticated=true;
            localStorage.setItem('user',JSON.stringify(state.user))
            localStorage.setItem('isAuthenticated','true')
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Login failed.';
        })

         builder.addCase(loadUser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload?.user;
            state.isAuthenticated=true;
            localStorage.setItem('user',JSON.stringify(state.user))
            localStorage.setItem('isAuthenticated','true')
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.loading=false;
            // Background sync: If session is actually dead, clear storage
            if(action.payload?.statusCode === 401) {
                state.user=null;
                state.isAuthenticated=false;
                localStorage.removeItem('user')
                localStorage.removeItem('isAuthenticated')
            }
        })

         builder.addCase(logout.fulfilled,(state)=>{
            state.loading=false;
            state.user=null;
            state.isAuthenticated=false;
            localStorage.removeItem('user')
            localStorage.removeItem('isAuthenticated')
        })

         builder.addCase(updateProfile.pending,(state)=>{
            state.loading=true;
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload?.user|| state.user;
            state.success=action.payload?.success;
            localStorage.setItem('user',JSON.stringify(state.user))
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.loading=false; 
            state.error=action.payload?.message || 'UpdateProfile failed.';
        })

        builder.addCase(updatePassword.fulfilled,(state,action)=>{
            state.loading=false; 
            state.success=action.payload?.success;
        })
        .addCase(updatePassword.rejected,(state,action)=>{
            state.loading=false; 
            state.error=action.payload?.message || 'UpdatePassword failed.';
        })

        builder.addCase(forgotPassword.fulfilled,(state,action)=>{
            state.loading=false; 
            state.message=action.payload?.message;
        })

        builder.addCase(resetPassword.fulfilled,(state,action)=>{
            state.loading=false; 
            state.success=action.payload?.success;
            state.user=null;
            state.isAuthenticated=false
        })
    }
})

export const {removeErrors,removeSuccess}=userSlice.actions
export default userSlice.reducer;