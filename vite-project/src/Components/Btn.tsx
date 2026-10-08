import type { ReactNode } from "react";//tsconfig.json ში ჩართულია "verbatimModuleSyntax": true და მაგიტომ, რომ არ იყოს იქნებოდა ასე: import { ReactNode } from "react";
interface BtnPropsType{
    text?:string;
    icon?:ReactNode;
    type?: "button" | "submit" | "reset";
}
function Btn(props:BtnPropsType){
    const {text,icon,type}=props
    return(
        <button type={type} className={` flex gap-2 items-center justify-center px-2 rounded-xl text-light1 dark:bg-btnDark hover:shadow-sm hover:shadow-btnLight bg-btnDark`}>
            <span>{icon}</span>
            <span className="btnText py-2">{text}</span>
        </button>
    )
}
export default Btn