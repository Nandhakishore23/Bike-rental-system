import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Fuel, Navigation, MapPin, Locate } from "lucide-react";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for Leaflet Default Icon
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Component to handle "Near Me" logic accessing map context
function LocationButton() {
    const map = useMap();

    const handleNearMe = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                map.flyTo([latitude, longitude], 14, {
                    duration: 1.5
                });
                // Add a user marker (optional, but nice)
                L.marker([latitude, longitude], {
                    icon: L.divIcon({
                        className: 'user-location-marker',
                        html: '<div style="background-color: #3b82f6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);"></div>'
                    })
                }).addTo(map);
            },
            () => {
                alert("Unable to retrieve your location");
            }
        );
    };

    return (
        <div className="leaflet-bottom leaflet-right" style={{ marginBottom: '80px', marginRight: '10px', pointerEvents: 'auto' }}>
            <div className="leaflet-control">
                <button
                    onClick={handleNearMe}
                    className="bg-black/90 text-white p-3 rounded-full hover:bg-yellow-500 hover:text-black transition-all shadow-xl border border-white/20 flex items-center gap-2 group"
                    title="Find bikes near me"
                >
                    <Locate size={20} className="group-hover:animate-pulse" />
                    <span className="font-bold text-xs uppercase tracking-wider pr-1 hidden group-hover:block transition-all duration-300">Near Me</span>
                </button>
            </div>
        </div>
    );
}


function FleetMap() {
    const { cars } = useSelector((state) => state.carsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    // Default Center (London, or average of bikes)
    const defaultCenter = [51.505, -0.09];

    // Custom Marker Icon for Bikes (Optional: could use custom image)
    // For now, standard pin is fine.

    return (
        <DefaultLayout>
            <div className="min-h-screen bg-zinc-950 pt-36 px-4 pb-10">

                {/* Header */}
                <div className="max-w-7xl mx-auto mb-8 flex justify-between items-end animate-fade-up">
                    <div>
                        <h4 className="text-yellow-500 font-bold tracking-widest uppercase text-xs mb-2">Live Availability</h4>
                        <h1 className="text-4xl md:text-5xl font-black text-white font-['Outfit']">Fleet Map</h1>
                    </div>
                    <Link to="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                        List View <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Map Container */}
                <div className="max-w-7xl mx-auto h-[70vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative animate-fade-up animation-delay-100">
                    <MapContainer
                        center={cars.length > 0 && cars[0].location?.lat ? [cars[0].location.lat, cars[0].location.lng] : defaultCenter}
                        zoom={13}
                        scrollWheelZoom={true}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <LocationButton />

                        {cars.map(car => (
                            car.location && car.location.lat !== 0 && (
                                <Marker
                                    key={car._id}
                                    position={[car.location.lat, car.location.lng]}
                                >
                                    <Popup className="custom-popup">
                                        <div className="flex flex-col gap-2 min-w-[200px]">
                                            <img src={car.image} alt={car.name} className="w-full h-32 object-cover rounded-lg" />
                                            <div>
                                                <h3 className="font-bold text-lg font-['Outfit']">{car.name}</h3>
                                                <div className="flex justify-between items-center mt-1">
                                                    <span className="text-yellow-600 font-bold">₹{car.rentPerHour}<span className="text-xs font-normal text-gray-500">/hr</span></span>
                                                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{car.fuelType}</span>
                                                </div>

                                                <div className="flex gap-2 mt-3">
                                                    <Link to={`/booking/${car._id}`} className="flex-1 text-center bg-black text-white py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition">
                                                        Book
                                                    </Link>
                                                    <a
                                                        href={`https://www.google.com/maps/dir/?api=1&destination=${car.location.lat},${car.location.lng}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center justify-center w-10 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                                                        title="Get Directions"
                                                    >
                                                        <Navigation size={16} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        ))}
                    </MapContainer>

                    {/* Overlay Legend */}
                    <div className="absolute bottom-6 left-6 z-[1000] bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-xs pointer-events-none">
                        <h4 className="text-white font-bold mb-2 text-sm flex items-center gap-2"><Star size={14} className="text-yellow-500" /> Legend</h4>
                        <p className="text-xs text-zinc-400">Each pin represents a live vehicle station. Click a pin to view bike details and book immediately.</p>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default FleetMap;
