import { Outlet, Link, useLocation } from "react-router";

const Layout = () => {
    const location = useLocation();

    return (
        <>
            <header className="flex justify-between bg-neutral-300 p-5">
                <h1 className="text-5xl">Travel Bucket</h1>
                <nav className="">
                    <ul className="flex gap-5">
                        <li>
                            <Link to="/layout/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/layout/destinations">Add Destination</Link>
                        </li>
                        <li>
                            <Link to="/layout/activitylog">Activity Log</Link>
                        </li>
                        <li>
                            {location.pathname !== "/layout/login" && (
                                <Link to="/layout/login">Logout</Link>
                            )}

                        </li>
                    </ul>
                </nav>
            </header>


            <Outlet />
        </>
    )
}

export default Layout;