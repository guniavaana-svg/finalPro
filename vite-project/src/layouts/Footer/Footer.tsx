import Nav from "../../Components/Nav";
import "./Footer.css";
function Footer(){
     return(<>
    <footer className="bg-[#d9e1f9] dark:text-[#b3c3f3]">
        <div className="container">
            <div className="headerSection2 flex flex-col gap-2 items-center justify-center max-w-[1400px] mx-auto p-5">
                <Nav/>
                <div>©copyright bla bla bla</div>
            </div>
        </div>
    </footer>
    </>)
}
export default Footer;