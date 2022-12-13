import { createSlice } from '@reduxjs/toolkit';
export const itemName = createSlice({
    name: 'itemName',
    initialState: '',
    reducers: {
        setItemName: (state, action) => { // Recibimos la accion por parámetros
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const { setItemName} = itemName.actions
export default itemName.reducer;