import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Translate", path: "/" },
        { name: "Services", path: "/portfolio" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <header className="shadow-md w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md">
            <nav className="container mx-auto flex justify-between items-center py-3 px-4">

                {/* Brand Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    Al Language Translator
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 font-medium">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                className="hover:text-blue-500 transition duration-300"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden bg-white w-full px-6 py-4 shadow-lg space-y-4">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                className="block text-lg font-medium hover:text-blue-500 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
};

export default Navbar;
