import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
type initialStateType={
    mode:string;
}
//default value
const initialState:initialStateType={
    mode: localStorage.getItem("mode")||"light"
}
//state
const darkModeSlice=createSlice({
    name:"darkMode",
    initialState,
    reducers:{
        setMode:(state,action:PayloadAction<string>)=>{
            state.mode=action.payload;
            localStorage.setItem("mode",state.mode);
        },
    }
})
export const{setMode}=darkModeSlice.actions;
export default darkModeSlice.reducer