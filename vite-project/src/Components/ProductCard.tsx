import { NavLink } from "react-router";

interface productСardPropsType{
    className?:string;
    id?:string;
    name?:string;
    price?:number;
    currency?:string;
    thumbnail?:string;
}
function ProductCard(props:productСardPropsType){
    const {className, name, price, currency, thumbnail, id}=props
    return(
    <div className={`relative h-full flex flex-col ${className}`}>
        <div className="h-[300px] overflow-hidden">
            <img src={thumbnail} alt={thumbnail} className="w-full h-full object-cover" />
        </div> 
        <div className="flex flex-row gap-2 items-start text-[.8rem] p-6">
            <h3 className="">{name}</h3>
            <span className="font-bold p-2 border-[1px] dark:text-dark1 border-light2 bg-light2 rounded-xl">{price}{currency}</span>
            <NavLink className="absolute inset-0 z-10" to={id}/>
        </div>
    </div>)
}
export default ProductCard