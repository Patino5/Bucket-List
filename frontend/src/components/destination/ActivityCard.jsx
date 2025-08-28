const ActivityCard = ({ activity, id, openLogForm, onEdit, onDelete }) => {

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{activity.title}</h2>
            <p className="text-gray-600">{activity.activityDescription}</p>
            {activity.website && (
                <p className="mt-2 text-sm overflow-hidden">
                    🌐 <a href={activity.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{activity.website}</a>
                </p>
            )}

            {activity.isCompleted ? (
                <button onClick={() => openLogForm(activity.activityID)} className="mt-4 px-4 py-2 rounded-xl font-medium shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:scale-105 active:scale-95">
                    ADD MEMORY
                </button>
            ) : (
                <p className="mt-4 text-gray-500 italic">Complete this activity to add a log</p>
            )}

            <div className="mt-6 flex gap-3 justify-end">
                <button onClick={() => onEdit(activity.activityID)} className="px-3 py-2 rounded-xl text-xs font-medium shadow bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:scale-105 active:scale-95">
                    ✏️ Edit
                </button>
                <button onClick={() => onDelete(activity)} className="px-3 py-2 rounded-xl text-xs font-medium shadow bg-gradient-to-r from-red-500 to-red-600 text-white hover:scale-105 active:scale-95">
                    🗑️ Delete
                </button>
            </div>
        </div>
    );
}



export default ActivityCard;