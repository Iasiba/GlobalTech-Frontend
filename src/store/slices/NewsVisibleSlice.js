import { createSlice } from '@reduxjs/toolkit';
export const NewVisibleSlice = createSlice({
    name: 'NewVisible',
    initialState: [false,false,false,false,false,false,false,false,false,false,false],
//project, room, task,activity,account, 
//inventary,material, backup, user,note
//guide
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
            state[10]=false
        },
        setVisibleRoom:(state,action)=>{// Recibimos la accion por parámetro Action
            state[1]=action.payload// Colocamos la propiedad payload
            state[0]=false
            state[2]=false
            state[3]=false
            state[4]=false
            state[5]=false
            state[6]=false
            state[7]=false
            state[8]=false
            state[9]=false
            state[10]=false
        },
        setVisibleTask:(state,action)=>{// Recibimos la accion por parámetro Action
            state[2]=action.payload// Colocamos la propiedad payload
            state[1]=false
            state[0]=false
            state[3]=false
            state[4]=false
            state[5]=false
            state[6]=false
            state[7]=false
            state[8]=false
            state[9]=false
            state[10]=false
        },
        setVisibleActivity:(state,action)=>{// Recibimos la accion por parámetro Action
            state[3]=action.payload// Colocamos la propiedad payload
            state[1]=false
            state[2]=false
            state[0]=false
            state[4]=false
            state[5]=false
            state[6]=false
            state[7]=false
            state[8]=false
            state[9]=false
            state[10]=false
        },
        setVisibleAccount:(state,action)=>{// Recibimos la accion por parámetro Action
            state[4]=action.payload// Colocamos la propiedad payload
            state[1]=false
            state[2]=false
            state[3]=false
            state[0]=false
            state[5]=false
            state[6]=false
            state[7]=false
            state[8]=false
            state[9]=false
            state[10]=false
        },
        setVisibleInventary:(state,action)=>{// Recibimos la accion por parámetro Action
            state[5]=action.payload// Colocamos la propiedad payload
            state[1]=false
            state[2]=false
            state[3]=false
            state[4]=false
            state[0]=false
            state[6]=false
            state[7]=false
            state[8]=false
            state[9]=false
            state[10]=false
        },
        setVisibleMaterial:(state,action)=>{// Recibimos la accion por parámetro Action
            state[0]=false
            state[1]=false
            state[2]=false
            state[3]=false
            state[4]=false
            state[5]=false
            state[6]=action.payload// Colocamos la propiedad payload
            state[7]=false
            state[8]=false
            state[9]=false
            state[10]=false
        },
        setVisibleBackup:(state,action)=>{// Recibimos la accion por parámetro Action
            state[0]=false
            state[1]=false
            state[2]=false
            state[3]=false
            state[4]=false
            state[5]=false
            state[6]=false
            state[7]=action.payload// Colocamos la propiedad payload
            state[8]=false
            state[9]=false
            state[10]=false
        },
        setVisibleNote:(state,action)=>{// Recibimos la accion por parámetro Action
            state[0]=false
            state[1]=false
            state[2]=false
            state[3]=false
            state[4]=false
            state[5]=false
            state[6]=false
            state[7]=false
            state[8]=action.payload// Colocamos la propiedad payload
            state[9]=false
            state[10]=false
        },
        setVisibleUser:(state,action)=>{// Recibimos la accion por parámetro Action
            state[0]=false
            state[1]=false
            state[2]=false
            state[3]=false
            state[4]=false
            state[5]=false
            state[6]=false
            state[7]=false
            state[8]=false
            state[9]=action.payload// Colocamos la propiedad payload
            state[10]=false
        },
        setVisibleGuide:(state,action)=>{// Recibimos la accion por parámetro Action
            state[0]=false
            state[1]=false
            state[2]=false
            state[3]=false
            state[4]=false
            state[5]=false
            state[6]=false
            state[7]=false
            state[8]=false
            state[9]=false
            state[10]=action.payload// Colocamos la propiedad payload
        }
    }
})
export const { 
    setVisibleProject,
    setVisibleRoom,
    setVisibleTask,
    setVisibleActivity,
    setVisibleAccount,
    setVisibleInventary,
    setVisibleMaterial,
    setVisibleBackup,
    setVisibleNote,
    setVisibleUser,
    setVisibleGuide
} = NewVisibleSlice.actions
export default NewVisibleSlice.reducer;