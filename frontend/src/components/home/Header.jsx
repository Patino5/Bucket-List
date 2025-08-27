import { Link } from "react-router";

const Header = ({ userName }) => {
    return (
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                {userName}'s Destinations
            </h1>
            <Link
                to="/layout/destinations"
                className="px-5 py-3 rounded-xl font-medium shadow-md transition-all duration-300 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:scale-105 active:scale-95"
            >
                ➕ Add Destination
            </Link>
        </div>
    );
};

export default Header;