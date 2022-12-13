import { createSlice } from '@reduxjs/toolkit';
export const Item = createSlice({
    name: 'Item',
    initialState: {},
    reducers: {
        setItem: (state, action) => { // Recibimos la accion por parámetros
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const { setItem} = Item.actions
export default Item.reducer;