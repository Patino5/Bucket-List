import { useState, useEffect } from "react";
import { getUsersLogs, getActivity, getDestination, deleteMemory } from "../api/api";
import Loading from "../components/Loading";
import ConfirmModal from "../components/destination/ConfimModal";
import MemoryCard from "../components/ActivityLog/MemoryCard";
import Gallery from "../components/ActivityLog/Gallery";

const ActivityLog = () => {
    const [userLogs, setUserLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [memoryToDelete, setMemoryToDelete] = useState(null);
    const [viewGallery, setViewGallery] = useState(false)
    const gallery = userLogs
        .filter((m) => m.photoBase64)
        .map((m) => m.photoBase64);

    useEffect(() => {
        const fetchLogs = async () => {
            const userID = localStorage.getItem("userID");
            if (!userID) {
                setError("No user logged in");
                setLoading(false);
                return;
            }

            try {
                const data = await getUsersLogs(userID);

                const logsWithBase64 = await Promise.all(
                    data.map(async (log) => {
                        const activity = await getActivity(log.activityID);
                        const destination = await getDestination(activity.destinationID);

                        let photoBase64 = null;
                        if (log.photo && log.photo.length > 0) {

                            if (typeof log.photo === "string") {
                                photoBase64 = `data:${log.photoMimeType || 'image/jpeg'};base64,${log.photo}`;
                            } else {// Convert array of numbers to Base64
                                const uint8Array = new Uint8Array(log.photo);
                                let binaryString = '';
                                uint8Array.forEach((byte) => {
                                    binaryString += String.fromCharCode(byte);
                                });
                                const base64String = btoa(binaryString);
                                photoBase64 = `data:${log.photoMimeType || 'image/jpeg'};base64,${base64String}`;
                            }
                        }

                        // Return enriched log
                        return {
                            ...log,
                            activityTitle: activity.title,
                            logDestination: `${destination.city}, ${destination.country}`,
                            destinationID: activity.destinationID,
                            photoBase64,
                        };
                    })
                );

                setUserLogs(logsWithBase64);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    const handleDeleteMemory = async (memoryID) => {
        try {
            console.log(memoryID);
            await deleteMemory(memoryID);
            setUserLogs((prev) => prev.filter((m) => m.memoryID !== memoryID));
            setMemoryToDelete(null);
        } catch (err) {
            alert("Error deleting memory: " + err.message);
        }
    }

    if (loading) return <Loading />;

    if (error) {
        return (
            <div className="text-red-600 bg-red-50 p-4 rounded-md">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (userLogs.length === 0) {
        return (
            <div className="text-gray-500 text-center p-8">
                <p>No memories yet. Complete an activity to create a memory!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">

            <div className="flex justify-between">
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">
                    {`${localStorage.getItem("userName")[0].toUpperCase() + localStorage.getItem("userName").slice(1)}`}’s Memories
                </h2>
                <button className="mr-5 px-5 py-3 rounded-xl font-medium shadow-md transition-all duration-300 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:scale-105 active:scale-95" onClick={() => setViewGallery((prev) => !prev)}
                >
                    {viewGallery ? "View Cards" : "View Gallery"}
                </button>
            </div>

            {viewGallery ? (
                <div className="flex justify-center items-center min-h-[70vh]">
                    <Gallery gallery={gallery} />
                </div>
            ) : (
                <>
                    {userLogs.map((memory) => (
                        <MemoryCard key={memory.memoryID} memory={memory} setMemoryToDelete={setMemoryToDelete} />
                    ))}
                </>
            )}

            {memoryToDelete && (
                <ConfirmModal
                    message={`Are you sure you want to delete memory ${memoryToDelete.memoryID}?`}
                    onCancel={() => setMemoryToDelete(null)}
                    onConfirm={() => handleDeleteMemory(memoryToDelete.memoryID)}
                />
            )}
        </div>
    );
};

export default ActivityLog;