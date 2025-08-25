import React, { useEffect, useState } from "react";
import { getDestinations, getCityImage } from "../api/api";
import { Link, Navigate } from "react-router";
import Loading from "../components/Loading";

const Home = ({ destinations, setDestinations }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        if (!userID) {
            setError("No user logged in");
            setLoading(false);
            return <Navigate to="/" />;
        }

        getDestinations(userID)
            .then(async (data) => {
                const destinationsWithImages = await Promise.all(
                    data.map(async (dest) => {
                        try {
                            const imgUrl = await getCityImage(dest.city);
                            return { ...dest, imageUrl: imgUrl };
                        } catch {
                            return {
                                ...dest,
                                imageUrl: `https://picsum.photos/seed/${encodeURIComponent(
                                    dest.city
                                )}/400/300`,
                            };
                        }
                    })
                );

                setDestinations(destinationsWithImages);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [setDestinations]);

    if (loading) return <Loading />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 bg-gradient-to-b from-blue-100 to-blue-300 ">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                    {`${localStorage.getItem("userName")[0].toUpperCase() +
                        localStorage.getItem("userName").slice(1)}`}’s Destinations
                </h1>
                <Link
                    to="/layout/destinations"
                    className="px-5 py-3 rounded-xl font-medium shadow-md transition-all duration-300 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:scale-105 active:scale-95"
                >
                    ➕ Add Destination
                </Link>
            </div>

            {/* Destination Cards */}
            {destinations.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {destinations.map((d) => (
                        <div
                            key={d.destinationID}
                            className="group bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
                        >
                            <img
                                src={d.imageUrl}
                                alt={`Picture of ${d.city}, ${d.country}`}
                                className="h-56 w-full object-cover transition-transform duration-500"
                            />
                            <div className="p-6 space-y-3">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {d.city}, {d.country}
                                </h2>
                                {d.homeDeparture ? (
                                    <>
                                        <p className="text-gray-600 text-sm">
                                            🛫 Home Departure:{" "}
                                            {new Date(d.homeDeparture).toLocaleString()}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            🛬 Destination Departure:{" "}
                                            {new Date(d.destinationDeparture).toLocaleString()}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-gray-500 italic">No flights scheduled</p>
                                )}
                                <Link
                                    to={`/layout/home/destination/${d.destinationID}`}
                                    className="inline-block mt-4 px-4 py-2 rounded-xl font-medium shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-20">
                    <p className="text-lg text-gray-600 mb-6">
                        Add a Destination to your bucket list!
                    </p>
                    <Link
                        to="/layout/destinations"
                        className="px-6 py-3 rounded-xl font-medium shadow-md transition-all duration-300 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:scale-105 active:scale-95"
                    >
                        ➕ Add Destination
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Home;
