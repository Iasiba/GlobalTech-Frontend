import { createSlice } from '@reduxjs/toolkit';
export const BackendAddress = createSlice({
    name: 'BackendAddress',
    initialState: '192.168.0.252:8000',
    /*reducers: {
        setVisibleUserMenu: (state, action) => { // Recibimos la accion por parámetro Action
            return action.payload // Colocamos la propiedad payload
        }
    }*/
})
//export const { setVisibleUserMenu} = BackendAddress.actions
export default BackendAddress.reducer;