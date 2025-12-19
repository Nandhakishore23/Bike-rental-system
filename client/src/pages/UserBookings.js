import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import Spinner from "../components/Spinner";
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css";
import { Calendar, Clock, MapPin, Receipt, X } from "lucide-react";

AOS.init();

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));

  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <div className="min-h-screen bg-zinc-950 pt-32 px-4 pb-20">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-900 pb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 font-['Outfit']">My Garage</h1>
              <p className="text-zinc-500">History of your premium rides and upcoming adventures.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-zinc-900 px-6 py-3 rounded-full border border-zinc-800">
                <span className="text-zinc-400 text-sm font-bold uppercase tracking-wider">Total Rides:</span>
                <span className="ml-2 text-yellow-500 font-black text-xl">{bookings.filter(o => o.user === user._id).length}</span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings
              .filter((o) => o.user === user._id)
              .map((booking, idx) => (
                <div
                  key={idx}
                  className="group relative bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                  data-aos="fade-up"
                  data-aos-delay={idx * 50}
                >
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={booking.car.image}
                      alt={booking.car.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>

                    <div className="absolute top-4 right-4">
                      <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {moment(booking.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 relative">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white font-['Outfit'] leading-none">
                        {booking.car.name}
                      </h3>
                      <div className="text-right">
                        <p className="text-yellow-500 font-black text-xl">₹{booking.totalAmount}</p>
                        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Total Paid</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-zinc-400 text-sm">
                        <Calendar size={16} className="text-zinc-600" />
                        <span>{moment(booking.bookedTimeSlots.from).format('MMM DD')} - {moment(booking.bookedTimeSlots.to).format('MMM DD')}</span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-400 text-sm">
                        <Clock size={16} className="text-zinc-600" />
                        <span>{booking.totalHours} Hours Ride</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2 group-hover:bg-yellow-500 group-hover:text-black group-hover:border-yellow-500"
                    >
                      <Receipt size={16} /> View Details
                    </button>

                    <div className="absolute bottom-0 left-0 h-1 bg-yellow-500 w-0 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Blueprint Style Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedBooking(null)}>
          <div className="bg-zinc-900 border border-zinc-700 w-full max-w-2xl rounded-sm shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>

            {/* Blueprint Grid Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="relative z-10 p-8">
              <div className="flex justify-between items-start mb-8 border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-3xl font-black text-white font-['Outfit'] uppercase tracking-tight">Booking Receipt</h2>
                  <p className="text-zinc-500 font-mono text-xs mt-1">ID: {selectedBooking.transactionId}</p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-row gap-8 mb-8">
                <div className="w-1/3">
                  <img src={selectedBooking.car.image} className="w-full h-32 object-cover rounded-sm border border-zinc-700 grayscale hover:grayscale-0 transition-all" alt="Bike" />
                </div>
                <div className="w-2/3 grid grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Vehicle</p>
                    <p className="text-white font-bold text-lg">{selectedBooking.car.name}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Rate</p>
                    <p className="text-white font-bold text-lg">₹{selectedBooking.car.rentPerHour}<span className="text-xs text-zinc-500 font-normal">/hr</span></p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Start Time</p>
                    <p className="text-zinc-300 font-mono text-sm">{moment(selectedBooking.bookedTimeSlots.from).format('MMM DD, HH:mm')}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">End Time</p>
                    <p className="text-zinc-300 font-mono text-sm">{moment(selectedBooking.bookedTimeSlots.to).format('MMM DD, HH:mm')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 p-6 border border-zinc-800 rounded-sm">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Total Amount Paid</span>
                  <span className="text-3xl font-black text-yellow-500">₹{selectedBooking.totalAmount}</span>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-zinc-600 text-xs">Thank you for choosing RideX. Drive safely.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default UserBookings;
