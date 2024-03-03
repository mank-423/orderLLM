import { useState } from 'react';
import { AlignJustify, X } from 'react-feather';
import logo from '../assets/Images/logoCircle.png';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="bg-gradient-to-br from-[#161616] to-[#3A3A3A]  p-4">
            <div className="flex items-center justify-between">
                <div className="text-white text-xl font-bold">
                    <img src={logo} className='h-12 w-12' alt="" />
                </div>

                {/* Hamburger icon for mobile */}
                <div className="lg:hidden">
                    {isMenuOpen ? (
                        <X
                            className="text-white cursor-pointer transition-transform transform hover:scale-110"
                            size={32}
                            onClick={toggleMenu}
                        />
                    ) : (
                        <AlignJustify
                            className="text-white cursor-pointer transition-transform transform hover:scale-110"
                            size={32}
                            onClick={toggleMenu}
                        />
                    )}
                </div>

                {/* Menu items for larger screens */}
                {/* <div className="hidden lg:flex flex-grow justify-center text-lg space-x-32 font-bold">
                    <a href="#" className="text-white">
                        Home
                    </a>
                    <a href="#" className="text-white">
                        About
                    </a>
                    <a href="#" className="text-white">
                        Services
                    </a>
                </div> */}

                {/* Button for larger screens */}
                <div className="hidden lg:flex">
                    <button
                        className="bg-[#F27B35] text-white py-4 px-8 rounded-lg transition duration-300 hover:bg-[#F27B35]/80 focus:outline-none font-bold text-lg" 
                        onClick={() => { navigate(location.pathname === '/auth' ? '/' : '/auth') }}
                    >
                        {location.pathname === '/auth' ? 'Home' : 'Demo'}
                    </button>
                </div>
            </div>

            {/* Responsive menu for mobile screens */}
            {isMenuOpen && (
                <div className="lg:hidden mt-4 transition-opacity duration-300 opacity-100 font-bold">
                    {/* <a href="#" className="block text-white font-bold py-2">
                        Home
                    </a>
                    <a href="#" className="block text-white py-2">
                        About
                    </a>
                    <a href="#" className="block text-white py-2">
                        Services
                    </a> */}
                    
                    {/* Button for mobile screens */}
                    <button
                        className="bg-[#F27B35] text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-[#F27B35]/80 focus:outline-none"
                        onClick={() => { navigate(location.pathname === '/auth' ? '/' : '/auth') }}
                    >
                        {location.pathname === '/auth' ? 'Home' : 'Demo'}
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
