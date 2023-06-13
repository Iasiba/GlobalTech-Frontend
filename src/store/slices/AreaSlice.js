import { createSlice } from '@reduxjs/toolkit';
export const Area = createSlice({
    name: 'Area',
    initialState: "",
    reducers: {
        setArea: (state, action) => { // Recibimos la accion por parámetros
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const { setArea} = Area.actions
export default Area.reducer;