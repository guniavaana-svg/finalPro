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

                // console.log("MENU:", data);

                setMenu(data);
            } catch (error) {
                console.error("Menu fetch error:", error);
            }
        }

        getMenu();
    }, []);

    return (
       <nav>
    <ul className="flex gap-6 p-4">
        {menuData.map((item) => (
            <li key={item.id}>
                <NavLink
                    to={item.path}
                    end
                    className={({ isActive }) =>
                        `relative py-2 text-lg font-medium transition-all duration-300
                        after:absolute after:bottom-0 after:left-0 after:h-[2px]
                        after:bg-blue-500 after:transition-all after:duration-300
                        ${
                            isActive
                                ? "text-blue-500 after:w-full"
                                : "text-gray-700 after:w-0 hover:text-blue-500 hover:after:w-full"
                        }`
                    }
                >
                    {item.name}
                </NavLink>
            </li>
        ))}
    </ul>
</nav>
    );
}

export default Nav;
