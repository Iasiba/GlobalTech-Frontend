import { createSlice } from '@reduxjs/toolkit';
export const FilterSlice = createSlice({
    name: 'Filter',
    initialState: "",
    reducers: {
        setFilter: (state, action) => { // Recibimos la accion por parámetros
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const { setFilter} = FilterSlice.actions
export default FilterSlice.reducer;