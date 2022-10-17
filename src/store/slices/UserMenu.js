import { createSlice } from '@reduxjs/toolkit';
export const UserMenu = createSlice({
    name: 'UserMenu',
    initialState: false,
    reducers: {
        setVisibleUserMenu: (state, action) => { // Recibimos la accion por parámetro Action
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const { setVisibleUserMenu} = UserMenu.actions
export default UserMenu.reducer;