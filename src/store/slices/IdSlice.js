import { createSlice } from '@reduxjs/toolkit';
export const IdSlice = createSlice({
    name: 'Id',
    initialState: 0,
    reducers: {
        setId: (state, action) => { // Recibimos la accion por parámetros
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const { setId: setId } = IdSlice.actions
export default IdSlice.reducer;