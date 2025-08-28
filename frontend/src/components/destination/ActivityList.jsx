import ActivityCard from "./ActivityCard";

const ActivityList = ({ activities, id, openLogForm, onEdit, onDelete }) => {
    
    return (
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.length > 0 ? (
                activities.map((a) => (
                    <ActivityCard
                        key={a.activityID}
                        activity={a}
                        id={id}
                        openLogForm={openLogForm}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))
            ) : (
                <p className="text-center text-gray-600 italic">Add an activity to your destination!</p>
            )}
        </div>
    );
}

export default ActivityList;