import './styles.css';

import { TbShovel } from "react-icons/tb";

export default function Navbar() {
    return (
        <nav className="border-b border-gray-200 dark:border-gray-700">
            <span className="font-bold flex flex-row items-center brand">
                <a href="/" className="brand-name">WikiSpelunk</a>
                <TbShovel className="ml-1 brand-icon" />
            </span>
        </nav>
    );
};