import "./Layout.css";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import { Outlet} from "react-router-dom";
import { useAppSelector } from "../../state/hooks.ts";
import type { RootState } from "../../state/store.ts";
import { useEffect } from "react";
function Layout (){
    // const location = useLocation();
    // console.log("Current path:", location.pathname);
    const mode=useAppSelector((state: RootState)=>state.darkMode.mode);
    useEffect(()=>{
         if(mode==="dark"){
                console.log("dark")
                document.documentElement.classList.add("dark");
            }else{
                document.documentElement.classList.remove("dark");
                console.log("light")
            }
    },[mode]);
    return(<>
            <Header/>
            <main className="bg-[#ecf0fc] dark:bg-[#0D152D] dark:text-[#D9E1F9]">
                <div className="container py-[170px] ">
                  <Outlet/>  
                </div>
            </main>
            <Footer/>
    </>)
}
export default Layout;