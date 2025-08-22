import { useState, useEffect } from "react";
import { getLogs, getUsersLogs } from "./api";
import Loading from "../components/Loading";

const ActivityLog = () => {
    const [userLogs, setUserLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const userID = localStorage.getItem("userID");
        if (!userID) {
            setError("No user logged in");
            setLoading(false);
            return <Navigate to="/" />;
        }

        getUsersLogs(userID)
            .then(async (data) => {
                console.log(data)
                setUserLogs(data)
                setLoading(false)
            }).catch((err) => {
                setError(err.message);
                setLoading(false)
            })
    }, [setUserLogs]);


    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <div className="text-red-600 bg-red-50 p-4 rounded-md">
                <p>Error: {error}</p>
                <button
                    onClick={fetchActivityLogs}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (userLogs.length === 0) {
        return (
            <div className="text-gray-500 text-center p-8">
                <p>No memories yet. Compelete an activity to create a memory!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Activity Memories</h3>

            {userLogs.map((userLog) => (
                <div key={userLog.memoryID} className="bg-white rounded-lg shadow-md p-6 border">
                    {/* Header with date */}
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-medium text-gray-800">Memory #{userLog.memoryID}</h4>
                        <span className="text-sm text-gray-500">{formatDate(userLog.createdAt)}</span>
                    </div>

                    {/* Notes */}
                    {userLog.notes && (
                        <div className="mb-4">
                            <p className="text-gray-700 leading-relaxed">{userLog.notes}</p>
                        </div>
                    )}

                    {/* Image */}
                    {userLog.photoBase64 && (
                        <div className="mb-4">
                            <img
                                src={userLog.photoBase64}
                                alt={userLog.photoFileName || 'Activity memory'}
                                className="w-full max-w-md h-64 object-cover rounded-lg shadow-sm border"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    console.error('Failed to load image for memory:', userLog.memoryId);
                                }}
                            />
                            {userLog.photoFileName && (
                                <p className="text-xs text-gray-500 mt-1">{userLog.photoFileName}</p>
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-between items-center text-sm text-gray-400 pt-4 border-t">
                        <span>Activity ID: {userLog.activityID}</span>
                        {userLogs.photoBase64 && (
                            <a
                                href={`http://localhost:8080/api/activity-logs/${userLogs.memoryID}/image`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                View full size
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ActivityLog;