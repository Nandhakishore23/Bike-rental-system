import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import { BookCar } from "../redux/actions/bookingActions";
import Spinner from "../components/Spinner";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import { Calendar, Clock, Shield, Fuel, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function BookingBike() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();

  const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [ridingGears, setRidingGears] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    window.scrollTo(0, 0); // Ensure page starts at top
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === path));
    }
  }, [cars, path, dispatch]);

  useEffect(() => {
    if (from && to) {
      const start = moment(from);
      const end = moment(to);
      const hours = end.diff(start, "hours");
      setTotalHours(hours > 0 ? hours : 0);
    } else {
      setTotalHours(0);
    }
  }, [from, to]);

  useEffect(() => {
    if (car && totalHours > 0) {
      let amount = totalHours * car.rentPerHour;
      if (ridingGears) {
        amount += 20 * totalHours;
      }
      setTotalAmount(amount);
    } else {
      setTotalAmount(0);
    }
  }, [ridingGears, totalHours, car]);

  function handleTimeChange(type, value) {
    if (type === "from") {
      setFrom(value);
    } else {
      setTo(value);
    }
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      ridingGearsRequired: ridingGears,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(BookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 bg-zinc-950">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black"></div>
        <img
          src={car.image}
          className="w-full h-full object-cover opacity-10 blur-3xl scale-110"
          alt="Ambience"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-start justify-center p-6 pt-[140px] md:pt-[180px]">
        <div className="bg-zinc-900/80 backdrop-blur-2xl border border-white/5 rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col lg:flex-row relative">

          {/* Left: Visuals - Fixed Aspect/Height consistency */}
          <div className="lg:w-1/2 relative bg-black flex flex-col justify-between h-96 lg:h-auto lg:min-h-[600px]">
            <div className="absolute inset-0 z-0">
              <img src={car.image} alt={car.name} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 p-8">
              <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition gap-2 mb-6">
                <ArrowLeft size={20} /> Back to Fleet
              </Link>
            </div>

            <div className="relative z-10 p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 text-xs font-bold uppercase tracking-wider mb-4">
                Premium Selection
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">{car.name}</h1>
              <div className="flex flex-wrap gap-4 text-zinc-300 text-sm font-medium">
                <div className="flex items-center gap-2"><Fuel size={16} className="text-yellow-500" /> {car.fuelType}</div>
                <div className="flex items-center gap-2"><Users size={16} className="text-yellow-500" /> {car.capacity} Seats</div>
                <div className="flex items-center gap-2"><Shield size={16} className="text-emerald-500" /> Insured</div>
              </div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2 font-['Outfit']">Configure Your Ride</h2>
              <p className="text-zinc-500">Select your dates to check availability and calculate exact pricing.</p>
            </div>

            <div className="space-y-6">
              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Pick-up</label>
                  <input
                    type="datetime-local"
                    className="w-full bg-transparent text-white border-none focus:ring-0 p-0 font-mono text-sm"
                    style={{ colorScheme: "dark" }}
                    onChange={(e) => handleTimeChange("from", e.target.value)}
                  />
                </div>
                <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Drop-off</label>
                  <input
                    type="datetime-local"
                    className="w-full bg-transparent text-white border-none focus:ring-0 p-0 font-mono text-sm"
                    style={{ colorScheme: "dark" }}
                    onChange={(e) => handleTimeChange("to", e.target.value)}
                  />
                </div>
              </div>

              {/* Extras */}
              <button
                onClick={() => setRidingGears(!ridingGears)}
                className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${ridingGears ? 'bg-yellow-500/10 border-yellow-500/50' : 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600'}`}
              >
                <div className="flex items-center gap-3">
                  <Shield size={20} className={ridingGears ? "text-yellow-500" : "text-zinc-500"} />
                  <div className="text-left">
                    <p className={`font-bold ${ridingGears ? 'text-yellow-400' : 'text-zinc-300'}`}>Safety Gear Package</p>
                    <p className="text-xs text-zinc-500">+₹20/hr • Helmet, Gloves, Pads</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${ridingGears ? 'border-yellow-500 bg-yellow-500' : 'border-zinc-600'}`}>
                  {ridingGears && <div className="w-2 h-2 rounded-full bg-black"></div>}
                </div>
              </button>

              <button
                className="text-sm text-zinc-500 hover:text-white underline decoration-zinc-700 underline-offset-4"
                onClick={() => setShowModal(true)}
              >
                View Unavailable Time Slots
              </button>

              {/* Total Summary - Always Visible */}
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5 animate-fade-up">
                {from && to && totalHours > 0 ? (
                  <>
                    <div className="flex justify-between mb-2 text-zinc-400 text-sm">
                      <span>Rate ({totalHours} hrs)</span>
                      <span>₹{car.rentPerHour * totalHours}</span>
                    </div>
                    {ridingGears && (
                      <div className="flex justify-between mb-4 text-zinc-400 text-sm">
                        <span>Gear Package</span>
                        <span>₹{20 * totalHours}</span>
                      </div>
                    )}
                    <div className="h-px bg-zinc-800 my-4"></div>
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold text-white">Total</span>
                      <span className="text-3xl font-black text-yellow-400">₹{totalAmount}</span>
                    </div>

                    <StripeCheckout
                      shippingAddress
                      token={onToken}
                      amount={totalAmount * 100}
                      currency="INR"
                      stripeKey="pk_test_51LChp4SE5wcmqxP8nYVqd0iLIUbj35nA1s9pmjTEROTdLHZZIujCcQX4uXSpdZSJJO62s4IHbfpNenR49GN1Zbem00p8aLkQ4N"
                    >
                      <button className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-xl text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                        CONFIRM & PAY
                      </button>
                    </StripeCheckout>
                  </>
                ) : (
                  <>
                    <div className="text-center py-4 space-y-3">
                      <p className="text-zinc-500 text-sm">Select pick-up and drop-off dates to calculate the total fare.</p>
                      <div className="h-px bg-zinc-800 my-4"></div>
                      <button
                        disabled
                        className="w-full bg-zinc-800 text-zinc-500 font-bold py-4 rounded-xl text-lg cursor-not-allowed border border-zinc-700 hover:bg-zinc-800 transition"
                      >
                        SELECT DATES FIRST
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white font-['Outfit']">Unavailable Slots</h3>
              <button onClick={() => setShowModal(false)} className="bg-zinc-800 p-2 rounded-full text-zinc-400 hover:text-white"><ArrowLeft size={16} /></button>
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {car.bookedTimeSlots.map((slot, idx) => (
                <div key={idx} className="bg-black/50 border border-zinc-800 p-3 rounded-lg flex items-center gap-3 text-zinc-400">
                  <Clock size={16} className="text-red-500" />
                  <span className="font-mono text-sm">{slot.from} — {slot.to}</span>
                </div>
              ))}
              {car.bookedTimeSlots.length === 0 && <p className="text-zinc-500 text-center py-4">No bookings yet. You're the first!</p>}
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default BookingBike;
