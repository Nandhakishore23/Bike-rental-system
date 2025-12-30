import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editBike, getAllCars } from "../redux/actions/carsActions";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import {
  ArrowLeft,
  Save,
  Bike,
  DollarSign,
  Users,
  Fuel,
  Link as LinkIcon,
  MapPin
} from "lucide-react";

// Fix for Leaflet default marker
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function EditBike({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  // State for form fields (controlled for live preview)
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    rentPerHour: "",
    capacity: "",
    fuelType: "",
    location: { lat: 51.505, lng: -0.09, address: "London" }
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Map Click Handler for Edit Page
  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        // 1. Update State
        setFormData(prev => ({
          ...prev,
          location: { ...prev.location, lat, lng }
        }));
        map.flyTo(e.latlng, map.getZoom());

        // 2. Reverse Geocode
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.display_name) {
              const cleanAddress = data.display_name.split(',').slice(0, 3).join(',');
              setFormData(prev => ({
                ...prev,
                location: { ...prev.location, lat, lng, address: cleanAddress }
              }));
            }
          })
          .catch(err => console.error("Geocoding failed", err));
      },
    });

    return formData.location ? (
      <Marker position={[formData.location.lat, formData.location.lng]} />
    ) : null;
  }

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      const currentCar = cars.find((o) => o._id === match.params.carid);
      if (currentCar) {
        setFormData({
          _id: currentCar._id,
          name: currentCar.name,
          image: currentCar.image,
          rentPerHour: currentCar.rentPerHour,
          capacity: currentCar.capacity,
          fuelType: currentCar.fuelType,
          location: currentCar.location || { lat: 51.505, lng: -0.09, address: "Not Set" }
        });
        setIsLoaded(true);
      }
    }
  }, [cars, dispatch, match.params.carid]);

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(editBike(formData));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <div className="min-h-screen bg-zinc-950 pt-32 px-4 pb-20">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8 text-white">
            <Link to="/admin" className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-white/20 hover:bg-zinc-800 transition-all">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold font-['Outfit']">Edit Vehicle</h1>
              <p className="text-zinc-500 text-sm">Update fleet details and specifications</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Edit Form */}
            <div className="w-full lg:w-2/3 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 animate-fade-up">
              <form onSubmit={onSubmit} className="space-y-6">

                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    <Bike size={14} /> Vehicle Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder:text-zinc-700 font-['Outfit'] text-lg"
                    placeholder="e.g. BMW S1000RR"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Rent */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                      <DollarSign size={14} /> Rent Per Hour
                    </label>
                    <input
                      type="number"
                      name="rentPerHour"
                      value={formData.rentPerHour}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-white outline-none transition-all"
                      placeholder="0"
                      required
                    />
                  </div>

                  {/* Capacity */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                      <Users size={14} /> Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-white outline-none transition-all"
                      placeholder="e.g. 2"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Fuel */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                      <Fuel size={14} /> Fuel Type
                    </label>
                    <input
                      type="text"
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-white outline-none transition-all"
                      placeholder="e.g. Petrol"
                      required
                    />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                      <LinkIcon size={14} /> Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-zinc-800 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-white outline-none transition-all text-sm"
                      placeholder="https://..."
                      required
                    />
                  </div>
                </div>

                {/* Location Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    <MapPin size={14} /> Current Location
                  </label>
                  <p className="text-xs text-zinc-600 mb-2">Update the bike's parking spot.</p>

                  <div className="h-64 rounded-xl overflow-hidden border border-zinc-800 relative z-0">
                    <MapContainer
                      center={[formData.location?.lat || 51.505, formData.location?.lng || -0.09]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationMarker />
                    </MapContainer>
                  </div>
                  <div className="text-xs text-zinc-500 font-mono mt-1 flex justify-between items-center">
                    <span>Lat: {formData.location?.lat?.toFixed(4)}, Lng: {formData.location?.lng?.toFixed(4)}</span>
                    <span className="text-yellow-500 font-bold">{formData.location?.address || "Click map to set address"}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-end">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-8 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Live Preview */}
            <div className="w-full lg:w-1/3 space-y-4 animate-fade-up animation-delay-200">
              <h3 className="text-zinc-500 font-bold text-xs uppercase tracking-widest pl-2">Live Preview</h3>

              {/* Preview Card */}
              <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative group">
                <div className="relative h-64 overflow-hidden bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-80"></div>
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => e.target.style.display = 'none'} // Hide broken images
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 bg-zinc-900">
                      <Bike size={48} />
                    </div>
                  )}

                  <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-yellow-400 font-bold text-sm">₹{formData.rentPerHour || '0'}</span>
                    <span className="text-zinc-500 text-xs">/hr</span>
                  </div>

                  <div className="absolute bottom-4 left-4 z-20">
                    <p className="text-zinc-400 text-xs tracking-widest uppercase mb-1">{formData.fuelType || 'Fuel Type'}</p>
                    <h3 className="text-2xl font-bold text-white font-['Outfit']">{formData.name || 'Vehicle Name'}</h3>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-2 gap-4 border-t border-white/5 bg-zinc-950">
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <Users size={14} className="text-yellow-500" />
                    <span>{formData.capacity || '0'} Seats</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-sm justify-end">
                    <span className="text-emerald-500 text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Available</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3 text-blue-300 text-sm">
                <div className="mt-1"><Save size={16} /></div>
                <p>Tip: Changes are reflected in real-time above. Click <strong>Save Changes</strong> to apply them to the live database.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default EditBike;
