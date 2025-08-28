import { useState, useEffect } from "react";
import { updateDestination } from "../../api/api";

const EditDestinationModal = ({ destination, onClose, onUpdate }) => {
  // Helper function to format datetime for input
  const formatDateTimeForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Format as YYYY-MM-DDTHH:MM for datetime-local input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Helper function to format datetime for API (ISO string)
  const formatDateTimeForAPI = (dateTimeLocalValue) => {
    if (!dateTimeLocalValue) return null;
    return new Date(dateTimeLocalValue).toISOString();
  };

  const [homeDeparture, setHomeDeparture] = useState("");
  const [destinationDeparture, setDestinationDeparture] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize state when destination is provided
  useEffect(() => {
    if (destination) {
      setHomeDeparture(formatDateTimeForInput(destination.homeDeparture));
      setDestinationDeparture(formatDateTimeForInput(destination.destinationDeparture));
    }
  }, [destination]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        destinationID: destination.destinationID,
        userID: destination.userID,
        city: destination.city,
        country: destination.country,
        imageUrl: destination.imageUrl, // Ensure imageUrl is preserved
        homeDeparture: formatDateTimeForAPI(homeDeparture),
        destinationDeparture: formatDateTimeForAPI(destinationDeparture)
      };

      console.log("Sending updated data:", updateData);

      const updated = await updateDestination(destination.destinationID, updateData);

      // Ensure imageUrl is preserved even if API doesn't return it
      const updatedWithImage = {
        ...updated,
        imageUrl: updated.imageUrl || destination.imageUrl
      };

      // Call the update callback to update parent state
      onUpdate(updatedWithImage);
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating destination: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleBackdropClick}
    >
      <div>
        <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-auto max-h-[90vh] overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Edit Destination</h2>
            <p className="text-gray-600">
              Editing flight times for {destination.city}, {destination.country}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Home Departure Date & Time
                <input
                  type="datetime-local"
                  value={homeDeparture}
                  name="homeDeparture"
                  onChange={(e) => setHomeDeparture(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </label>

              <p className="text-xs text-gray-500 mt-1">
                When you depart from home
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Destination Departure Date & Time
                <input
                  type="datetime-local"
                  value={destinationDeparture}
                  name="destinationDeparture"
                  onChange={(e) => setDestinationDeparture(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </label>

              <p className="text-xs text-gray-500 mt-1">
                When you depart from {destination.city}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white py-3 px-4 rounded-md font-medium transition-colors"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default EditDestinationModal;