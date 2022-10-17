import { createSlice } from '@reduxjs/toolkit';
export const ProductsFilterSlice = createSlice({
    name: 'ProductsFilter',
    initialState:null,
    reducers: {
        setFilterProducts: (state, action) => { // Recibimos la accion por parámetros
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const { setFilterProducts} = ProductsFilterSlice.actions
export default ProductsFilterSlice.reducer;