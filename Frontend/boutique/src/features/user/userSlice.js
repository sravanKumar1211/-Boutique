import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


// ... (register, login, loadUser, logout, updateProfile thunks remain exactly the same)
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

const userSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
        loading:true,
        error:null,
        success:false,
        isAuthenticated:false,
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
        builder.addCase(register.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false; // FIXED: was true
            state.error=null;
            state.success=action.payload.success;
            state.user=action.payload?.user || null;
            state.isAuthenticated=Boolean(action.payload?.user);
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Registration failed.';
        })

         builder.addCase(login.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false; // FIXED: was true
            state.error=null;
            state.success=action.payload.success;
            state.user=action.payload?.user || null;
            state.isAuthenticated=Boolean(action.payload?.user);
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Login failed.';
        })

         builder.addCase(loadUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.user=action.payload?.user || null;
            state.isAuthenticated=Boolean(action.payload?.user);
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.loading=false;
            state.user=null;
            state.isAuthenticated=false;
        })

         builder.addCase(logout.fulfilled,(state)=>{
            state.loading=false;
            state.user=null;
            state.isAuthenticated=false;
        })
        //UpdateUser Profile
         builder.addCase(updateProfile.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading=false; // This ensures the button re-enables
            state.error=null;
            state.user=action.payload?.user|| state.user; // Keep existing user if update returns partial
            state.success=action.payload?.success;
            state.message=action.payload?.message;
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.loading=false; 
            state.error=action.payload?.message || 'UpdateProfile failed.';
        })
        //Update User Pssword
        builder.addCase(updatePassword.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updatePassword.fulfilled,(state,action)=>{
            state.loading=false; 
            state.error=null;
            state.success=action.payload?.success;
        })
        .addCase(updatePassword.rejected,(state,action)=>{
            state.loading=false; 
            state.error=action.payload?.message || 'UpdatePassword failed.';
        })
    }
})

export const {removeErrors,removeSuccess}=userSlice.actions
export default userSlice.reducer;