import "./Nav.css"
import { NavLink} from "react-router-dom";
import { API_URL } from "../../config";
import { useEffect,useState } from "react";
interface MenuCildrenType{
    id:21;
    path:string;
    name:String;
}
interface Menu{
    id:number;
    path:string;
    name:string;
    children:MenuCildrenType[];
}
function Nav (){
    const [menuData,setMenu]=useState<Menu[]>([])
    useEffect(()=>{
        async function getMenu() {
            try{
                const response=await fetch(`${API_URL}/menu`)
                const menuData:Menu[]=await response.json()
                setMenu(menuData);
            }catch(e){
                console.error(e);
            }
        } 
        getMenu()
    },[])
    ///////////////////////////////////////////////
    function setIsHovered(){

    }
    return(
        <nav className="">
            <ul className="flex gap-3 p-3">
               {menuData?.map(item=>(
                    <li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} key={item.id}>
                        <NavLink  to={item.path} end>{item.name}</NavLink>
                        <ul className="navChildren">
                            {item?.children.map(el=>
                                <li key={el.id}><NavLink to={el.path} end>{el.name}</NavLink></li>
                            )}
                        </ul>
                    </li>
                ))} 
            </ul>
            
        </nav>
    )
}
export default Nav


// import { useState, useRef, useEffect } from "react";

// // 💡 Custom Hook
// function useHover<T extends HTMLElement>() {
//   const [isHovered, setIsHovered] = useState(false);
//   const ref = useRef<T>(null);

//   useEffect(() => {
//     const element = ref.current;
//     if (!element) return;

//     const handleMouseEnter = () => setIsHovered(true);
//     const handleMouseLeave = () => setIsHovered(false);

//     element.addEventListener("mouseenter", handleMouseEnter);
//     element.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       element.removeEventListener("mouseenter", handleMouseEnter);
//       element.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

//   return [ref, isHovered] as const;
// }

// // 🎯 გამოყენება კომპონენტში:
// export const HoverMenu = () => {
//   const [hoverRef, isHovered] = useHover<HTMLDivElement>();

//   return (
//     <div ref={hoverRef}>
//       <button>მენიუ</button>
//       {isHovered && <div>ჩამოშლილი კონტენტი 🚀</div>}
//     </div>
//   );
// };

///////////////////////////////////////

// import { useState } from "react";

// export const Navigation = ({ menuData }: any) => {
//   // ინახავს იმ ელემენტის ID-ს, რომელზეც მაუსია მიტანილი
//   const [hoveredId, setHoveredId] = useState<number | null>(null);

//   return (
//     <ul className="flex gap-4">
//       {menuData?.menu?.map((item: any) => (
//         <li
//           key={item.id}
//           onMouseEnter={() => setHoveredId(item.id)}
//           onMouseLeave={() => setHoveredId(null)}
//           className="relative"
//         >
//           <span>{item.name}</span>

//           {/* მხოლოდ იმ ელემენტის ჩაშლა გამოჩნდება, რომლის ID-ც ემთხვევა hoveredId-ს */}
//           {hoveredId === item.id && item.children && (
//             <ul className="absolute top-full left-0 bg-white shadow-md">
//               {item.children.map((child: any) => (
//                 <li key={child.id}>{child.name}</li>
//               ))}
//             </ul>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// };