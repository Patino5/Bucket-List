import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // clear saved user data
        localStorage.removeItem("userID");
        localStorage.removeItem("userName");

        navigate("/layout/login"); // redirect after logout
    };

    return (
        <>
            <header className="flex justify-between bg-neutral-300 p-5">
                <h1 className="text-5xl">Travel Bucket</h1>
                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <button className="border-1 py-1 px-2 rounded-4xl text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700"><Link to="/layout/home">Home</Link></button>
                        </li>
                        <li>
                            <button className="border-1 py-1 px-2 rounded-4xl text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700"><Link to="/layout/destinations">AddDestination</Link></button>
                        </li>
                        <li>
                            <button className="border-1 py-1 px-2 rounded-4xl text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700"><Link to="/layout/activitylog">ActivityLog</Link></button>
                        </li>
                        {/* Hide Logout on login page */}
                        {location.pathname !== "/layout/login" && (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="border-1 py-1 px-2 rounded-4xl text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>

            <Outlet />
        </>
    );
};

export default Layout;
