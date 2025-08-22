import { useState } from "react";
import { useNavigate } from "react-router";
import { addDestination } from './api';

// Helper: format datetime-local → ISO string for API
const formatDateTimeForAPI = (dateTimeLocalValue) => {
  if (!dateTimeLocalValue) return null;
  return new Date(dateTimeLocalValue).toISOString();
};

const AddDestination = ({ setDestinations }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    homeDeparture: "",
    destinationDeparture: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newDestination = {
        userID: localStorage.getItem("userID"),
        city: formData.city.trim(),
        country: formData.country.trim(),
        homeDeparture: formatDateTimeForAPI(formData.homeDeparture),
        destinationDeparture: formatDateTimeForAPI(formData.destinationDeparture),
        imageUrl: "" // optional placeholder if your backend expects it
      };

      const saved = await addDestination(newDestination);
      console.log("Destination added:", saved);

      // Update parent state if provided
      if (setDestinations) {
        setDestinations((prev) => [...prev, saved]);
      }

      navigate(`/layout/home`);
    } catch (err) {
      console.error("Add error:", err);
      alert("Error adding destination: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/layout/home");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Add Destination</h2>
        <p className="text-gray-600">Fill out destination details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Home Departure Date & Time
          </label>
          <input
            type="datetime-local"
            name="homeDeparture"
            value={formData.homeDeparture}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            When you depart from home
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Destination Departure Date & Time
          </label>
          <input
            type="datetime-local"
            name="destinationDeparture"
            value={formData.destinationDeparture}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            When you depart from your destination
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white py-3 px-4 rounded-md font-medium transition-colors"
          >
            {loading ? "Saving..." : "Add Destination"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-md font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDestination;