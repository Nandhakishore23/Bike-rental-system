// // import React, { useState, useEffect } from "react";
// // import DefaultLayout from "../components/DefaultLayout";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getAllBookings } from "../redux/actions/bookingActions";
// // import { Col, Row } from "antd";
// // import Spinner from "../components/Spinner";
// // import moment from "moment";
// // import AOS from "aos";
// // import "aos/dist/aos.css";
// // AOS.init();
// // function UserBookings() {
// //   const dispatch = useDispatch();
// //   const { bookings } = useSelector((state) => state.bookingsReducer);
// //   const { loading } = useSelector((state) => state.alertsReducer);
// //   const user = JSON.parse(localStorage.getItem("user"));
// //   useEffect(() => {
// //     dispatch(getAllBookings());
// //   }, []);

// //   return (
// //     <DefaultLayout>
// //       {loading && <Spinner />}
// //       <h3 className="text-center mt-2">My Bookings</h3>

// //       <Row justify="center" gutter={16}>
// //         <Col lg={18} sm={24}>
// //           {bookings
// //             .filter((o) => o.user === user._id)
// //             .map((booking) => {
// //               return (
// //                 <Row
// //                   gutter={16}
// //                   className="p-4 mt-3 text-left userbooking"
// //                   data-aos="fade-up"
// //                   style={{ height: "180px" }}
// //                 >
// //                   <Col lg={8} sm={24} style={{ fontSize: "15px" }}>
// //                     <p>
// //                       <b>{booking.car.name}</b>
// //                     </p>
// //                     <p>
// //                       Total hours : <b>{booking.totalHours}</b>
// //                     </p>
// //                     <p>
// //                       Rent per hour : ₹<b>{booking.car.rentPerHour}</b>
// //                     </p>
// //                     <p>
// //                       Total amount : ₹<b>{booking.totalAmount}</b>
// //                     </p>
// //                   </Col>

// //                   <Col lg={8} sm={24}>
// //                     <p>
// //                       Transaction Id : <b>{booking.transactionId}</b>
// //                     </p>
// //                     <p>
// //                       From: <b>{booking.bookedTimeSlots.from}</b>
// //                     </p>
// //                     <p>
// //                       To: <b>{booking.bookedTimeSlots.to}</b>
// //                     </p>
// //                     <p>
// //                       Date of booking:{" "}
// //                       <b>{moment(booking.createdAt).format("MMM DD yyyy")}</b>
// //                     </p>
// //                   </Col>

// //                   <Col lg={8} sm={24} className="text-right">
// //                     <img
// //                       src={booking.car.image}
// //                       height="140"
// //                       width="200"
// //                       className="p-2 "
// //                       alt=""
// //                       style={{ objectFit: "cover" }}
// //                     />
// //                   </Col>
// //                 </Row>
// //               );
// //             })}
// //         </Col>
// //       </Row>
// //     </DefaultLayout>
// //   );
// // }

// // export default UserBookings;


// import React, { useState, useEffect } from "react";
// import DefaultLayout from "../components/DefaultLayout";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllBookings } from "../redux/actions/bookingActions";
// import Spinner from "../components/Spinner";
// import moment from "moment";
// import AOS from "aos";
// import "aos/dist/aos.css";

// AOS.init();

// function UserBookings() {
//   const dispatch = useDispatch();
//   const { bookings } = useSelector((state) => state.bookingsReducer);
//   const { loading } = useSelector((state) => state.alertsReducer);
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     dispatch(getAllBookings());
//   }, [dispatch]);

//   return (
//     <DefaultLayout>
//       {loading && <Spinner />}

//       <h2 className="text-2xl font-bold text-center mt-4 mb-6 text-gray-800">
//         🚴 My Bookings
//       </h2>

//       <div className="container mx-auto px-4">
//         <div className="grid gap-6 lg:grid-cols-2">
//           {bookings
//             .filter((o) => o.user === user._id)
//             .map((booking, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
//                 data-aos="fade-up"
//                 data-aos-delay={idx * 100}
//               >
//                 {/* Left Info */}
//                 <div className="flex-1 space-y-2 text-sm sm:text-base text-gray-700">
//                   <h3 className="text-lg font-bold text-gray-900">
//                     {booking.car.name}
//                   </h3>
//                   <p>
//                     Total Hours: <b>{booking.totalHours}</b>
//                   </p>
//                   <p>
//                     Rent per Hour: ₹<b>{booking.car.rentPerHour}</b>
//                   </p>
//                   <p>
//                     Total Amount: ₹<b>{booking.totalAmount}</b>
//                   </p>
//                 </div>

//                 {/* Middle Info */}
//                 <div className="flex-1 space-y-2 text-sm sm:text-base text-gray-600">
//                   <p>
//                     Transaction Id:{" "}
//                     <b className="text-gray-800">{booking.transactionId}</b>
//                   </p>
//                   <p>
//                     From:{" "}
//                     <b className="text-gray-800">
//                       {booking.bookedTimeSlots.from}
//                     </b>
//                   </p>
//                   <p>
//                     To:{" "}
//                     <b className="text-gray-800">
//                       {booking.bookedTimeSlots.to}
//                     </b>
//                   </p>
//                   <p>
//                     Date of Booking:{" "}
//                     <b className="text-gray-800">
//                       {moment(booking.createdAt).format("MMM DD, YYYY")}
//                     </b>
//                   </p>
//                 </div>

//                 {/* Image */}
//                 <div className="w-full sm:w-40">
//                   <img
//                     src={booking.car.image}
//                     alt={booking.car.name}
//                     className="w-full h-28 object-cover rounded-lg shadow"
//                   />
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// }

// export default UserBookings;


import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import Spinner from "../components/Spinner";
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css";

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

      <h2 className="text-3xl font-extrabold text-center mt-6 mb-10 text-gray-800">
        🚴 My Bookings
      </h2>

      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {bookings
            .filter((o) => o.user === user._id)
            .map((booking, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Image */}
                <img
                  src={booking.car.image}
                  alt={booking.car.name}
                  className="w-full h-40 object-cover"
                />

                {/* Content */}
                <div className="p-3 flex flex-col justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    {booking.car.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    ₹{booking.car.rentPerHour} / hour
                  </p>

                  <div className="mt-4 flex justify-between gap-4 items-center">
                    <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {booking.totalHours} hrs
                    </span>
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal for Booking Details */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>

            {/* Modal Content */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedBooking.car.name}
            </h3>

            <img
              src={selectedBooking.car.image}
              alt={selectedBooking.car.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <div className="space-y-3 text-gray-700 text-sm sm:text-base">
              <p>
                <b>Total Hours:</b> {selectedBooking.totalHours}
              </p>
              <p>
                <b>Rent per Hour:</b> ₹{selectedBooking.car.rentPerHour}
              </p>
              <p>
                <b>Total Amount:</b> ₹{selectedBooking.totalAmount}
              </p>
              <p>
                <b>Transaction ID:</b> {selectedBooking.transactionId}
              </p>
              <p>
                <b>From:</b> {selectedBooking.bookedTimeSlots.from}
              </p>
              <p>
                <b>To:</b> {selectedBooking.bookedTimeSlots.to}
              </p>
              <p>
                <b>Date of Booking:</b>{" "}
                {moment(selectedBooking.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default UserBookings;
