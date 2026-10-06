import "./TwoColLayout.css";

interface TwoColPropsType{
    id?:string;
    title?:string;
    description?:string;
    img?:string;
    className?:string;
}
function TwoCol(props:TwoColPropsType){
    const {title, description, img, className, id}=props
    return(<>
        <div className={`flex flex-row items-stretch max-w-[50%] max-h-[50%] ${className}`}>
      <div className="flex flex-col items-start max-w-full flex-1 text-[1.6rem] p-6">
        <h3 className="font-bold uppercase mb-8">{title}</h3>
        <p>{description}</p>
      </div>
      <div className="max-w-full flex-1">
        <img src={img} alt={img} className="w-full h-full object-cover" />
      </div>
    </div>
    </>)
}
export default TwoCol;