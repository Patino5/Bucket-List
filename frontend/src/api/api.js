const API_BASE = import.meta.env.VITE_API_URL;

// User
export async function deleteUser(userID) {
    const res = await fetch(`${API_BASE}/users/${userID}`, {
        method: "DELETE",
    });

    console.log(res.ok)

    if (!res.ok) throw new Error("Failed to delete user");

    return res.status;
}


// Destination
export async function getDestinations(userID) {
    const res = await fetch(`${API_BASE}/destinations/user/${userID}`);

    if (!res.ok) throw new Error("Failed to fetch destinations");

    return res.json();
}

export async function getDestination(destinationID) {
    const res = await fetch(`${API_BASE}/destinations/${destinationID}`);

    if (!res.ok) throw new Error("Failed to fetch destinations");

    return res.json();
}

export async function addDestination(destination) {
    const res = await fetch(`${API_BASE}/destinations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(destination),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Server response:", errorText);
        throw new Error(`Failed to add destination: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function deleteDestination(destinationID) {
    const res = await fetch(`${API_BASE}/destinations/${destinationID}`, {
        method: "DELETE",
    })

    if (!res.ok) throw new Error("Failed to delete destination " + destinationID)

    return res.status
}

export async function updateDestination(destinationID, updateData) {
    const res = await fetch(`${API_BASE}/destinations/${destinationID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
    });

    if (!res.ok) throw new Error(`Failed to update destination ${destinationID}: ${res.status} ${res.statusText}`);

    return await res.json();
}

// Activity
export async function getActivities(destinationID) {
    const res = await fetch(`${API_BASE}/activity/${destinationID}`);

    if (!res.ok) throw new Error("Failed to fetch activites");

    return res.json();
}

export async function getActivity(activityID) {
    const res = await fetch(`${API_BASE}/activity/single/${activityID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch activity: ${res.status} ${res.statusText}`);
    }

    return await res.json();
};

export async function addActivity(activity) {
    const res = await fetch(`${API_BASE}/activity`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
    });

    if (!res.ok) {
        let errorMessage = `Failed to add activity: ${res.status} ${res.statusText}`;

        try {
            const errorData = await res.json(); // try parse JSON error
            if (errorData.error) {
                errorMessage = errorData.error; // use backend error message
            }
        } catch {
            const errorText = await res.text();
            if (errorText) errorMessage = errorText;
        }

        throw new Error(errorMessage);
    }

    return res.json();
}

export async function updateActivity(activityID, updateData) {
    const res = await fetch(`${API_BASE}/activity/${activityID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),

    });

    if (!res.ok) {
        let errorMessage = `Failed to add activity: ${res.status} ${res.statusText}`;

        try {
            const errorData = await res.json(); // try parse JSON error
            if (errorData.error) {
                errorMessage = errorData.error; // use backend error message
            }
        } catch {
            const errorText = await res.text();
            if (errorText) errorMessage = errorText;
        }

        throw new Error(errorMessage);
    }

    return await res.json();
}

export async function deleteActivity(activityID) {
    const res = await fetch(`${API_BASE}/activity/${activityID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) throw new Error(`Failed to delete activity ${activityID}: ${res.status} ${res.statusText}`)

    return res.status
}

// Activity Logs
export async function getLogs() {
    const res = await fetch(`${API_BASE}/activitylogs`);

    if (!res.ok) throw new Error("Failed to fetch activity logs");

    return res.json();
}

export async function getUsersLogs(userID) {
    const res = await fetch(`${API_BASE}/activitylogs/user/${userID}`);

    if (!res.ok) throw new Error("Faild to fetch user's activity logs");

    return res.json();
}

export async function getActivityLogById(memoryID) {
    const res = await fetch(`${API_BASE}/activitylogs/${memoryID}`);

    if (!res.ok) throw new Error(`Failed to fetch memory ${memoryID}`);

    return res.json();
}

export async function addActivityLog(formData) {
    const response = await fetch(`${API_BASE}/activitylogs`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to save activity log");
    }

    return await response.json();
}

export async function updateActivityLog(memoryID, formData) {
    const res = await fetch(`${API_BASE}/activitylogs/${memoryID}`, {
        method: "PUT",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Failed to update activity log");
    }

    return await res.json();
}

export async function deleteMemory(memoryID) {
    const res = await fetch(`${API_BASE}/activitylogs/${memoryID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) throw new Error(`Failed to delete memory ${memoryID}: ${res.status} ${res.statusText}`)

    return res.status
}


export async function getCityImage(city) {
    const accessKey = import.meta.env.VITE_ACCESS_KEY;
    const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&client_id=${accessKey}&per_page=1&orientation=landscape`
    );
    const data = await res.json();

    return data.results.length > 0 ? data.results[0].urls.small : null;
}