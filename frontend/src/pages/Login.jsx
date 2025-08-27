import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Map, Camera } from "lucide-react"; // icons

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [email, setEmail] = useState(""); 
  const [error, setError] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const endpoint = isRegister
      ? "http://localhost:8080/api/users/register"
      : "http://localhost:8080/api/users/login";

    const body = isRegister ? { userName, userPassword, email } : { userName, userPassword };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errData = await res.json();
          throw new Error(errData.error || (isRegister ? "Registration failed" : "Login failed"));
        } else {
          throw new Error("Server error: non-JSON response");
        }
      }

      const user = await res.json();
      localStorage.setItem("userID", user.userID);
      localStorage.setItem("userName", user.userName);

      navigate("/layout/home");
    } catch (err) {
      setError(err.message);
    }
  };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center px-4">
            {!showForm ? (
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    {/* Hero Section */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                            Your Personal Travel Companion
                        </h1>
                        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
                            Your personal place to plan destination adventures, create activity lists,
                            and capture your favorite memories along the way.
                        </p>
                    </div>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                            <Plane className="h-12 w-full text-blue-600 mb-2" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Add Destinations
                            </h3>
                            <p className="text-gray-600">
                                Build your bucket list of dream destinations with ease.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                            <Map className="h-12 w-full text-green-600 mb-2" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Plan Activities
                            </h3>
                            <p className="text-gray-600">
                                Organize adventures and experiences to make the most of every trip.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                            <Camera className="h-12 w-full text-pink-600 mb-2" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Store Memories
                            </h3>
                            <p className="text-gray-600">
                                Capture photos and notes to treasure your experiences forever.
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div>
                        <p className="text-lg text-gray-700 mb-6">
                            Start your next adventure today. Whether you're a dreamer or a traveler, 
                            this app helps you turn plans into memories.
                        </p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
                        >
                            Get Started – Log In or Sign Up
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        {isRegister ? "Create Your Account" : "Welcome Back"}
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <input
                            type="text"
                            placeholder="Username"
                            className="border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        {isRegister && (
                            <input
                                type="email"
                                placeholder="Email"
                                className="border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        )}
                        <input
                            type="password"
                            placeholder="Password"
                            className="border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            {isRegister ? "Sign Up" : "Login"}
                        </button>
                        <button className="bg-neutral-600 text-white py-3 rounded-lg font-semibold hover:bg-neutral-700 transition mt-3" onClick={() => (setShowForm(false))}>Cancel</button>
                        {error && (
                            <p className="text-red-500 mt-3 text-sm text-center">{error}</p>
                        )}
                    </form>

                    {/* Toggle */}
                    <p className="mt-6 text-sm text-center text-gray-600">
                        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            {isRegister ? "Login here" : "Register here"}
                        </button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Login;