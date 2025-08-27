const ConfirmModal = ({ message, onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm">
                <p className="mb-4 text-gray-800">{message}</p>
                <div className="flex justify-end gap-3">
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white shadow hover:scale-105 active:scale-95">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;