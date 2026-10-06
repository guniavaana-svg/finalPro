import { Navigate, Outlet, useNavigate } from "react-router";
import Footer from "../layouts/Footer/Footer";
import LogIn from "../Pages/LogIn/LogIn";
import { createContext } from 'react';
import DashHeader from "./DashHeader";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {logIn,logOut} from "..//state/StateSlices/isAuthSlice"

function DashLayout (){
    const isAuth = useAppSelector((state) => state.isauth.isAuth)
    const dispatch=useAppDispatch()
    let navigate = useNavigate();
    const user=JSON.parse(localStorage.getItem("user")|| "null")
    console.log(user)
    return(
        <>
            <DashHeader/>
            <main className="bg-red-600">
               {isAuth? <Outlet/>:<Navigate to="/"/>}
               <button onClick={()=>{dispatch(logOut());navigate("/")}}>log out</button>
            </main>
            <Footer/>
        </>
        
    )
}
export default DashLayout;