// import "./Tours.css";
// import { API_URL } from "../../../config";
// import { useEffect, useState } from "react";
// import { useParams} from "react-router";
// import type  { ArticleDataType} from "./dataType";
// import CardDetail from "../../Components/CardDetail";

// function ToursDet() {
//   const [articleData, setArticleData] = useState<ArticleDataType>();
// const{id}=useParams();
//   useEffect(() => {
//     async function getArticleData() {
//       const response = await fetch(`${API_URL}/articles/${id}`);
//       const data:ArticleDataType = await response.json();
//        setArticleData(data);
//     }
//     getArticleData();

//   }, []);
 
//   return (
//     <>
//     {<CardDetail title={articleData?.title} description={articleData?.description} images={articleData?.images} subtitles={articleData?.subtitles} mainImage={articleData?.mainImage} />}
//     </>
//   );
// }

// export default ToursDet;