import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [email, setEmail] = useState(""); // email for register
    const [error, setError] = useState(null);
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Pick correct endpoint
        const endpoint = isRegister
            ? "http://localhost:8080/api/users/register"
            : "http://localhost:8080/api/users/login";

        // Build request body (register requires email too)
        const body = isRegister
            ? { userName, userPassword, email }
            : { userName, userPassword };

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
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
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isRegister ? "Register" : "Login"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Username"
                        className="border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                    {isRegister && (
                        <input
                            type="email"
                            placeholder="Email"
                            className="border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        {isRegister ? "Register" : "Login"}
                    </button>
                    {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                </form>

                {/* Toggle link */}
                <p className="mt-4 text-sm text-center">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-blue-600 hover:underline"
                    >
                        {isRegister ? "Login here" : "Register here"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;