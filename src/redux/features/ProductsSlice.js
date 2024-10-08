import { createSlice, createAsyncThunk }  from '@reduxjs/toolkit';
import { API } from '../../api';

const initialState = {
    products: null,
    isLoading: false,
    isSuccess: false,
    isError: false
}

export const getAllProducts = createAsyncThunk('getAllProducts', async ( thunkApi) => {
    
    try {
        const response = await API.get('products');
        console.log('response', response);
        return response.data
    } catch(error) {
        console.log('error', error);
        return thunkApi.rejectWithValue(error)
    }
} )


const ProductsSlice = createSlice({
    name:'productsSlice',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
// getAllProducts cases
    builder.addCase(getAllProducts.pending, state => {
    state.isLoading = true
    });
    builder.addCase(getAllProducts.fulfilled, (state, action)=> {
    state.isLoading = false;
    state.isSuccess = true;
    state.products = action.payload
    });
    builder.addCase(getAllProducts.rejected,(state, action) => {
        state.isLoading = false;
        state.isError = true
    } )
    }
})

export default ProductsSlice.reducer