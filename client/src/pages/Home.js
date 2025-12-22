import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import moment from "moment";
import Chatbot from "../components/Chatbot";
import { DatePicker } from "antd";
import { Zap, Shield, Clock, ArrowRight } from "lucide-react";

const { RangePicker } = DatePicker;

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [dateRange, setDateRange] = useState([]); // Store plain date objects/moment objects
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  // Unified Filter Effect: Runs whenever ANY filter criteria changes
  useEffect(() => {
    let tempCars = [...cars];

    // 1. Date Range Filter
    if (dateRange && dateRange.length === 2) {
      const selectedFrom = dateRange[0];
      const selectedTo = dateRange[1];

      tempCars = tempCars.filter(car => {
        if (!car.bookedTimeSlots || car.bookedTimeSlots.length === 0) return true;

        // Return false if ANY booking overlaps
        let isAvailable = true;
        for (const booking of car.bookedTimeSlots) {
          const bookedFrom = moment(booking.from);
          const bookedTo = moment(booking.to);
          if (
            selectedFrom.isBetween(bookedFrom, bookedTo) ||
            selectedTo.isBetween(bookedFrom, bookedTo) ||
            bookedFrom.isBetween(selectedFrom, selectedTo) ||
            bookedTo.isBetween(selectedFrom, selectedTo) ||
            selectedFrom.isSame(bookedFrom) || selectedFrom.isSame(bookedTo) ||
            selectedTo.isSame(bookedFrom) || selectedTo.isSame(bookedTo)
          ) {
            isAvailable = false;
            break;
          }
        }
        return isAvailable;
      });
    }

    // 2. Text Search (Case-Insensitive)
    if (searchKey) {
      tempCars = tempCars.filter(car =>
        car.name.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    // 3. Fuel Type Filter
    if (typeFilter !== "all") {
      tempCars = tempCars.filter(car =>
        car.fuelType && car.fuelType.toLowerCase() === typeFilter.toLowerCase()
      );
    }

    // 4. Sort Order
    if (sortOrder === "low-high") {
      tempCars.sort((a, b) => a.rentPerHour - b.rentPerHour);
    } else if (sortOrder === "high-low") {
      tempCars.sort((a, b) => b.rentPerHour - a.rentPerHour);
    }

    setTotalcars(tempCars);
  }, [cars, searchKey, typeFilter, sortOrder, dateRange]);


  // Handler just for DatePicker to update state
  function setFilter(values) {
    if (values) {
      // AntD RangePicker values need to be converted to consistent moment objects for comparison
      // The picker returns moment objects, but let's be safe
      setDateRange([
        moment(values[0].format("MMM DD yyyy HH:mm")),
        moment(values[1].format("MMM DD yyyy HH:mm"))
      ]);
    } else {
      setDateRange([]);
    }
  }

  return (
    <DefaultLayout>
      {/* Immersive Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 select-none">
          <img
            src="https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=2670&auto=format&fit=crop"
            alt="Cinematic Motorcycle"
            className="w-full h-full object-cover opacity-80 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-zinc-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-contrast mb-8 border border-white/10 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300">Premium Fleet Available</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none drop-shadow-2xl animate-fade-up style={{animationDelay: '0.1s'}}">
            Beyond <span className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-yellow-600">Speed</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 mb-10 font-light max-w-2xl mx-auto animate-fade-up style={{animationDelay: '0.2s'}}">
            Find your perfect ride. Filter by date, bike model, or fuel preference.
          </p>

          {/* Advanced Command Search Hub */}
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 p-3 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-3 max-w-5xl mx-auto animate-fade-up style={{animationDelay: '0.3s'}}">

            {/* 1. Date Range Picker (The most important filter) */}
            <div className="flex-grow md:w-1/3">
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="MMM DD yyyy HH:mm"
                onChange={setFilter}
                className="w-full h-14 rounded-2xl border-none bg-black/40 hover:bg-black/60 text-white placeholder-zinc-500 font-['Outfit']"
                placeholder={['Pick-up Date', 'Drop-off Date']}
                popupStyle={{ zIndex: 9999 }}
                allowClear={true}
              />
            </div>

            {/* 2. Text Search */}
            <div className="relative flex-grow md:w-1/4">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input
                type="text"
                className="w-full h-14 pl-12 pr-4 bg-black/40 hover:bg-black/60 border-none rounded-2xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-yellow-500/50 transition-all font-['Outfit']"
                placeholder="Search bike name..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>

            {/* 3. Fuel/Type Filter */}
            <div className="relative md:w-1/6">
              <select
                className="w-full h-14 px-4 bg-black/40 hover:bg-black/60 border-none rounded-2xl text-white appearance-none cursor-pointer focus:ring-2 focus:ring-yellow-500/50 font-['Outfit']"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Available</option>
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            {/* 4. Sort Filter */}
            <div className="relative md:w-1/6">
              <select
                className="w-full h-14 px-4 bg-black/40 hover:bg-black/60 border-none rounded-2xl text-white appearance-none cursor-pointer focus:ring-2 focus:ring-yellow-500/50 font-['Outfit']"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Sort By</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-10 bg-zinc-950 pb-20 -mt-20">
        <div className="max-w-[1400px] mx-auto px-6">

          {loading && <div className="flex justify-center py-20"><Spinner /></div>}

          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-zinc-900">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">The Collection</h2>
              <p className="text-zinc-500">Select your machine based on performance and style</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <span className="text-4xl font-bold text-yellow-500">{totalCars.length}</span>
              <span className="text-zinc-600 ml-2 font-medium">Bikes Available</span>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[400px]">
            {totalCars.map((car, index) => {
              // Make every 7th item large for "Featured" look in Bento Grid
              const isLarge = index % 7 === 0;
              const admin = JSON.parse(localStorage.getItem("admin"));
              return (
                <Link
                  to={admin ? `/editbike/${car._id}` : `/booking/${car._id}`}
                  key={car._id}
                  className={`group relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl transition-all duration-500 hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(250,204,21,0.1)] ${isLarge ? 'md:col-span-2' : ''}`}
                >
                  {/* Image Layer */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={car.image}
                      alt={car.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90"></div>
                  </div>

                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    {car.bookedTimeSlots.length === 0 ? (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-xs font-bold text-emerald-300 uppercase">Available</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                        <span className="text-xs font-bold text-red-300 uppercase">Booked</span>
                      </div>
                    )}
                  </div>

                  {/* Content Layer */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-wider mb-2">
                        <span>{car.fuelType}</span>
                        <span>•</span>
                        <span>{car.capacity} Seats</span>
                      </div>

                      <h3 className={`font-black text-white leading-tight mb-2 ${isLarge ? 'text-4xl' : 'text-2xl'}`}>
                        {car.name}
                      </h3>

                      <div className="flex items-end justify-between mt-4 pb-2 border-b border-white/10">
                        <div className="flex flex-col">
                          <span className="text-zinc-400 text-xs uppercase font-bold">Rate</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-white">₹{car.rentPerHour}</span>
                            <span className="text-zinc-500 text-sm">/hr</span>
                          </div>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Trust Indicators */}
          <div className="mt-32 grid md:grid-cols-3 gap-8 border-t border-zinc-900 pt-16">
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 transition-colors">
              <Zap size={32} className="text-yellow-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Instant Power</h3>
              <p className="text-zinc-500 leading-relaxed">Book your dream ride in seconds with our streamlined digital garage.</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 transition-colors">
              <Shield size={32} className="text-emerald-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Verified Integrity</h3>
              <p className="text-zinc-500 leading-relaxed">Every vehicle undergoes a rigourous 50-point safety inspection before every ride.</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 transition-colors">
              <Clock size={32} className="text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
              <p className="text-zinc-500 leading-relaxed">Roadside assistance and support team available round the clock for your journey.</p>
            </div>
          </div>

        </div>
      </section>
      <Chatbot />
    </DefaultLayout>
  );
}

export default Home;
