import "./Nav.css";
import { NavLink } from "react-router-dom";
import { API_URL } from "../../config";
import { useEffect, useState } from "react";

interface Menu {
    id: number;
    path: string;
    name: string;
}

function Nav() {
    const [menuData, setMenu] = useState<Menu[]>([]);

    useEffect(() => {
        async function getMenu() {
            try {
                const response = await fetch(`${API_URL}/menu`);

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data: Menu[] = await response.json();

                console.log("MENU:", data);

                setMenu(data);
            } catch (error) {
                console.error("Menu fetch error:", error);
            }
        }

        getMenu();
    }, []);

    return (
        <nav>
            <ul className="flex gap-3 p-3">
                {menuData.map((item) => (
                    <li key={item.id}>
                        <NavLink to={`/${item.path}`} end>
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Nav;
