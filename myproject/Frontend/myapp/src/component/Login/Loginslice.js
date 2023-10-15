import { createSlice } from "@reduxjs/toolkit"

const initialState={
    value:{}
}


export const loginSlice=createSlice({
    name: 'check',
    initialState,
    reducers:{
        login:(state,action)=>{
        const { username, password,id,role } = action.payload;
        console.log(action.payload)
        state.value={...state.value,username:username,password:password,id:id,role:role};
    },
    logout:(state)=>{
        state.value = {}
    }
    }
})

 

export const {login,logout}=loginSlice.actions
export default loginSlice.reducer