import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteBike, getAllCars } from "../redux/actions/carsActions";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Bike,
  Zap,
  AlertCircle
} from "lucide-react";

function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  // Derived Stats
  const availableBikes = cars.filter(car => !car.bookedTimeSlots || car.bookedTimeSlots.length === 0).length;
  const bookedBikes = cars.length - availableBikes;

  const filteredCars = totalCars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <div className="min-h-screen bg-zinc-950 pt-32 px-4 pb-20">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header & Stats */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-up">
            <div>
              <h4 className="text-yellow-500 font-bold tracking-widest uppercase text-xs mb-2">Admin Console</h4>
              <h1 className="text-4xl md:text-5xl font-black text-white font-['Outfit']">Fleet Command</h1>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-white/5 p-2">
              <div className="px-6 py-2 border-r border-white/5 text-center">
                <span className="block text-2xl font-bold text-white font-['Outfit']">{cars.length}</span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Total</span>
              </div>
              <div className="px-6 py-2 border-r border-white/5 text-center">
                <span className="block text-2xl font-bold text-emerald-400 font-['Outfit']">{availableBikes}</span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Active</span>
              </div>
              <div className="px-6 py-2 text-center">
                <span className="block text-2xl font-bold text-yellow-400 font-['Outfit']">{bookedBikes}</span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Booked</span>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-900/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm animate-fade-up animation-delay-100">
            {/* Search */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search fleet by name..."
                className="w-full bg-black/50 border border-zinc-800 text-zinc-300 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 focus:outline-none transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Add Action */}
            <Link
              to="/addbike"
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:-translate-y-1"
            >
              <Plus size={20} strokeWidth={3} />
              <span>Add Vehicle</span>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up animation-delay-200">
            {filteredCars.map((car) => (
              <div
                key={car._id}
                className="group relative bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-900/10"
              >
                {/* Image Area */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-80"></div>
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <p className="text-zinc-400 text-xs tracking-widest uppercase mb-1">{car.fuelType}</p>
                    <h3 className="text-xl font-bold text-white font-['Outfit']">{car.name}</h3>
                  </div>
                  <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-yellow-400 font-bold text-sm">₹{car.rentPerHour}</span>
                    <span className="text-zinc-500 text-xs">/hr</span>
                  </div>
                </div>

                {/* Quick Actions (Hover Reveal) */}
                <div className="p-4 grid grid-cols-2 gap-3 opacity-100 lg:opacity-60 lg:group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to={`/editbike/${car._id}`}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 hover:bg-white hover:text-black text-zinc-300 font-medium transition-all"
                  >
                    <Edit2 size={16} /> Edit
                  </Link>

                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this bike permanently?")) {
                        dispatch(deleteBike({ carid: car._id }));
                      }
                    }}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 hover:bg-red-500 hover:text-white text-zinc-300 font-medium transition-all"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default AdminHome;
