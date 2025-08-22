import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import myIcon from '../assets/walking.svg'
import { addActivity } from './api';

const AddActivity = () => {
    const { id } = useParams(); // gets destinationID from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        activityDescription: "",
        categoryID: "",
        website: "",
        isCompleted: false
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.title.trim()) {
            alert("Title is required");
            return;
        }
        if (!formData.categoryID) {
            alert("Please select a category");
            return;
        }
        
        try {
            const activityPayload = {
                destinationID: parseInt(id, 10),
                title: formData.title.trim(),
                activityDescription: formData.activityDescription.trim() || null,
                categoryID: parseInt(formData.categoryID, 10),
                website: formData.website.trim() || null,
                isCompleted: formData.isCompleted,
            }

            const data = await addActivity(activityPayload);
            console.log("Activity added:", data);

            // Reset form after successful save
            setFormData({
                title: "",
                activityDescription: "",
                categoryID: "",
                website: "",
                isCompleted: false
            });

            // Navigate back to destination details
            navigate(`/layout/home/destination/${id}`);

        } catch (error) {
            console.error("Error:", error);
            alert(`Error adding activity: ${error.message}`);
        }
    }

    const handleCancel = () => {
        // Navigate back without saving
        navigate(`/layout/home/destination/${id}`);
    }

    return (
        <>
            <header className="bg-gray-500 text-neutral-100 flex justify-between items-center px-4 ">
                <div>
                    <img src={myIcon} alt="walking stick figure" className="h-20 w-10" />
                </div>
                <div>
                    <h1 className="text-3xl">Add an Activity</h1>
                </div>
                <div></div>
            </header>
            <main className='m-10'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Title: *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                            required
                            maxLength={100}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Description:</label>
                        <textarea
                            name="activityDescription"
                            value={formData.activityDescription}
                            onChange={handleChange}
                            className="border p-2 w-full rounded h-24"
                            placeholder="Optional description of the activity"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Category: *</label>
                        <select
                            name="categoryID"
                            value={formData.categoryID}
                            onChange={handleChange}
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
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                            maxLength={200}
                            placeholder="https://example.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="flex items-center gap-2 font-semibold">
                            <input
                                type="checkbox"
                                name="isCompleted"
                                checked={formData.isCompleted}
                                onChange={handleChange}
                                className="w-5 h-5"
                            />
                            Mark as Completed
                        </label>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            type="submit" 
                            className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-6 rounded cursor-pointer"
                        >
                            Create Activity
                        </button>
                        <button 
                            type="button"
                            onClick={handleCancel} 
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
};

export default AddActivity;