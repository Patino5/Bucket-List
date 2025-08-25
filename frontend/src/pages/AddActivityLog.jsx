import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getActivity, addActivityLog } from './api';
import Loading from '../components/Loading';

const AddActivityLog = () => {
    const { id, activityID } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        notes: '',
        photo: null
    });

    // Photo preview state
    const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const activityData = await getActivity(activityID);
                setActivity(activityData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchActivity();
    }, [activityID]);

    const handleNotesChange = (e) => {
        setFormData(prev => ({
            ...prev,
            notes: e.target.value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 16 * 1024 * 1024) {
            alert("File is too large. Max size is 16 MB.");
            e.target.value = ""; // reset file input
        } else {
            setFormData(prev => ({ ...prev, photo: file }));
        }



        // Create preview URL
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPhotoPreviewUrl(previewUrl);
        } else {
            setPhotoPreviewUrl(null);
        }
    };

    const removePhoto = () => {
        setFormData(prev => ({ ...prev, photo: null }));

        // Clean up preview URL
        if (photoPreviewUrl) {
            URL.revokeObjectURL(photoPreviewUrl);
            setPhotoPreviewUrl(null);
        }

        // Reset file input
        const fileInput = document.getElementById('photo');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const logData = new FormData();
            logData.append("activityID", activityID);
            logData.append("notes", formData.notes);

            if (formData.photo) {
                logData.append("photo", formData.photo);
            }

            await addActivityLog(logData);

            // Clean up preview URL
            if (photoPreviewUrl) {
                URL.revokeObjectURL(photoPreviewUrl);
            }

            navigate(`/layout/home/destination/${id}`); // use correct param from useParams
        } catch (err) {
            alert("Error adding memory: " + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        // Clean up preview URL
        if (photoPreviewUrl) {
            URL.revokeObjectURL(photoPreviewUrl);
        }
        navigate(`/layout/home/destination/${id}`);
    };

    if (loading) return <Loading />;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!activity) return <p>Activity not found</p>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Memory</h1>
                <p className="text-gray-600">Share your experience with {activity.title}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Notes */}
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                        Notes *
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleNotesChange}
                        required
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your experience, what you enjoyed, memorable moments..."
                    />
                </div>

                {/* Photo Upload */}
                <div>
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                        Photo (optional)
                    </label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={handlePhotoChange}
                        accept="image/jpeg, image/png, image/gif, image/webp"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Photo Preview */}
                    {photoPreviewUrl && (
                        <div className="mt-4 relative inline-block">
                            <img
                                src={photoPreviewUrl}
                                alt="Preview"
                                className="w-full max-w-md h-64 object-cover rounded-lg shadow-sm border"
                            />
                            <button
                                type="button"
                                onClick={removePhoto}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 cursor-pointer"
                            >
                                x
                            </button>
                            <p className="text-xs text-gray-500 mt-2">
                                {formData.photo?.name}
                            </p>
                        </div>
                    )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting || !formData.notes.trim()}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Saving...' : 'Save Memory'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddActivityLog;