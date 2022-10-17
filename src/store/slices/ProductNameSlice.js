import { createSlice } from '@reduxjs/toolkit';
export const ProductNameSlice = createSlice({
    name: 'Name',
    initialState: "",
    reducers: {
        setProductName: (state, action) => { // Recibimos la accion por parámetros
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const { setProductName} = ProductNameSlice.actions
export default ProductNameSlice.reducer;