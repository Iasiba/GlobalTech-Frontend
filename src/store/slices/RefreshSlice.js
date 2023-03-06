import { createSlice } from '@reduxjs/toolkit';
export const Refresh = createSlice({
    name: 'Refresh',
    initialState: false,
    reducers: {
        setRefresh: (state, action) => { // Recibimos la accion por parámetros
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const { setRefresh} = Refresh.actions
export default Refresh.reducer;