import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteBike, getAllCars } from "../redux/actions/carsActions";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
// import axios from "axios";
import { message } from "antd";
import api from "../api/axios";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
// import {
//   Plus,
//   Edit2,
//   Trash2,
//   Search,
//   Bike,
//   Users,
//   CheckCircle,
//   XCircle,
//   ExternalLink,
//   ShieldAlert
// } from "lucide-react";

function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("fleet"); // 'fleet' or 'users'
  const [users, setUsers] = useState([]);
  const [verifying, setVerifying] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/getallusers");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyUser = async (userId) => {
    try {
      setVerifying(true);
      await api.post("/users/update", {
        _id: userId,
        isVerified: true
      });
      message.success("User verified successfully");
      fetchUsers(); // Refresh list
      setVerifying(false);
    } catch (error) {
      console.error(error);
      message.error("Verification failed");
      setVerifying(false);
    }
  };

  // Derived Stats
  const availableBikes = cars.filter(car => !car.bookedTimeSlots || car.bookedTimeSlots.length === 0).length;
  const bookedBikes = cars.length - availableBikes;
  const pendingVerifications = users.filter(user => user.licenseUrl && !user.isVerified).length;

  const filteredCars = totalCars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingUsers = users.filter(user => user.licenseUrl && !user.isVerified);

  return (
    <DefaultLayout>
      {(loading || verifying) && <Spinner />}

      <div className="min-h-screen bg-zinc-950 pt-32 px-4 pb-20">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header & Stats */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-up">
            <div>
              <h4 className="text-yellow-500 font-bold tracking-widest uppercase text-xs mb-2">Admin Console</h4>
              <h1 className="text-4xl md:text-5xl font-black text-white font-['Outfit']">Dashboard</h1>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-white/5 p-2 gap-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('fleet')}
                className={`px-6 py-2 rounded-xl border border-transparent transition-all flex flex-col items-center min-w-[100px] ${activeTab === 'fleet' ? 'bg-zinc-800 border-white/10 shadow-lg' : 'hover:bg-white/5'}`}
              >
                <span className={`block text-xl font-bold font-['Outfit'] ${activeTab === 'fleet' ? 'text-white' : 'text-zinc-500'}`}>{cars.length}</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Fleet</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-2 rounded-xl border border-transparent transition-all flex flex-col items-center min-w-[100px] ${activeTab === 'users' ? 'bg-zinc-800 border-white/10 shadow-lg' : 'hover:bg-white/5'}`}
              >
                <span className={`block text-xl font-bold font-['Outfit'] ${activeTab === 'users' ? 'text-yellow-500' : 'text-zinc-500'}`}>{pendingVerifications}</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Pending</span>
              </button>
            </div>
          </div>

          {/* Sub-Nav Toggle (Visual) */}
          <div className="flex gap-4 border-b border-white/5 pb-4">
            <button
              onClick={() => setActiveTab('fleet')}
              className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all ${activeTab === 'fleet' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Fleet Management
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all flex items-center gap-2 ${activeTab === 'users' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Verification Queue
              {pendingVerifications > 0 && <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">{pendingVerifications}</span>}
            </button>
          </div>

          {activeTab === 'fleet' ? (
            /* Fleet View */
            <>
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
                        onError={(e) => e.target.style.display = 'none'}
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
            </>
          ) : (
            /* User Verification View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
              {pendingUsers.length > 0 ? pendingUsers.map((user) => (
                <div key={user._id} className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 flex flex-col gap-4">

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black text-lg">
                        {user.username[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{user.username}</h3>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider">{user.phone || 'No Info'}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                      <ShieldAlert size={12} /> Pending
                    </div>
                  </div>

                  {/* License Preview */}
                  <div className="bg-black rounded-xl p-1 border border-zinc-800 relative group overflow-hidden h-40">
                    {user.licenseUrl ? (
                      <img src={user.licenseUrl} className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform hover:scale-110" onClick={() => window.open(user.licenseUrl, '_blank')} alt="License" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">No License Image</div>
                    )}
                    <div className="absolute bottom-2 right-2">
                      <a href={user.licenseUrl} target="_blank" rel="noreferrer" className="p-2 bg-black/80 text-white rounded-full hover:bg-yellow-500 hover:text-black transition-colors block">
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-3">
                    <p className="text-sm text-zinc-400 flex justify-between">
                      <span className="text-zinc-600 font-bold uppercase text-xs">License No:</span>
                      <span className="text-white font-mono">{user.licenseNumber || 'N/A'}</span>
                    </p>
                    <p className="text-sm text-zinc-400 flex justify-between">
                      <span className="text-zinc-600 font-bold uppercase text-xs">Expiry:</span>
                      <span className={`${new Date(user.licenseExpiry) < new Date() ? "text-red-500 font-bold" : "text-emerald-400"}`}>
                        {user.licenseExpiry || 'N/A'} {new Date(user.licenseExpiry) < new Date() && "(EXPIRED)"}
                      </span>
                    </p>
                    <p className="text-sm text-zinc-400 flex justify-between">
                      <span className="text-zinc-600 font-bold uppercase text-xs">DOB:</span>
                      <span className="text-zinc-300">{user.dob || 'N/A'}</span>
                    </p>
                    <p className="text-sm text-zinc-400 flex justify-between">
                      <span className="text-zinc-600 font-bold uppercase text-xs">Aadhaar:</span>
                      <span className="text-zinc-300">{user.aadhaar || 'N/A'}</span>
                    </p>
                    <p className="text-sm text-zinc-400 flex justify-between">
                      <span className="text-zinc-600 font-bold uppercase text-xs">Emergency:</span>
                      <span className="text-zinc-300 text-right truncate max-w-[150px]">{user.emergencyContact || 'N/A'}</span>
                    </p>
                    <p className="text-sm text-zinc-400 pt-2"><span className="text-zinc-600 font-bold uppercase text-xs mr-2">Address:</span> {user.address || 'N/A'}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button className="py-2 rounded-xl border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500 hover:text-white transition-all">
                      Reject
                    </button>
                    <button
                      onClick={() => verifyUser(user._id)}
                      className="py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center">
                  <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-zinc-700" />
                  </div>
                  <h3 className="text-xl text-zinc-500 font-bold">All caught up!</h3>
                  <p className="text-zinc-600">No pending verifications at the moment.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </DefaultLayout>
  );
}

export default AdminHome;
