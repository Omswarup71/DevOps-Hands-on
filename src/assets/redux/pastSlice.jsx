import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  : []
}

export const pastSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
        const paste=action.payload;
        state.pastes.push(paste);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("pastes is create successfuly")
    },
    updateToPastes: (state,action) => {
      const paste =action.payload;
      const index = state.pastes.findIndex((item)=> item._id === paste._id);
      if(index !== -1) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Pastes Update");
      }
    },
    resetAllPastes: (state, action) => {
        state.pastes=[];
        localStorage.removeItem("pastes")
    },
    removeFromPastes:(state,action)=>{
        const paste = action.payload;
        const index = state.pastes.findIndex((item) => item._id == paste);
      console.log(index)
        if(index >= 0){
          state.pastes.splice(index, 1);
          localStorage.setItem("pastes",JSON.stringify(state.pastes));
          toast.success("Paste is delete successfuly");
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes} = pastSlice.actions

export default pastSlice.reducer