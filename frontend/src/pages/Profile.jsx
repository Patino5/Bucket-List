import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react"; // icons
import { deleteUser } from "../api/api";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        const userName = localStorage.getItem("userName");

        if (!userID) {
            navigate("/login");
            return;
        }

        fetch(`http://localhost:8080/api/users/user/${userID}`)
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch(() => setError("Failed to load profile"));
    }, [navigate]);

    const handleDelete = async () => {
        try {
            await deleteUser(user.userID)
            localStorage.clear()
            alert(`Good bye ${user.userName}`)
            navigate("/layout/login");

        } catch (err) {
            setError("Error deleting account");
        }
    };

    if (!user) return <div className="p-6">Loading profile...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Your Profile
                </h2>

                <div className="space-y-4">
                    <p><span className="font-semibold">Username:</span> {user.userName}</p>
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                    <p><span className="font-semibold">User Number:</span> {user.userID}</p>
                </div>

                <div className="mt-8 space-y-4">

                    {!confirmDelete ? (
                        <button
                            onClick={() => setConfirmDelete(true)}
                            className="flex items-center justify-center w-full py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                        >
                            <Trash2 className="mr-2" size={18} /> Delete Account
                        </button>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-center text-red-600 font-medium">
                                Are you sure? This cannot be undone.
                            </p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(false)}
                                    className="flex-1 py-2 rounded-lg bg-gray-300 font-semibold hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}
            </div>
        </div>
    );
};

export default Profile;