import { Navigate, Outlet, useNavigate } from "react-router";
import Footer from "../layouts/Footer/Footer";
import DashHeader from "./DashHeader";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { logOut } from "../state/StateSlices/isAuthSlice";

function DashLayout (){
    const isAuth = useAppSelector((state) => state.isauth.isAuth);
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    console.log(user);
    return(
        <>
            <DashHeader/>
            <main className="bg-red-600">
               {isAuth ? <Outlet/> : <Navigate to="/"/>}
               <button onClick={()=>{dispatch(logOut());navigate("/")}}>log out</button>
            </main>
            <Footer/>
        </>
    );
}

export default DashLayout;