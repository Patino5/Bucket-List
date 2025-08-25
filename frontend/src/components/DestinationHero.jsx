const DestinationHero = ({ destination }) => (
  <div
    className="relative h-72 md:h-96 bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: `url(${destination.imageUrl})` }}
  >
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="relative text-center text-white max-w-2xl p-6">
      <h1 className="text-4xl font-bold mb-4">
        {destination.city}, {destination.country}
      </h1>
      <p className="text-sm md:text-base">
        🛫 Home Departure:{" "}
        {destination.homeDeparture
          ? new Date(destination.homeDeparture).toLocaleString()
          : "N/A"}
      </p>
      <p className="text-sm md:text-base">
        🛬 Destination Departure:{" "}
        {destination.destinationDeparture
          ? new Date(destination.destinationDeparture).toLocaleString()
          : "N/A"}
      </p>
    </div>
  </div>
);

export default DestinationHero;
