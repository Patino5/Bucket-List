import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getActivity, getActivityLogById, updateActivityLog } from '../api/api';
import Loading from '../components/Loading';

const EditActivityLog = () => {
    const { id, activityID, memoryID } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState(null);
    const [memory, setMemory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        notes: '',
        photo: null,
        removeCurrentPhoto: false
    });

    const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);
    const [currentPhotoUrl, setCurrentPhotoUrl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [activityData, memoryData] = await Promise.all([
                    getActivity(activityID),
                    getActivityLogById(memoryID)
                ]);

                setActivity(activityData);
                setMemory(memoryData);
                
                // Set form data with existing memory data
                setFormData({
                    notes: memoryData.notes || '',
                    photo: null,
                    removeCurrentPhoto: false
                });

                // Set current photo URL if exists
                if (memoryData.photo && memoryData.photo.length > 0) {
                    let photoBase64;
                    if (typeof memoryData.photo === 'string') {
                        photoBase64 = `data:${memoryData.photoMimeType || 'image/jpeg'};base64,${memoryData.photo}`;
                    } else {
                        const uint8Array = new Uint8Array(memoryData.photo);
                        let binaryString = '';
                        uint8Array.forEach((byte) => {
                            binaryString += String.fromCharCode(byte);
                        });
                        const base64String = btoa(binaryString);
                        photoBase64 = `data:${memoryData.photoMimeType || 'image/jpeg'};base64,${base64String}`;
                    }
                    setCurrentPhotoUrl(photoBase64);
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [activityID, memoryID]);

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
            e.target.value = "";
            return;
        }

        setFormData(prev => ({ 
            ...prev, 
            photo: file,
            removeCurrentPhoto: false 
        }));

        // Create preview URL
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPhotoPreviewUrl(previewUrl);
        } else {
            setPhotoPreviewUrl(null);
        }
    };

    const removeNewPhoto = () => {
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

    const removeCurrentPhoto = () => {
        setFormData(prev => ({ 
            ...prev, 
            removeCurrentPhoto: true 
        }));
    };

    const keepCurrentPhoto = () => {
        setFormData(prev => ({ 
            ...prev, 
            removeCurrentPhoto: false 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const updateData = new FormData();
            updateData.append("notes", formData.notes);
            updateData.append("removeCurrentPhoto", formData.removeCurrentPhoto.toString());

            if (formData.photo) {
                updateData.append("photo", formData.photo);
            }

            await updateActivityLog(memoryID, updateData);

            // Clean up preview URL
            if (photoPreviewUrl) {
                URL.revokeObjectURL(photoPreviewUrl);
            }

            navigate(`/layout/activitylog`);
        } catch (err) {
            alert("Error updating memory: " + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        // Clean up preview URL
        if (photoPreviewUrl) {
            URL.revokeObjectURL(photoPreviewUrl);
        }
        navigate(`/layout/activitylog`);
    };

    if (loading) return <Loading />;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!activity || !memory) return <p>Memory not found</p>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Memory</h1>
                <p className="text-gray-600">Update your experience with {activity.title}</p>
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

                {/* Current Photo */}
                {currentPhotoUrl && !formData.removeCurrentPhoto && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Photo
                        </label>
                        <div className="relative inline-block">
                            <img
                                src={currentPhotoUrl}
                                alt="Current memory"
                                className="w-full max-w-md h-64 object-cover rounded-lg shadow-sm border"
                            />
                            <button
                                type="button"
                                onClick={removeCurrentPhoto}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600"
                            >
                                ×
                            </button>
                            <p className="text-xs text-gray-500 mt-2">
                                {memory.photoFileName}
                            </p>
                        </div>
                    </div>
                )}

                {/* Photo removed message */}
                {formData.removeCurrentPhoto && currentPhotoUrl && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-yellow-800">
                            Current photo will be removed. 
                            <button
                                type="button"
                                onClick={keepCurrentPhoto}
                                className="ml-2 text-blue-600 hover:underline"
                            >
                                Keep current photo
                            </button>
                        </p>
                    </div>
                )}

                {/* New Photo Upload */}
                <div>
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                        {currentPhotoUrl ? 'Replace Photo (optional)' : 'Add Photo (optional)'}
                    </label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={handlePhotoChange}
                        accept="image/jpeg, image/png, image/gif, image/webp"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* New Photo Preview */}
                    {photoPreviewUrl && (
                        <div className="mt-4 relative inline-block">
                            <img
                                src={photoPreviewUrl}
                                alt="New preview"
                                className="w-full max-w-md h-64 object-cover rounded-lg shadow-sm border"
                            />
                            <button
                                type="button"
                                onClick={removeNewPhoto}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600"
                            >
                                ×
                            </button>
                            <p className="text-xs text-gray-500 mt-2">
                                New: {formData.photo?.name}
                            </p>
                        </div>
                    )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={submitting || !formData.notes.trim()}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Updating...' : 'Update Memory'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditActivityLog;