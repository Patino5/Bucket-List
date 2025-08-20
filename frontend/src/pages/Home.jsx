import React, { useEffect, useState } from "react";
import { getDestinations, getCityImage } from "./api";
import { Link, Navigate } from "react-router";
import SplashScreen from "./Splash";

const Home = ({ destinations, setDestinations }) => {
    const [destination, setDestination] = useState([]);
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
                // Attach image URLs directly to each destination
                const destinationsWithImages = await Promise.all(
                    data.map(async (dest) => {
                        try {
                            const imgUrl = await getCityImage(dest.city);
                            return { ...dest, imageUrl: imgUrl };
                        } catch {
                            return {
                                ...dest,
                                imageUrl: `https://picsum.photos/seed/${encodeURIComponent(dest.city)}/200`,
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

    if (loading) return <SplashScreen />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">
                {`${localStorage.getItem("userName")[0].toUpperCase() + localStorage.getItem("userName").slice(1)}`}’s Destinations
            </h1>

            {destinations.length > 0 ? (
                destinations.map((d) => (
                    <div
                        key={d.destinationID}
                        className="space-y-2 grid md:grid-cols-2 md:gap-2 bg-neutral-200 shadow-2xl text-center md:text-left rounded py-7 mb-10"
                    >
                        <img
                            className="mx-auto block h-50 w-70 shadow-lg rounded-full md:mx-0 md:shrink-0 md:h-90 md:w-120"
                            src={d.imageUrl}
                            alt={`Picture of ${d.city}, ${d.country}`}
                        />

                        <div className="space-y-0.5 m-auto content-center">
                            <p className="text-2xl font-semibold text-black">
                                {d.city}, {d.country}
                            </p>
                            {d.homeDeparture === null ? (
                                <p className="font-medium text-gray-500">
                                    No flights scheduled
                                </p>
                            ) : (
                                <>
                                    <p className="font-medium text-gray-500">
                                        Home departure:{" "}
                                        {new Date(d.homeDeparture).toLocaleString()}
                                    </p>
                                    <p className="font-medium text-gray-500">
                                        Destination departure:{" "}
                                        {new Date(d.destinationDeparture).toLocaleString()}
                                    </p>
                                </>
                            )}
                            <div className="my-5">
                                <Link
                            to={`/layout/home/destination/${d.destinationID}`}
                            className="border-1 py-1 px-2 rounded-4xl text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700"
                        >
                            View Details
                        </Link>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                ))
            ) : (
                <>
                    <p>Add a Destination to your bucket list!</p>
                    <Link to="/layout/destinations">Add Destination</Link>
                </>
            )}
        </div>
    );
};

export default Home;