const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold">🌎 Travel Bucket</h1>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-lg mt-2">Loading your adventures...</p>
        </div>
    );
}

export default Loading;