import "./Stationery.css"
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import ProductCard from "../../Components/ProductCard.tsx"
import type {StationeryDataType} from "../../dataType.ts"
import { CiHeart } from "react-icons/ci";
// import  { FavoriteContext, useFavorite } from "../../FavoriteContext.tsx";
import { useParams } from "react-router";
import type { RootState } from "../../state/store.ts";
import { useAppSelector, useAppDispatch } from "../../state/hooks.ts";
import {addFavItem, removeFavItem} from "../../state/StateSlices/favoriteSlice.ts";
import { FaHeart, FaRegHeart } from "react-icons/fa";


function Stationery(){
  const favItemId=useAppSelector((state: RootState)=>state.favorite.favItemIdList);
  const dispatch=useAppDispatch();
  const[productData,setProductData]=useState<StationeryDataType[]>([])

  useEffect(()=>{
    async function getProductsData(){
      const rec=await fetch(`${API_URL}/stationery`)
      const productData=await rec.json()
      setProductData(productData)
    }
    getProductsData()
  },[])
  function toggleFavItem(id:number):void{
    if(favItemId.includes(id)){
      dispatch(removeFavItem(id))
    }else{
      dispatch(addFavItem(id))
    }
  }
  return(
    <div className="productSection">
      <div className="heading"></div>
      <div className="products flex flex-wrap gap-4  justify-around  ">
        {productData.map((item)=>(
          <div className="relative productItem max-w-[300px] rounded-xl shadow-lg dark:shadow-darkshadow dark:shadow-lg overflow-hidden " key={item.id}>
            <ProductCard  className="" id={`${item.id}`} name={item.name} price={item.price} currency={item.currency} thumbnail={item.thumbnail}/>
             <button onClick={()=>toggleFavItem(Number(item.id))} className="favIcon absolute z-20 ">
                <CiHeart className="icon text-btnLight"/>
                {/* <FaRegHeart className="icon fill-btnLight"/> */}
                {favItemId.includes(Number(item.id)) && <FaHeart className="icon absolute inset-0 fill-btnLight "/>} 
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Stationery;
