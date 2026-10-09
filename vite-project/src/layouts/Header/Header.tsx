import  "./Header.css";
import Nav from "../../Components/Nav.tsx";
import LogIn from "../../Pages/LogIn/LogIn.tsx";
import Registration from "../../Pages/Registration/Registration.tsx";
import { TiAdjustContrast} from "react-icons/ti";
import { FiUser,FiSearch } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Favorite from "../../Components/Favorite.tsx";
import Cart from "../../Components/Cart.tsx";
import { useAppDispatch,useAppSelector } from "../../state/hooks.ts";
import type { RootState } from "../../state/store.ts";
import {setMode} from "../../state/StateSlices/drakModeSlice.ts"
import { Menu } from "lucide-react"
import SearchForm from "../../Components/SearchForm.tsx"

function Header(){
    const mode=useAppSelector((state: RootState)=>state.darkMode.mode);
    const dispatch=useAppDispatch()
    const{id}=useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<number>(0);
useEffect(() => {
    function handleScroll(){
         setScrolled(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, []);
// ///////////////ძიება////////////////
// function searchData():void{
//     productData.filter(item =>
//   item.name.toLowerCase().includes(search.toLowerCase())
// )
// }
    return(<>
    <header>
        <div className="container">
            <div className="flex gap-2 items-center justify-center">
                <div className="flex w-1/5 gap-3 ">
                    <button onClick={()=>setMenuIsOpen(true)} className="Btn flex lg:hidden">
                        <Menu/>
                    </button>
                    {menuIsOpen && 
                             <div onClick={()=>setMenuIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-start bg-dark1 bg-opacity-50 dark:bg-opacity-80 dark:bg-darkshadow">
                        <div  onClick={(e) => e.stopPropagation()} className="relative max-w-[45vw] h-full shadow-lg dark:shadow-darkshadow bg-light1 dark:bg-dark2 p-2 flex flex-col justify-start">
                            <button className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2  text-btnLight dark:text-light2 text-xl"  onClick={()=>setMenuIsOpen(false)}><FaTimes className=""/></button>
                            <Nav col="flex-col"/>
                        </div>
                    </div>
                    }
                    <SearchForm/>
                </div>
                <div className="logo">
                    <div className="logoIcon">
                        <img src="../../../public/faicon.png" alt="logo" className="w-full h-full object-contain"/>
                    </div>
                    {id==undefined && <span className={`${ (scrolled > 50 ) ? "hidden" : "block "} text-mainCol text-[24px] font-unicode font-medium`}>წერო</span>}
                </div>
                <div className="headerBtns">
                    <button onClick={()=>setIsOpen(true)} className="font-mtavruli leading-none flex items-center p-1 h-[20px] gap-1 ">
                        <FiUser className="text-[#ecf0fc] text-sm"/>
                        <span className="translate-y-[2px] sm:flex hidden">ავტორიზაცია</span>
                    </button>
                    {isOpen && (
                        <div onClick={()=>setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d152d] bg-opacity-50 dark:bg-opacity-80 dark:bg-darkshadow">
                            <div  onClick={(e) => e.stopPropagation()} className="relative w-11/12 max-w-4xl max-h-[95vh]  rounded shadow-lg flex text-light2 rounded-xl overflow-hidden">
                                <button className="absolute top-0 right-0 p-2 text-btnLight dark:text-light2"  onClick={()=>setIsOpen(false)}><FaTimes className="w-[25px] h-[25px]"/></button>
                                <div className="w-1/2 p-8 bg-light1 dark:bg-dark1 overflow-y-scroll scrollbar-thin scrollbar-thumb-light3 hover:scrollbar-thumb-btnDark scrollbar-track-light1">
                                    <LogIn/>
                                </div>
                                <div className="w-1/2 p-8 bg-light2 dark:bg-dark2 overflow-y-scroll scrollbar-thin scrollbar-thumb-light1 hover:scrollbar-thumb-btnDark scrollbar-track-light2">
                                    <Registration/>
                                </div>
                            </div>   
                        </div>
                    )}
                </div>
                <Favorite/>
                <Cart/>
                <button onClick={()=>mode=="light"?dispatch(setMode("dark")):dispatch(setMode("light"))} className="darkMode">
                    <TiAdjustContrast className="text-btnLight dark:text-btnDark w-[35px] h-[35px] dark:rotate-180"/>
                </button>
            </div>
            <div className="headerSection2 hidden lg:flex">
                <Nav/>
            </div>
        </div>
    </header>
    </>)
}
export default Header;