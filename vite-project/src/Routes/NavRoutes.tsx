import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout/Layout.tsx";
import Contact from "../Pages/Contact/Contact.tsx";
import Home from "../Pages/Home/Home.tsx";
import Registration from "../Pages/Registration/Registration.tsx"
import LogIn from "../Pages/LogIn/LogIn.tsx";
import UserPage from "../Dashboard/pages/UserPage/UserPage.tsx";
import DashLayout from "../Dashboard/DashLayout.tsx";
import Dashboard from "../Dashboard/Dashbard.tsx";
import PassChange from "../Dashboard/PassChange.tsx";
import StationeryCardDetail from "../Pages/Stationery/StationeryCardDetail.tsx";
import Stationery from "../Pages/Stationery/Stationery.tsx";
import { useAppSelector } from "../state/hooks.ts";

function NavRoutes(){
     const isAuth = useAppSelector((state) => state.isauth.isAuth)
    return(
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="Stationery" element={<Stationery/>} />
                <Route path="Stationery/:id" element={<StationeryCardDetail/>} />
                <Route path="Diaries&plenners" element={<h2>წიგნაკები და დღიურები</h2>} />
                <Route path="giftcards" element={<h2>სასაჩუქრე ბარათები</h2>}/>
                <Route path="books" element={<h2>წიგნები</h2>}/>
                <Route path="journals" element={<h2>ჟურნალ გაზეთები</h2>}/>
                <Route path="printing" element={<h2>სურათების,მაისურებზე,ჭიქებზე</h2>}/>
                <Route path="delivery" element={<h2>მიწოდების სეწვისები</h2>}/>
                <Route path="contact" element={<Contact/>}/>
                <Route path="registration" element={<Registration/>}/>
                <Route path="login" element={<LogIn/>}/>
            </Route>
            <Route path="/desh" element={isAuth?<DashLayout />:"/"} >
                <Route index element={<Dashboard/>}/>
                <Route path="user" index element={<UserPage/>}/>
                <Route path="pass" index element={<PassChange/>}/>
            </Route>
            <Route path="*" element={<h1>404error</h1>}/>
        </Routes>
    )
}
export default NavRoutes;