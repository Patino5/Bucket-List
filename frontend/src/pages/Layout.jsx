import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        // clear saved user data
        localStorage.removeItem("userID");
        localStorage.removeItem("userName");
        setIsMobileMenuOpen(false); // Close mobile menu after logout
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200/50 shadow-sm">
                <div className=" mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex flex-col">
                                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                                    Travel
                                </h1>
                                <span className="text-2xl lg:text-3lx font-semibold text-gray-700 -mt-1">
                                    Bucket List
                                </span>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:block">
                            <ul className="flex items-center space-x-2">
                                {/* Hide navigation items on login page */}
                                {location.pathname !== "/layout/login" && (
                                    <>
                                        <li>
                                            <Link
                                                className="group relative px-4 py-2 text-lg font-medium text-gray-700 rounded-xl transition-all duration-300 hover:text-white hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 active:scale-95"
                                                to="/layout/home"
                                            >
                                                <span className="relative z-10">Destinations</span>
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="group relative px-4 py-2 text-lg font-medium text-gray-700 rounded-xl transition-all duration-300 hover:text-white hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 active:scale-95"
                                                to="/layout/activitylog"
                                            >
                                                <span className="relative z-10">Memories</span>
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="group relative px-4 py-2 text-lg font-medium text-gray-700 rounded-xl transition-all duration-300 hover:text-white hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 active:scale-95"
                                                to="/layout/profile"
                                            >
                                                <span className="relative z-10">Profile</span>
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                onClick={handleLogout}
                                                className="group relative px-4 py-2 text-lg font-medium text-gray-700 rounded-xl transition-all duration-300 hover:text-white hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 active:scale-95 cursor-pointer"
                                                to="/layout/login"
                                            >
                                                <span className="relative z-10">Logout</span>
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            {location.pathname !== "/layout/login" && (
                                <button
                                    onClick={toggleMobileMenu}
                                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                                    aria-label="Toggle mobile menu"
                                >
                                    <svg
                                        className={`w-6 h-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {isMobileMenuOpen ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && location.pathname !== "/layout/login" && (
                        <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
                            <div className="px-6 py-4 space-y-3">
                                <Link
                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-purple-600/10 hover:text-purple-600"
                                    to="/layout/home"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="text-xl">🌍</span>
                                    <span className="font-medium">Destinations</span>
                                </Link>
                                <Link
                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-600/10 hover:text-blue-600"
                                    to="/layout/activitylog"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="text-xl">📸</span>
                                    <span className="font-medium">Memories</span>
                                </Link>
                                <Link
                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500/10 hover:to-green-600/10 hover:text-green-600"
                                    to="/layout/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="text-xl">👤</span>
                                    <span className="font-medium">Profile</span>


                                </Link>
                                <Link
                                    onClick={handleLogout}
                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/10 hover:text-red-600 cursor-pointer"
                                    to="/layout/login"
                                >
                                    <span className="text-xl">🚪</span>
                                    <span className="font-medium">Logout</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;