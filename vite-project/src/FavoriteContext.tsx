// import { createContext, useContext, useEffect, useState } from "react";
// interface AppContextType{
//   quantity: number;
//   setQuantity: React.Dispatch<React.SetStateAction<number>>;
// };

// export const FavoriteContext = createContext<AppContextType|null>(null);
// export default function FavoriteProvider({children}){
//  const [FavId, setFavId]=useState<number>()
//   const [FavListId, setFavListId]=useState<number[]>localStorage.getItem("FavListId")||[])
//      useEffect(()=>{
//          if (FavId==undefined) return;
//          localStorage.setItem("FavListId",JSON.stringify(FavListId))
//          setFavListId(prev=>(FavListId.includes(FavId)?prev:[...prev,FavId]))
//          console.log(FavListId, JSON.stringify(localStorage.getItem("FavListId")))
//      },[FavId,FavListId])

//   return(
//     <FavoriteContext.Provider value={{setFavId, FavId}}>
//       {children}
//     </FavoriteContext.Provider>
//   )
// }

// export function useFavorite(){
//   return useContext(FavoriteContext)
// }
