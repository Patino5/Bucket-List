import { Link } from "react-router";

const DestinationCard = ({ destination }) => {
    const { destinationID, imageUrl, city, country, homeDeparture, destinationDeparture } = destination;

    return (
        <div
            key={destinationID}
            className="group bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
        >
            <img
                src={imageUrl}
                alt={`Picture of ${city}, ${country}`}
                className="h-56 w-full object-cover transition-transform duration-500"
            />
            <div className="p-6 space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">
                    {city}, {country}
                </h2>
                {homeDeparture ? (
                    <>
                        <p className="text-gray-600 text-sm">
                            🛫 Home Departure:{" "}
                            {new Date(homeDeparture).toLocaleString()}
                        </p>
                        <p className="text-gray-600 text-sm">
                            🛬 Destination Departure:{" "}
                            {new Date(destinationDeparture).toLocaleString()}
                        </p>
                    </>
                ) : (
                    <p className="text-gray-500 italic">No flights scheduled</p>
                )}
                <Link
                    to={`/layout/home/destination/${destinationID}`}
                    className="inline-block mt-4 px-4 py-2 rounded-xl font-medium shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    View Details →
                </Link>
            </div>
        </div>
    );
};

export default DestinationCard;