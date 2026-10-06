import type { ReactNode } from "react";//tsconfig.json ში ჩართულია "verbatimModuleSyntax": true და მაგიტომ, რომ არ იყოს იქნებოდა ასე: import { ReactNode } from "react";
interface BtnPropsType{
    text?:string;
    icon?:ReactNode;
    bgCol?:string;
    textCol?:string;
    hoverBgCol?:string;
    type?: "button" | "submit" | "reset";
}
function Btn(props:BtnPropsType){
    const {text,bgCol,textCol,icon,type,hoverBgCol}=props
    return(
        <button type={type} className={`${bgCol} ${textCol} flex gap-2 items-center justify-center px-2 rounded-xl dark:bg-btnDark hover:shadow-sm hover:shadow-btnLight hover:${hoverBgCol}`}>
            <span>{icon}</span>
            <span className="btnText py-2">{text}</span>
        </button>
    )
}
export default Btn