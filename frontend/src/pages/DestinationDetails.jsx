// DestinationDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getActivities, deleteDestination, deleteActivity } from "../api/api";
import Loading from "../components/Loading";
import DestinationHero from "../components/DestinationHero";
import DestinationActions from "../components/DestinationActions";
import ActivityList from "../components/ActivityList";
import ConfirmModal from "../components/ConfimModal";

const DestinationDetails = ({ destinations, setDestinations }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const destination = destinations.find(
    ({ destinationID }) => destinationID === parseInt(id, 10)
  );

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDeleteDestModal, setShowDeleteDestModal] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No destination found.");
      setLoading(false);
      return;
    }

    getActivities(id)
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, destination]);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!destination) return <p>Destination not found</p>;

  // Handlers
  const handleEditDestination = () =>
    navigate(`/layout/home/destination/${id}/edit`);

  const handleDeleteDestination = async () => {
    try {
      await deleteDestination(id);
      navigate("/layout/home");
    } catch (err) {
      alert("Error deleting destination: " + err.message);
    }
  };

  const handleAddActivity = () =>
    navigate(`/layout/home/destination/${id}/add-activity`);

  const openLogForm = (activityID) =>
    navigate(`/layout/home/destination/${id}/activity/${activityID}/add-memory`);

  const handleDeleteActivity = async (activityID) => {
    try {
      await deleteActivity(activityID);
      setActivities((prev) => prev.filter((a) => a.activityID !== activityID));
      setActivityToDelete(null);
    } catch (err) {
      alert("Error deleting activity: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      <DestinationHero destination={destination} />

      <DestinationActions
        onEdit={handleEditDestination}
        onDelete={() => setShowDeleteDestModal(true)}
        onAddActivity={handleAddActivity}
      />

      <ActivityList
        activities={activities}
        id={id}
        openLogForm={openLogForm}
        onEdit={(activityID) =>
          navigate(`/layout/home/destination/${id}/activity/${activityID}/edit`)
        }
        onDelete={setActivityToDelete}
      />

      {/* Modals */}
      {showDeleteDestModal && (
        <ConfirmModal
          message={`Are you sure you want to delete ${destination.city}?`}
          onCancel={() => setShowDeleteDestModal(false)}
          onConfirm={handleDeleteDestination}
        />
      )}

      {activityToDelete && (
        <ConfirmModal
          message={`Are you sure you want to delete activity ${activityToDelete.title}?`}
          onCancel={() => setActivityToDelete(null)}
          onConfirm={() => handleDeleteActivity(activityToDelete.activityID)}
        />
      )}
    </div>
  );
};

export default DestinationDetails;