import { useNavigate } from "react-router";

const MemoryCard = ({ memory, setMemoryToDelete }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };

    return (
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
    )
}

export default MemoryCard