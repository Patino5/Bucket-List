import React, { useEffect, useState } from "react";
import { getDestinations, getCityImage } from "../api/api";
import { Link, Navigate } from "react-router";
import Loading from "../components/Loading";
import Header from "../components/home/Header";
import DestinationCard from "../components/home/DestinationCard";
import NoDestination from "../components/home/NoDestinations";


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

    const userName = localStorage.getItem("userName")
        ? localStorage.getItem("userName")[0].toUpperCase() +
        localStorage.getItem("userName").slice(1)
        : "User";

    if (loading) return <Loading />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 ">
            <Header userName={userName} />

            {destinations.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {destinations.map((destination) => (
                        <DestinationCard key={destination.destinationID} destination={destination} />
                    ))}
                </div>
            ) : (
                <NoDestination />
            )}
        </div>
    );
};

export default Home;