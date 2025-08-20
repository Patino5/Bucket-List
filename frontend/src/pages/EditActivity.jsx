import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getActivity, updateActivity } from './api'; // You'll need to implement these
import myIcon from '../assets/walking.svg'

const EditActivity = () => {
    const { id: destinationID, activityID } = useParams(); // Get both destination ID and activity ID
    const navigate = useNavigate();
    
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    
    // Form state
    const [title, setTitle] = useState("");
    const [activityDescription, setActivityDescription] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [website, setWebsite] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    // Fetch the activity data when component mounts
    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const activityData = await getActivity(activityID);
                setActivity(activityData);
                
                // Populate form fields
                setTitle(activityData.title || "");
                setActivityDescription(activityData.activityDescription || "");
                setCategoryID(activityData.categoryID?.toString() || "");
                setWebsite(activityData.website || "");
                setIsCompleted(activityData.isCompleted || false);
                
                setLoading(false);
            } catch (err) {
                console.error("Error fetching activity:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        if (activityID) {
            fetchActivity();
        }
    }, [activityID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!title.trim()) {
            alert("Title is required");
            return;
        }
        if (!categoryID) {
            alert("Please select a category");
            return;
        }
        
        setSaving(true);
        
        try {
            const updateData = {
                activityID: parseInt(activityID, 10),
                destinationID: parseInt(destinationID, 10),
                title: title.trim(),
                activityDescription: activityDescription.trim() || null,
                categoryID: parseInt(categoryID, 10),
                website: website.trim() || null,
                isCompleted: isCompleted
            };

            console.log("Updating activity with data:", updateData);

            const updatedActivity = await updateActivity(activityID, updateData);
            console.log("Activity updated:", updatedActivity);

            // Navigate back to destination details
            navigate(`/layout/home/destination/${destinationID}`);

        } catch (error) {
            console.error("Error updating activity:", error);
            alert(`Error updating activity: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        // Navigate back without saving
        navigate(`/layout/home/destination/${destinationID}`);
    };

    if (loading) {
        return (
            <div className="p-6">
                <p>Loading activity...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-500">Error: {error}</p>
                <button 
                    onClick={handleCancel}
                    className="mt-4 bg-gray-600 text-white py-2 px-4 rounded"
                >
                    Back to Destination
                </button>
            </div>
        );
    }

    if (!activity) {
        return (
            <div className="p-6">
                <p className="text-red-500">Activity not found</p>
                <button 
                    onClick={handleCancel}
                    className="mt-4 bg-gray-600 text-white py-2 px-4 rounded"
                >
                    Back to Destination
                </button>
            </div>
        );
    }

    return (
        <>
            <header className="bg-gray-500 text-neutral-100 flex justify-between items-center px-4 ">
                <div>
                    <img src={myIcon} alt="walking stick figure" className="h-20 w-10" />
                </div>
                <div>
                    <h1 className="text-3xl">Edit Activity</h1>
                </div>
                <div></div>
            </header>
            <main className='m-10'>
                <div className="mb-6">
                    <p className="text-gray-600">
                        Editing: <span className="font-semibold">{activity.title}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Title: *</label>
                        <input
                            type="text"
                            value={title ?? ""}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border p-2 w-full rounded"
                            required
                            maxLength={100}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Description:</label>
                        <textarea
                            value={activityDescription}
                            onChange={(e) => setActivityDescription(e.target.value)}
                            className="border p-2 w-full rounded h-24"
                            placeholder="Optional description of the activity"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Category: *</label>
                        <select
                            value={categoryID}
                            onChange={(e) => setCategoryID(e.target.value)}
                            className="border p-2 w-full rounded"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="1">Adventure</option>
                            <option value="2">Relaxation</option>
                            <option value="3">Cultural</option>
                            <option value="4">Food</option>
                            <option value="5">Nature</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Website URL:</label>
                        <input
                            type="url"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            className="border p-2 w-full rounded"
                            maxLength={200}
                            placeholder="https://example.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="flex items-center gap-2 font-semibold">
                            <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={(e) => setIsCompleted(e.target.checked)}
                                className="w-5 h-5"
                            />
                            Mark as Completed
                        </label>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            type="submit" 
                            disabled={saving}
                            className="bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white py-2 px-6 rounded cursor-pointer"
                        >
                            {saving ? "Saving..." : "Update Activity"}
                        </button>
                        <button 
                            type="button"
                            onClick={handleCancel} 
                            disabled={saving}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-2 px-6 rounded cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default EditActivity;