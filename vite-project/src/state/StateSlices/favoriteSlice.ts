import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface FavoriteState{
    favItemIdList:number[]
}
const LocalItemId=localStorage.getItem("favList")

const initialState:FavoriteState={
    favItemIdList:LocalItemId?JSON.parse(LocalItemId):[] //default value
}
//state
const favoriteSlice=createSlice({
    name:"favorite",
    initialState,//state საიდანაც დაიწყება
//reduser
    reducers:{
//action
        addFavItem:(state, action:PayloadAction<number>)=>{
            if(state.favItemIdList.includes(action.payload)===false){
                state.favItemIdList.push(action.payload);
                localStorage.setItem("favList",JSON.stringify(state.favItemIdList))
            }
        },
        removeFavItem:(state, action:PayloadAction<number>)=>{
            if(state.favItemIdList.includes(action.payload)===true && state.favItemIdList.indexOf(action.payload)!=-1){
                const deleteIdIndex:number=state.favItemIdList.indexOf(action.payload)
                state.favItemIdList.splice(deleteIdIndex,1)
                localStorage.setItem("favList",JSON.stringify(state.favItemIdList))
            }
        },
        clearAllFavItems:(state)=>{
            localStorage.removeItem("favList")
            state.favItemIdList=[]
        }
    }
})
export const {addFavItem, removeFavItem, clearAllFavItems}=favoriteSlice.actions;
export default favoriteSlice.reducer;