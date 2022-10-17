import { createSlice } from '@reduxjs/toolkit';
export const UserSlice = createSlice({
    name: 'user',
    initialState: "",
    reducers: {
        setUser: (state, action) => { // Recibimos la accion por parámetros
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const { setUser } = UserSlice.actions
export default UserSlice.reducer;