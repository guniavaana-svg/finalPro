import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./StateSlices/favoriteSlice";
import cartReducer from "./StateSlices/cartSlice";
import isAuthReducer from "./StateSlices/isAuthSlice";
import darkModeReducer from "./StateSlices/drakModeSlice";
export const store=configureStore({
    reducer:{
        //აქ ვწერთ სხვადასხვა slice ანუ reducers
        favorite: favoriteReducer,
        cart: cartReducer,
        isauth:isAuthReducer,
        darkMode:darkModeReducer
    }
})
//ტს ში საჭიროა ტიპის ექსპორტირებაც
//getState არის store ცვლადის პუნქცია, რომლის ტიპსაც ვიგებთ typeof ით და ამ ტიპს ვაბრუნებთ ReturnType-ით და ვინახავთ RootState-ში. state-ზე წვდომისას ყოველთვის ვუთითებთ ამ ტიპს
export type RootState=ReturnType<typeof store.getState>;
//dispatch იც არის პუნქცია რომლის ტიპსაც ვინახავთ AppDispatch-ში
export type AppDispatch= typeof store.dispatch;
export type AppStore = typeof store; 