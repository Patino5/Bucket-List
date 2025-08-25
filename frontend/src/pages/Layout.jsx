import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // clear saved user data
        localStorage.removeItem("userID");
        localStorage.removeItem("userName");
    };

    return (
        <>
            <header className="flex justify-between bg-neutral-300 p-5">
                <h1 className="text-5xl">Travel Bucket</h1>
                <nav>
                    <ul className="flex gap-4">

                        {/* Hide Logout on login page */}
                        {location.pathname !== "/layout/login" && (
                            <>
                                <li>
                                    <Link className="border-1 py-2 px-3 rounded-4xl text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700" to="/layout/home">
                                        Destinations
                                    </Link>
                                </li>
                                <li>
                                    <Link className="border-1 py-2 px-3 rounded-4xl text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700" to="/layout/activitylog">
                                        Memories
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={handleLogout}
                                        className="border-1 py-2 px-3 rounded-4xl text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 cursor-pointer"
                                        to="/layout/login"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>

                        )}
                    </ul>
                </nav>
            </header>

            <Outlet />
        </>
    );
};

export default Layout;
