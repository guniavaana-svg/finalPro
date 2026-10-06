import "./Nav.css"
import { NavLink} from "react-router-dom";
import { API_URL } from "../../config";
import { useEffect, useState } from "react";

interface MenuChildrenType {
    id: number;
    path: string;
    name: string;
}

interface Menu {
    id: number;
    path: string;
    name: string;
    children: MenuChildrenType[];
}

function Nav() {
    const [menuData, setMenu] = useState<Menu[]>([]);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    useEffect(() => {
        async function getMenu() {
            try {
                const response = await fetch(`${API_URL}/menu`);
                const menuData: Menu[] = await response.json();
                setMenu(menuData);
            } catch (e) {
                console.error(e);
            }
        } 
        getMenu();
    }, []);

    return (
        <nav className="">
            <ul className="flex gap-3 p-3">
               {menuData?.map(item => (
                    <li 
                        onMouseEnter={() => setHoveredId(item.id)} 
                        onMouseLeave={() => setHoveredId(null)} 
                        key={item.id}
                        className="relative"
                    >
                        <NavLink to={item.path} end>{item.name}</NavLink>
                        
                        {hoveredId === item.id && item.children && item.children.length > 0 && (
                            <ul className="navChildren absolute top-full left-0">
                                {item.children.map(el => (
                                    <li key={el.id}>
                                        <NavLink to={el.path} end>{el.name}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))} 
            </ul>
        </nav>
    );
}

export default Nav;