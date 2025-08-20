import { useState, useEffect } from "react";
import { getLogs } from "./api";

const ActivityLog = () => {
    const [activitylogs, setActvityLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!activitylogs) {
            setError("No activity logs available");
            setLoading(false);
            return <Navigate to="/layout/home" />;
        }

        getLogs()
        .then(async (data) => {
            setActvityLogs(data);
            setLoading(false);
        }).catch((err) => {
            setError(err.message);
            setLoading(false);
        })
    }, [setActvityLogs]);

    return (
        <>
        <h1 className="text-3xl font-bold mb-4">Activity Log</h1>
        {activitylogs.map((activitylog) => (
            <div key={activitylog.activityLogID} className="font-medium m-5 border p-5">
                <p>Memory ID:{activitylog.memoryID}</p>
                <p>Notes: {activitylog.notes}</p>
                <p>img source: {activitylog.photoURL}</p>
                <img className="mx-auto block h-50 w-70 shadow-lg rounded-full md:mx-0 md:shrink-0 md:h-90 md:w-70"
                src={`${activitylog.photoURL}`} alt="picture" />
            </div>
        ))}
        </>

    )
}

export default ActivityLog;