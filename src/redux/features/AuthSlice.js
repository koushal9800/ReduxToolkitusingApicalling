import { createSlice, createAsyncThunk }  from '@reduxjs/toolkit';
import { API } from '../../api';



const initialState = {
    userData: null,
    isLoading: false,
    isSuccess: false,
    isError: false
}

export const login = createAsyncThunk('login', async (params, thunkApi) => {
    console.log('params', params);
    try {
        const response = await API.post('auth/login', params);
        console.log('response', response);
        return response.data
    } catch(error) {
        console.log('error', error);
        return thunkApi.rejectWithValue(error)
    }
} )

const AuthSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
// login cases
    builder.addCase(login.pending, state => {
    state.isLoading = true
    });
    builder.addCase(login.fulfilled, (state, action)=> {
    state.isLoading = false;
    state.isSuccess = true;
    state.userData = action.payload
    });
    builder.addCase(login.rejected,(state, action) => {
        state.isLoading = false;
        state.isError = true
    } )
    }
})

export default AuthSlice.reducer