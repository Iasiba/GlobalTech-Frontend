import { createSlice } from '@reduxjs/toolkit';
export const PlusMenu = createSlice({
    name: 'PlusMenu',
    initialState: false,
    
    reducers: {
        setVisiblePlusMenu: (state, action) => { // Recibimos la accion por parámetro Action
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const { setVisiblePlusMenu} = PlusMenu.actions
export default PlusMenu.reducer;