import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
type initialStateType={
    isAuth:boolean
}
//default value
const initialState:initialStateType={
    isAuth:JSON.parse(localStorage.getItem("isAuth")||"false")
}
//state
const isAuthSlice=createSlice({
    name:"isAuth",
    initialState,
    reducers:{
        logIn:(state)=>{
            state.isAuth=true;
            localStorage.setItem("isAuth", JSON.stringify(state.isAuth))
        },
        logOut:(state)=>{
            state.isAuth=false;
            localStorage.setItem("isAuth", JSON.stringify(state.isAuth))
        }
    }
})
export const{logIn,logOut}=isAuthSlice.actions;
export default isAuthSlice.reducer