import { createSlice } from '@reduxjs/toolkit';
export const UserSlice = createSlice({
    name: 'login',
    initialState: false,
    reducers: {
        setLogin: (state, action) => { // Recibimos la accion por parámetros
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const { setLogin } = UserSlice.actions
export default UserSlice.reducer;