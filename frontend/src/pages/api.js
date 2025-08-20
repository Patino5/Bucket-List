import { act } from "react";

const API_BASE = "http://localhost:8080/api/";

export async function getDestinations(userID) {
    const res = await fetch(`${API_BASE}destinations/user/${userID}`);

    if (!res.ok) throw new Error("Failed to fetch destinations");
    return res.json();
}

export async function getDestination(destinationID) {
    const res = await fetch(`${API_BASE}destinations/destination/${destinationID}`);

    if (!res.ok) throw new Error("Failed to fetch destinations");
    return res.json();
}

export async function getCityImage(city) {
  const accessKey = import.meta.env.VITE_ACCESS_KEY;
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&client_id=${accessKey}&per_page=1&orientation=landscape`
  );
  const data = await res.json();
  return data.results.length > 0 ? data.results[0].urls.small : null;
}

export async function getActivities(destinationID) {
    const res = await fetch(`${API_BASE}activity/${destinationID}`);

    if (!res.ok) throw new Error("Failed to fetch activites");
    return res.json();
}

export async function getActivity(activityID) {
    const res = await fetch(`${API_BASE}activity/${activityID}`, {
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

export async function getLogs() {
    const res = await fetch(`${API_BASE}activitylogs`);

    if (!res.ok) throw new Error("Failed to fetch activity logs");
    return res.json();
}

export async function deleteActivity(activityID) {
    const res = await fetch(`${API_BASE}activity/${activityID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) throw new Error(`Failed to delete activity ${activityID}: ${res.status} ${res.statusText}`)
    return res.status
}

export async function deleteDestination(destinationID) {
    const res = await fetch(`${API_BASE}destinations/${destinationID}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete destination " + destinationID)
    return res.status
}

export async function updateDestination(destinationID, updateData) {
    const res = await fetch(`${API_BASE}destinations/${destinationID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
    });

    if (!res.ok) throw new Error(`Failed to update destination ${destinationID}: ${res.status} ${res.statusText}`);
    return await res.json();
}

export async function updateActivity(activityID, updateData) {
    const res = await fetch(`${API_BASE}activity/${activityID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
                body: JSON.stringify(updateData),

    });

    if (!res.ok) {
        throw new Error(`Failed to update activity ${activityID}: ${res.status} ${res.statusText}`)
    }

    return await res.json();
}