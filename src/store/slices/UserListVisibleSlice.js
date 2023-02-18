import { createSlice } from '@reduxjs/toolkit';
export const NewVisibleSlice = createSlice({
    name: 'UserListVisible',
    initialState: [false,false,false,false,false,false,false,false,false,false],
    reducers: {
        setVisibleProject:(state,action)=>{// Recibimos la accion por parámetro Action
            state[0]=action.payload// Colocamos la propiedad payload
            state[1]=false
            state[2]=false
            state[3]=false
            state[4]=false
            state[5]=false
            state[6]=false
            state[7]=false
            state[8]=false
            state[9]=false
        }
    }
})
export const { 
    setVisibleProject
} = NewVisibleSlice.actions
export default NewVisibleSlice.reducer;