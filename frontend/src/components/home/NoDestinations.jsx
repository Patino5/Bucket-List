import { Link } from "react-router"

const NoDestination = () => {
    return (
        <div className="text-center mt-20">
            <p className="text-lg text-gray-600 mb-6">
                Add a Destination to your bucket list!
            </p>
            <Link to="/layout/destinations" className="px-6 py-3 rounded-xl font-medium shadow-md transition-all duration-300 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:scale-105 active:scale-95">
                ➕ Add Destination
            </Link>
        </div>
    )
}

export default NoDestination;