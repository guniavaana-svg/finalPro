import { NavLink } from "react-router";
import "./Footer.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";

interface Menu {
    id: number;
    path: string;
    name: string;
}

function Footer() {
    const [menuData, setMenu] = useState<Menu[]>([]);

    useEffect(() => {
        async function getMenu() {
            try {
                const response = await fetch(`${API_URL}/menu`);

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data: Menu[] = await response.json();

                setMenu(data);
            } catch (error) {
                console.error("Menu fetch error:", error);
            }
        }

        getMenu();
    }, []);

    return (
        <footer className=" bg-[#d9e1f9] dark:text-[#b3c3f3] dark:bg-[#070b17] dark:shadow-darkshadow right-0 left-0;">
            <div className="container mx-auto">
                <div className="flex items-center flex-col justify-between gap-6 p-5">
                    <div className="logo">
                        <div className="logoIcon h-16 w-16">
                            <img
                                src="/faicon.png"
                                alt="logo"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>
                    <ul className="flex flex-wrap items-center justify-center gap-4 p-4 sm:gap-6">
                        {menuData.map((item) => (
                            <li key={item.id}>
                                <NavLink
                                    to={item.path}
                                    end
                                    className={({ isActive }) =>
                                        `relative py-2 text-base font-medium transition-all duration-300 sm:text-lg
                                        after:absolute after:bottom-0 after:left-0 after:h-[2px]
                                        after:bg-blue-500 after:transition-all after:duration-300
                                        ${
                                            isActive
                                                ? "text-blue-500 after:w-full"
                                                : "text-dark2 dark:text-light3 after:w-0 hover:text-blue-500 hover:after:w-full"
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <span>©copyright {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;