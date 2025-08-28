const DestinationActions = ({ onEdit, onDelete, onAddActivity }) => {
    
    return (
        <div className="p-4 flex gap-3 justify-center">
            <button onClick={onEdit} className="px-5 py-3 rounded-xl font-medium shadow-md bg-gradient-to-r from-sky-500 to-sky-700 text-white hover:scale-105 active:scale-95">
                ✏️ Edit Destination
            </button>
            <button onClick={onDelete} className="px-5 py-3 rounded-xl font-medium shadow-md bg-gradient-to-r from-red-500 to-red-700 text-white hover:scale-105 active:scale-95">
                🗑️ Delete Destination
            </button>
            <button onClick={onAddActivity} className="px-5 py-3 rounded-xl font-medium shadow-md bg-gradient-to-r from-green-500 to-green-700 text-white hover:scale-105 active:scale-95">
                ➕ Add Activity
            </button>
        </div>
    );
}

export default DestinationActions;