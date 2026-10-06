import "./Cart.css"
import { useEffect, useState } from "react";
import type { StationeryDataType } from "../dataType";
import { API_URL } from "../../config";
import { useAppSelector, useAppDispatch } from "../state/hooks.ts";
import {addItemToCart, removeItemFromCart,clearAllCartItems} from "../state/StateSlices/cartSlice.ts";
import type { RootState } from "../state/store.ts";
import { BsPlus } from "react-icons/bs";
import { BsDash } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { BsBasket2Fill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

function Cart(){
    const dispatch=useAppDispatch();
    const cartItemsId=useAppSelector((state:RootState)=>state.cart.CartItemsIdList);
    const [isOpen, setIsOpen]=useState<boolean>(false);
    const [cartItemsData, setCartItemsData]=useState<StationeryDataType[]>([]);
    const queryParams:string=cartItemsId.map(item=>`id=${item.id}`).join("&");
    const sumPrice:number=Number(cartItemsId.reduce((sum,item)=>{
        return sum+item.quantity*item.price
    },0).toFixed(2))
    const sumQuantity:number=cartItemsId.reduce((sum,item)=>{
        return sum+item.quantity
    },0)
    // console.log(sumPrice,sumQuantity)
    useEffect(()=>{
        if(cartItemsId.length==0){
            setCartItemsData([])
            return;
        }
        async function getCartItemsData(){
            const rec=await fetch(`${API_URL}/stationery?${queryParams}`)
            const cartItemsData=await rec.json()
            setCartItemsData(cartItemsData)
            // console.log(cartItemsData)
        }
        getCartItemsData()
    },[cartItemsId])
    ////////////////////////////////////////////////
    function changeQuantity(ItemId:number, itemPrice:number,change:string):number{
        let ItemQty=cartItemsId.find(item=>item.id===ItemId)?.quantity||0
        if(change==="decrease" && ItemQty>1){
            ItemQty-=1
        }
        if(change==="increase" && ItemQty<200){
            ItemQty+=1
        }
        dispatch(addItemToCart({id:ItemId,quantity:ItemQty,price:itemPrice}))
        return ItemQty*itemPrice
    }
    return(
        <>
            <button onClick={()=>{setIsOpen(true)}} className="text-sm border-none flex gab-2 justify-center items-center bg-light3 p-1 rounded-xl gap-1">
                <BsBasket2Fill className="text-btnLight dark:text-btnDark"/>
                <span className="font-mtavruli translate-y-[2px]">კალათა</span>
            </button>
            {isOpen && <div onClick={()=>setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-end bg-dark1 bg-opacity-50 dark:bg-opacity-80 dark:bg-darkshadow">
                <div  onClick={(e) => e.stopPropagation()} className="relative  h-full shadow-lg dark:shadow-darkshadow bg-light1 dark:bg-dark2 p-2 flex flex-col justify-start">
                    <button className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2  text-btnLight dark:text-light2 text-xl"  onClick={()=>setIsOpen(false)}><FaTimes className=""/></button>
                    <div className="favList overflow-y-scroll scrollbar-thin scrollbar-thumb-light2 hover:scrollbar-thumb-btnDark scrollbar-track-light1 max-h-[80vh] gap-2 flex flex-col items-start justify-start shrink-0 mb-3 py-3">
                        <table className="cartTable">
                            <caption className="translate-y-[px] font-mtavruli text-xl text-left pb-6">თქვენი კალათა</caption>
                            <thead className="cartTableHead">
                                <tr>
                                    <th colSpan={2} className="!text-left">ერთეული</th>
                                    <th>რაოდენობა</th>
                                    <th>ერთეულის ფასი</th>
                                    <th>ჯამური ფასი</th>
                                    <th>ამოშლა</th>
                                </tr>
                            </thead>
                            <tbody className="cartTibleBody">
                                {cartItemsData.map(item=>(
                                    <tr className="" key={item.id}>
                                        <td> <div className="overflow-hidden w-[100px] h-[100px]"><img className="w-full h-full" src={item.thumbnail} alt={item.name} /></div></td>
                                        <td className="!text-left">{item.name}</td>
                                        <td>
                                            <div className="flex items-center justify-center gap-3">
                                                <button className="btnDown" onClick={()=>changeQuantity(item.id,item.price,"decrease")}><BsDash/></button>
                                                <span>{cartItemsId.find(el => el.id === item.id)?.quantity ?? 0}</span>
                                                <button className="btnUp" onClick={()=>changeQuantity(item.id,item.price, "increase")}><BsPlus/></button>
                                            </div>
                                        </td>
                                        <td>{item.price}{item.currency}</td>
                                        <td>{(item.price*(cartItemsId.find(el => el.id === item.id)?.quantity ?? 0)).toFixed(2)}{item.currency}</td>
                                        <td><button onClick={()=>{dispatch(removeItemFromCart({id:Number(item.id), quantity:0, price:0}))}} className="hover:bg-light2 rounded-lg hover:duration-500" ><BsTrash3 className="text-btnDark"/></button></td>
                                    </tr>
                                ))
                                }
                                <tr>
                                    <th colSpan={3} className="text-xs !text-left font-thin">{`${sumQuantity} ერთეული`}</th>
                                    <th colSpan={3} className="text-xs !text-right font-thin">{`ჯამური თანხა: ${sumPrice}`}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex">
                        <button className="cartBtn" onClick={()=>{dispatch(clearAllCartItems()),setCartItemsData([])}}><span>ყველას წაშლა</span></button>
                        <button className="cartBtn ml-auto"><span>შეძენა</span></button>
                    </div>
                  
                </div>
            </div>
            }
        </>
    ) 
}
export default Cart;