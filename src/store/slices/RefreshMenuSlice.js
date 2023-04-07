import { createSlice } from '@reduxjs/toolkit';
export const RefreshMenu = createSlice({
    name: 'RefreshMenu',
    initialState: { value: false },
    reducers: {
        setRefreshMenu: (state, action) => { // Recibimos la accion por parámetros
            state.value = action.payload // Colocamos la propiedad payload return action.payload
        },
        updateRefreshMenu: (state) => {
            state.value = !state.value
        }
    }
})
export const { setRefreshMenu, updateRefreshMenu } = RefreshMenu.actions
export default RefreshMenu.reducer;