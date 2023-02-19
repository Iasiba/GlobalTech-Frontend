import { createSlice } from '@reduxjs/toolkit';
export const UserListVisible = createSlice({
    name: 'UserListVisible',
    initialState: false,
    reducers: {
        setUserListVisible: (state, action) => {// Recibimos la accion por parámetro Action
            return action.payload // Colocamos la propiedad payload
        }
    }
})
export const {
    setUserListVisible
} = UserListVisible.actions
export default UserListVisible.reducer;