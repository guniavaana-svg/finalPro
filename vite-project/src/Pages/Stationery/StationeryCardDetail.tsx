import "./Stationery.css"
import type {StationeryDataType} from "../../dataType.ts"
import { useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router";
import { API_URL } from "../../../config.ts";
import { useAppDispatch, useAppSelector } from "../../state/hooks.ts";
import { addFavItem, removeFavItem } from "../../state/StateSlices/favoriteSlice.ts";
import {addItemToCart} from "../../state/StateSlices/cartSlice.ts";
import type { RootState } from "../../state/store.ts";
import { IoCartOutline } from "react-icons/io5"
import { FaTimes } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight, AiOutlineDown} from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function StationeryCardDetail(){
    const{id}=useParams();
    const dispatch=useAppDispatch();
    const favItemId=useAppSelector((state: RootState)=>state.favorite.favItemIdList);
    const [isClicked, setIsClicked] = useState<boolean>(favItemId.includes(Number(id)));
    const [stationeryData, setStationeryData] = useState<StationeryDataType>();
    const [imgSrc, setimgSrc] = useState<string>("");
    const [imgSrcIndex, setimgSrcIndex] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const length: number=stationeryData?.images?.length ?? 0;
    const [section, setSection]=useState<string>("");
    useEffect(() => {
        async function getStationeryData() {
            const response = await fetch(`${API_URL}/stationery/${id}`);
            const data:StationeryDataType = await response.json();
            setStationeryData(data); 
        }
    getStationeryData();
  }, []);
  useEffect(()=>{
    if(isClicked===true){
        dispatch(addFavItem(Number(id)))
    }else{
        dispatch(removeFavItem(Number(id)))
    }
  },[isClicked])
///////////////////////////////////////////////////////
    const validate = Yup.object().shape({
    quantity:Yup.string().required("შეიყვანე რაოდენობა")
  })
    function addToChart(values:{quantity:string}) {
        const productQuantity:number=Number(values.quantity);
        dispatch(addItemToCart({id:Number(id), quantity:productQuantity, price:stationeryData?.price||0}));
    }
///////////////////////////////////////////////////////////
    return(
        <section className="sectionCardDEtail flex gap-2 flex-col md:flex-row">
            {/* //////////img Box///////// */}
            <div className="md:w-3/5 px-5 overflow-hidden">
                <div onClick={()=>setIsOpen(true)} className="h-[60vh] rounded-xl shadow-lg dark:shadow-darkshadow dark:shadow-lg overflow-hidden cursor-pointer">
                    <img className="w-full h-full object-cover" src={imgSrc ||stationeryData?.thumbnail} alt={stationeryData?.name} />
                </div>  
                <div className="flex gap-2 justify-center pt-5">
                    {stationeryData?.images?.map((item,index)=>(
                         <div key={index} onClick={()=>{setimgSrc(item); setimgSrcIndex(index)}} className="max-w-[70px] max-h-[70px] overflow-hidden rounded-xl shadow-lg dark:shadow-darkshadow dark:shadow-lg">
                            <img className="w-full h-full object-cover" src={item} alt={item} />
                        </div>
                    ))}
                </div>
            </div>
            {isOpen && 
            <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-dark1 bg-opacity-50 dark:bg-opacity-80 dark:bg-darkshadow">
                <div className="relative w-11/12  max-w-[90vw] h-[90vh]  rounded-lg shadow-lg dark:shadow-darkshadow  p-8 bg-light1 dark:bg-dark2 flex items-center justify-center">
                    <button onClick={()=>{setimgSrcIndex(prev=>prev>0?prev-1:length-1)}} className="leftBtn -translate-x-1/2 left-0">
                        <AiOutlineLeft className="icon"/>
                    </button>
                    <button onClick={()=>{setimgSrcIndex(prev=>prev<length-1?prev+1:0)}} className="RightBtn translate-x-1/2 right-0">
                        <AiOutlineRight className="icon"/>
                    </button>
                    <button className="xBtn"  onClick={()=>setIsOpen(false)}><FaTimes className="icon"/></button>
                    <div className="w-[85vw] h-[85vh] rounded-lg overflow-hidden">
                        <img className="w-full h-full object-contain" src={stationeryData?.images?.[imgSrcIndex ?? 0] ||stationeryData?.thumbnail} alt={stationeryData?.name} />
                    </div>
                </div>
            </div>
            }
            {/*//////////////// details Box/////////////// */}
            <div className="detailbox md:w-2/5 px-5 flex flex-col gap-3">
                <div className="flex items-start py-2 gap-4">
                    <h2 className="text-xl whitespace-pre-wrap">{stationeryData?.name}</h2>
                    <button className="favIcon icon relative ml-auto" onClick={()=>{
                        isClicked===false?setIsClicked(true):setIsClicked(false)
                    }}>
                        <FaRegHeart className="icon absolute inset-0 fill-btnLight"/>
                    {isClicked && <FaHeart className="icon fill-btnLight absolute inset-0 "/>} 
                    </button>
                </div>
                <span className="btnText uppercase">{stationeryData?.brand}</span>
                <p className="flex items-center justify-start gap-2"><span className="btnText">ფასი:</span><span className="text-btnDark font-extrabold text-xl">{stationeryData?.price}{stationeryData?.currency}</span></p>
               <Formik initialValues={{
                quantity:"1",
               }} validationSchema={validate} onSubmit={addToChart}>
                    <Form  className="flex flex-col gap-3">
                        <div className="btn justify-start bg-light2 hover:shadow-sm hover:shadow-btnLight/60 ">
                            <label className="btnText  mr-auto">რაოდენობა</label>
                            <Field type="number" placeholder="" className="ml-auto inputBtn text-center" name="quantity" min="1" max="999"/>
                            <ErrorMessage name="quantity" component="span" className="error" />
                        </div>
                        <button type="submit" className="btn bg-btnLight dark:bg-btnDark text-light2 hover:shadow-sm hover:shadow-btnLight hover:bg-[#273f87]">
                            <IoCartOutline className="w-[20px] h-[20px]"/>
                            <span className="btnText py-2">კალათაში დამატება</span>
                        </button>
                        
                    </Form>  
               </Formik>
               <div>
                <h3 onClick={()=>{setSection(prev=>prev==="dec"?"":"dec")}}><span className="btnText  mr-auto">აღწერილობა</span> <AiOutlineDown  className={`w-[20px] h-[20px] ${section==="dec" && "rotate-180"} `}/></h3>
                {section==="dec" && <p className="info">{stationeryData?.description}</p>}
                <h3 onClick={()=>setSection(prev=>prev==="size"?"":"size")}><span className="btnText  mr-auto">ზომები</span> <AiOutlineDown  className={`w-[20px] h-[20px] ${section==="size" && "rotate-180"} `}/></h3>
                {section==="size" && stationeryData?.specifications.map((item, index)=>(
                  <ul className="info" key={index}>
                        <li>ზომა: {item.size}</li>
                        <li>ფურცელი: {item.pages}</li>
                        <li>ყდა: {item.cover}</li>
                        <li>{item.ruling}</li>
                        <li>ფერი: {item.color}</li>
                        <li>წონა:{item.paperWeight}</li>
                    </ul>
                ))}
                <h3 onClick={()=>setSection(prev=>prev==="delivery"?"":"delivery")}><span className="btnText  mr-auto">მიწოდების პირობები და ვადები</span> <AiOutlineDown  className={`w-[20px] h-[20px] ${section==="delivery" && "rotate-180"} `}/></h3>
                {section==="delivery" && <p className="info">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id deserunt voluptates fuga explicabo, magnam illum recusandae rem beatae deleniti, laudantium labore, minima vel enim! Veniam, ea voluptatibus. Sequi, error perferendis.</p>}
               </div>
            </div>
        </section>
    )
}
export default StationeryCardDetail;