import { createSlice } from '@reduxjs/toolkit';
export const Refresh = createSlice({
    name: 'Refresh',
    initialState: { value: false },
    reducers: {
        setRefresh: (state, action) => { // Recibimos la accion por parámetros
            state.value = action.payload // Colocamos la propiedad payload
        },
        updateRefresh: (state) => {
            state.value = !state.value
        }
    }
})
export const { setRefresh, updateRefresh } = Refresh.actions
export default Refresh.reducer;