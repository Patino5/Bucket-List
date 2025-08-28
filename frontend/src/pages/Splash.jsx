import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/layout/login");
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold">🌎 Travel Bucket</h1>
            <p className="text-lg mt-2">Loading your adventures...</p>
        </div>
    );
}