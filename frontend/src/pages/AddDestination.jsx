import { useState } from "react"

const AddDestination = () => {
    const [destination, setDestination] = useState({
        city: "",
        country: "",
        homeDepartureDate: "",
        homeDepartureTime: "",
        destinationDepartureDate: "",
        destinationDepartureTime: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDestination((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/destinations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...destination, userID: localStorage.getItem("userID")}),
            });

            if (!response.ok) {
                throw new Error("Failed to add destination");
            }

            const data = await response.json();
            console.log("Destination added:", data);

            // Reset form after successful save
            setDestination({
                city: "",
                country: "",
                HomeDepartureDate: "",
                HomeDepartureTime: "",
                DestinationDepartureDate: "",
                DestinationDepartureTime: ""
            });

        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className="p-5 ">
            <h1 className="text-4xl">Add Destination Page</h1>
            <div className="p-10 border-1 m-10 rounded-4xl">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={destination.city}
                        onChange={handleChange}

                    />
                    <input
                        type="text"
                        name='country'
                        placeholder="Country"
                        className="border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={destination.country}
                        onChange={handleChange}
                    />

                    <label htmlFor="destinationDeparture">Destination Departure:
                        <input
                            type="date"
                            name="destinationDepartureDate"
                            className="border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={destination.destinationDepartureDate}
                            onChange={handleChange}
                        />
                        <input
                            type="time"
                            name="destinationDepartureTime"
                            className="border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={destination.destinationDepartureTime}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="homeDepartureDate">Home Depature:
                        <input
                            type="date"
                            name="homeDepartureDate"
                            className="border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={destination.homeDepartureDate}
                            onChange={handleChange}
                        />
                        <input
                            type="time"
                            name="homeDepartureTime"
                            className="border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={destination.homeDepartureTime}
                            onChange={handleChange}
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:cursor-pointer transition"
                    >
                        Add Destination
                    </button>
                </form>
            </div>

        </div>
    )
}

export default AddDestination;