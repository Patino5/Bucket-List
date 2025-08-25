import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getActivities, deleteDestination, deleteActivity } from "./api";
import Loading from "../components/Loading";

const DestinationDetails = ({ destinations, setDestinations }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const destination = destinations.find(
        ({ destinationID }) => destinationID === parseInt(id, 10)
    );

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // modal state
    const [showDeleteDestModal, setShowDeleteDestModal] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("No destination found.");
            setLoading(false);
            return;
        }

        getActivities(id)
            .then((data) => {
                setActivities(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id, destination]);

    if (loading) return <Loading />
    if (error) return <p className="text-red-500">{error}</p>;
    if (!destination) return <p>Destination not found</p>;

    // ---- handlers ----
    const handleEditDestination = () => {
        navigate(`/layout/home/destination/${id}/edit`);
    };

    const handleDeleteDestination = async () => {
        try {
            await deleteDestination(id);
            navigate("/layout/home");
        } catch (err) {
            alert("Error deleting destination: " + err.message);
        }
    };

    const handleAddActivity = () => {
        navigate(`/layout/home/destination/${id}/add-activity`);
    };

    const openLogForm = (activityID) => {
        navigate(`/layout/home/destination/${id}/activity/${activityID}/add-memory`)
    }

    const handleDeleteActivity = async (activityID) => {
        try {
            await deleteActivity(activityID);
            setActivities((prev) => prev.filter((a) => a.activityID !== activityID));
            setActivityToDelete(null);
        } catch (err) {
            alert("Error deleting activity: " + err.message);
        }
    };

    return (
        <div>
            {/* City background */}
            <div
                className="px-6 py-20 bg-cover bg-center"
                style={{ backgroundImage: `url(${destination.imageUrl})` }}
            >
                <div className="shadow-2xl w-sm p-5 rounded-4xl text-neutral-100 bg-black/60">
                    <h1 className="text-3xl font-bold mb-4">
                        {destination.city}, {destination.country}
                    </h1>
                    <p className="font-medium">
                        Home departure:{" "}
                        {destination.homeDeparture
                            ? new Date(destination.homeDeparture).toLocaleString()
                            : "N/A"}
                    </p>
                    <p className="font-medium">
                        Destination departure:{" "}
                        {destination.destinationDeparture
                            ? new Date(destination.destinationDeparture).toLocaleString()
                            : "N/A"}
                    </p>
                </div>
            </div>
            <div className="py-5 flex gap-4 justify-center bg-neutral-300">
                        <button
                            onClick={handleEditDestination}
                            className="bg-sky-500 hover:bg-sky-700 py-3 px-4 rounded-md"
                        >
                            Edit Destination
                        </button>
                        <button
                            onClick={() => setShowDeleteDestModal(true)}
                            className="bg-red-600 hover:bg-red-800 py-3 px-4 rounded-md"
                        >
                            Delete Destination
                        </button>
                        <button
                            onClick={handleAddActivity}
                            className="bg-amber-500 hover:bg-amber-700 py-3 px-4 rounded-md"
                        >
                            Add Activity
                        </button>
                    </div>

            {/* Activities */}
            <div className="md:grid md:grid-cols-2 md:gap-5 mx-6">
                {activities.length > 0 ? (
                    activities.map((a) => (
                        <div
                            key={a.activityID}
                            className="space-y-2 bg-neutral-200 shadow-xl text-center rounded p-7 my-10"
                        >
                            <div className="space-y-2">
                                <p className="text-2xl font-semibold text-black">{a.title}</p>
                                <p>{a.activityDescription}</p>
                                <p>
                                    Website:{" "}
                                    <a className="font-light" href={a.website} target="_blank" rel="noreferrer">
                                        {a.website}
                                    </a>
                                </p>
                            </div>
                            {a.isCompleted ? (
                                <button className="bg-blue-600 px-4 py-3 rounded-md text-xs text-neutral-200 cursor-pointer" onClick={() => openLogForm(a.activityID)}>
                                    ADD MEMORY
                                </button>
                            ) : (
                                <span className="text-gray-500 italic mt-5">
                                    Complete this activity to add a log
                                </span>
                            )}
                            <div className="mt-5 flex justify-evenly ">
                                <button
                                    onClick={() =>
                                        navigate(`/layout/home/destination/${id}/activity/${a.activityID}/edit`)
                                    }
                                    className="bg-purple-500 py-1 px-2 h-8 w-35 rounded-md text-xs text-neutral-200 cursor-pointer"
                                >
                                    EDIT ACTIVITY
                                </button>
                                <button
                                    onClick={() => setActivityToDelete(a)}
                                    className="bg-red-500 py-1 px-2 h-8 w-35 rounded-md text-xs text-neutral-200 cursor-pointer"
                                >
                                    DELETE ACTIVITY
                                </button>
                            </div>
                        
                        </div>
                    ))
                ) : (
                    <p>Add an activity to your destination!</p>
                )}
            </div>

            {/* --- Delete Destination Modal --- */}
            {showDeleteDestModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <p className="mb-4">Are you sure you want to delete this destination?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteDestModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteDestination}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Delete Activity Modal --- */}
            {activityToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <p className="mb-4">
                            Are you sure you want to delete activity{" "}
                            <span className="font-semibold">{activityToDelete.title}</span>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setActivityToDelete(null)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteActivity(activityToDelete.activityID)}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DestinationDetails;