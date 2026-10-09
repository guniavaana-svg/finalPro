import type { RootState } from "../state/store.ts";
import { CiHeart } from "react-icons/ci";
import { useAppSelector, useAppDispatch } from "../state/hooks.ts";
import { removeFavItem, clearAllFavItems } from "../state/StateSlices/favoriteSlice.ts";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { API_URL } from "../../config.ts";
import type { StationeryDataType } from "../dataType.ts";
import ProductCard from "./ProductCard.tsx";
function Favorite(){
    // const {FavId}=useContext(FavoriteContext)
    // console.log(FavListId, FavId)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const favItemsId=useAppSelector((state: RootState)=>state.favorite.favItemIdList);
    const dispatch=useAppDispatch();
    const [favItemData,setFavItemData]=useState<StationeryDataType[]>([]);
    const queryParams:string = favItemsId.map(id =>`id=${id}`).join("&");
     useEffect(()=>{
        if (favItemsId.length==0){
            setFavItemData([])
            return;
        }
        async function getProductsData(){
          const rec=await fetch(`${API_URL}/stationery?${queryParams}`)
          const productData=await rec.json()
          setFavItemData(productData)
        }
        getProductsData()
      },[favItemsId])
    return(
    <>
        <button onClick={()=>setIsOpen(true)} className="border-none flex gab-2 justify-center items-center bg-light3 p-1 rounded-xl text-sm">
            <CiHeart className="w-[20px]  h-[20px] text-btnLight dark:text-btnDark"/>
            <span className="font-mtavruli translate-y-[2px] sm:flex hidden dark:text-dark2">რჩეულები</span>
        </button>
          {isOpen && 
        <div onClick={()=>setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-end bg-dark1 bg-opacity-50 dark:bg-opacity-80 dark:bg-darkshadow">
            <div  onClick={(e) => e.stopPropagation()} className="relative max-w-[45vw] h-full shadow-lg dark:shadow-darkshadow bg-light1 dark:bg-dark2 p-2 flex flex-col justify-start">
                <button className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2  text-btnLight dark:text-light2 text-xl"  onClick={()=>setIsOpen(false)}><FaTimes className=""/></button>
                <div className="bg-light1 dark:bg-dark2  text-btnLight dark:text-light2 flex flex-col gap-2 pt-6">
                    <h2 className="translate-y-[px] font-mtavruli text-xl">თქვენი რჩეული პროდუქტი</h2>
                    <span className="text-sm">{`${favItemData.length} ერთეული`}</span>
                </div>
                <div className="favList overflow-y-scroll scrollbar-thin scrollbar-thumb-light2 hover:scrollbar-thumb-btnDark scrollbar-track-light1 h-[80vh] gap-2 flex flex-col items-start justify-start shrink-0 mb-3 py-3">
                    {favItemData.map((item)=>(
                         <div className="favItem flex-none relative max-w-[300px] rounded-xl shadow-lg dark:shadow-darkshadow dark:shadow-lg overflow-hidden" key={item.id}>
                            <ProductCard  className="" id={`${item.id}`} name={item.name} price={item.price} currency={item.currency} thumbnail={item.thumbnail}/>
                            <button className="absolute z-20 top-0 right-0 m-2 p-1 hover:bg-light2 rounded-lg hover:duration-500" onClick={()=>dispatch(removeFavItem(item.id))}><FaTimes className="w-[20px] h-[20px] text-btnDark opacity-60 "/></button>
                         </div>
                         ))
                    } 
                </div>
                <button className="leading-none flex items-center p-3 h-[20px] text-btnLight bg-light2 rounded-lg ml-auto" onClick={()=>{dispatch(clearAllFavItems()); setFavItemData([])}}><span className="translate-y-[2px] font-mtavruli ">ყველას წაშლა</span></button>
            </div>
        </div>
        }
    </>)
}
export default Favorite;