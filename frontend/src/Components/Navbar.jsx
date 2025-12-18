import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true); // Default to dark

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Translate", path: "/" },
        { name: "History", path: "#" },
        { name: "Saved", path: "#" },
        { name: "About", path: "#" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-white/80 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 shadow-sm">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">

                {/* Brand Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide text-slate-800 dark:text-slate-100 drop-shadow-sm">
                    AI Translator
                </Link>

                <div className="flex items-center gap-6">
                    {/* Desktop Menu */}
                    <ul className="hidden md:flex gap-8 font-medium text-slate-600 dark:text-slate-300">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 relative group"
                                >
                                    {link.name}
                                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-yellow-400"
                        title="Toggle Theme"
                    >
                        {darkMode ? <Sun size={24} /> : <Moon size={24} className="text-slate-600" />}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-slate-700 dark:text-slate-200"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 w-full absolute top-full left-0 shadow-lg">
                    <ul className="flex flex-col p-6 space-y-4 text-center">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className="block text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
