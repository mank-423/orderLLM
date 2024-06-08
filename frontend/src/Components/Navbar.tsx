import { useState } from 'react';
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
        <nav className="xl:fixed lg:fixed md:fixed top-0 left-0 w-full bg-gradient-to-br from-[#161616] to-[#3A3A3A] p-4 z-50">
            <div className="flex items-center justify-between">
                <div className="text-white text-xl font-bold">
                    <img src={logo} className='h-12 w-12' alt="" />
                </div>

                {/* Hamburger icon for mobile */}
                <div className="lg:hidden">
                    <button className="text-white cursor-pointer transition-transform transform hover:scale-110" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Menu items for larger screens */}
                <div className="hidden lg:flex">
                    <button
                        className="bg-[#F27B35] text-white py-4 px-8 rounded-lg transition duration-300 hover:bg-[#F27B35]/80 focus:outline-none font-bold text-lg custom-border-value"
                        onClick={() => { navigate(location.pathname === '/auth' ? '/' : '/auth') }}
                    >
                        {location.pathname === '/auth' ? 'Home' : 'Get Started'}
                    </button>
                </div>
            </div>

            {/* Responsive menu for mobile screens */}
            {isMenuOpen && (
                <div className="lg:hidden mt-4 transition-opacity duration-300 opacity-100 font-bold">
                    <button
                        className="bg-[#F27B35] text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-[#F27B35]/80 focus:outline-none"
                        onClick={() => { navigate(location.pathname === '/auth' ? '/' : '/auth') }}
                    >
                        {location.pathname === '/auth' ? 'Home' : 'Get Started'}
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
