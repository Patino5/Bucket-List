import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getUsersLogs, getActivity, getDestination, deleteMemory } from "../api/api";
import Loading from "../components/Loading";
import ConfirmModal from "../components/ConfimModal";

const ActivityLog = () => {
    const navigate = useNavigate();
    const [userLogs, setUserLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [memoryToDelete, setMemoryToDelete] = useState(null);

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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

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

            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">
                {`${localStorage.getItem("userName")[0].toUpperCase() + localStorage.getItem("userName").slice(1)}`}’s Memories
            </h2>

            {userLogs.map((memory) => (
                <div key={memory.memoryID} className="bg-neutral-50 rounded-lg shadow-md p-6 border">
                    {/* Header with date */}
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-medium text-gray-800">{memory.activityTitle}</h4>
                        <span className="text-sm text-gray-500">{formatDate(memory.createdAt)}</span>
                    </div>

                    {/* Notes */}
                    {memory.notes && (
                        <div className="mb-4">
                            <p className="text-gray-700 leading-relaxed">{memory.notes}</p>
                        </div>
                    )}

                    {/* Image */}
                    {memory.photoBase64 && (
                        <div className="mb-4">
                            <img
                                src={memory.photoBase64}
                                alt={memory.photoFileName || 'Activity memory'}
                                className="w-full max-w-md h-64 object-cover rounded-lg shadow-sm border"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    console.error('Failed to load image for memory:', memory.memoryID);
                                    console.error('Photo data length:', memory.photo?.length);
                                    console.error('MIME type:', memory.photoMimeType);
                                }}
                                onLoad={() => {
                                    console.log("Image loaded successfully for memory: ", memory.memoryID);
                                }}
                            />
                            {memory.photoFileName && (
                                <p className="text-xs text-gray-500 mt-1">{memory.photoFileName}</p>
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-between items-center text-sm text-gray-400 pt-3 border-t">
                        <span>Location: {memory.logDestination}</span>
                        <div className="flex gap-3">
                            <button
                                onClick={() =>
                                    navigate(`/layout/home/destination/${memory.destinationID}/activity/${memory.activityID}/memory/${memory.memoryID}/edit`)
                                }
                                className="px-3 py-2 rounded-xl text-xs font-medium shadow bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:scale-105 active:scale-95"
                            >
                                ✏️ Edit
                            </button>
                            <button
                                onClick={() => setMemoryToDelete(memory)}
                                className="px-3 py-2 rounded-xl text-xs font-medium shadow bg-gradient-to-r from-red-500 to-red-600 text-white hover:scale-105 active:scale-95"
                            >
                                🗑️ Delete
                            </button>
                        </div>


                    </div>
                </div>
            ))}

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