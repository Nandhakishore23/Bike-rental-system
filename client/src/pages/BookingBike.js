// // import React, { useEffect, useState } from "react";
// // import DefaultLayout from "../components/DefaultLayout";
// // import { useLocation } from "react-router";
// // import { useSelector, useDispatch } from "react-redux";
// // import { getAllCars } from "../redux/actions/carsActions";
// // import { BookCar } from "../redux/actions/bookingActions";
// // import Spinner from "../components/Spinner";
// // import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
// // import moment from "moment";
// // import StripeCheckout from "react-stripe-checkout";
// // const { RangePicker } = DatePicker;
// // function BookingBike({ match }) {
// //   const { cars } = useSelector((state) => state.carsReducer);
// //   const { loading } = useSelector((state) => state.alertsReducer);

// //   const dispatch = useDispatch();

// //   const [car, setCar] = useState({});

// //   const [from, setFrom] = useState();
// //   const [to, setTo] = useState();
// //   const [totalHours, setTotalHours] = useState();
// //   const [ridingGears, setRidingGears] = useState(false);
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const [showModal, setShowModal] = useState(false);
// //   const location = useLocation();
// //   const path = location.pathname.split("/")[2];
// //   useEffect(() => {
// //     if (cars.length === 0) {
// //       dispatch(getAllCars());
// //     } else {
// //       setCar(cars.find((o) => o._id === path));
// //     }
// //   }, [cars, path]);

// //   useEffect(() => {
// //     setTotalAmount(totalHours * car.rentPerHour);
// //     if (ridingGears) {
// //       setTotalAmount(totalAmount + 20 * totalHours);
// //     }
// //   }, [ridingGears, totalHours]);

// //   function selectTimeSlot(values) {
// //     setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
// //     setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

// //     setTotalHours(values[1].diff(values[0], "hours"));
// //   }

// //   function onToken(token) {
// //     const reqObj = {
// //       token,
// //       user: JSON.parse(localStorage.getItem("user"))._id,
// //       car: car._id,
// //       totalHours,
// //       totalAmount,
// //       ridingGearsRequired: ridingGears,
// //       bookedTimeSlots: {
// //         from,
// //         to,
// //       },
// //     };
// //     dispatch(BookCar(reqObj));
// //   }

// //   return (
// //     <DefaultLayout>
// //       {loading && <Spinner />}
// //       <Row
// //         justify="center"
// //         className="d-flex align-items-center"
// //         style={{ minHeight: "90vh" }}
// //       >
// //         <Col lg={10} sm={24} xs={24}>
// //           <img
// //             src={car.image}
// //             alt=""
// //             className="carimg2"
// //             data-aos="flip-left"
// //             data-aos-duration="1500"
// //           />
// //         </Col>
// //         <Col lg={10} sm={24} xs={24} className="p-3 text-right">
// //           <Divider
// //             type="horizontal"
// //             dashed
// //             style={{ borderColor: "tomato", borderWidth: "0px" }}
// //           >
// //             Bike Info
// //           </Divider>
// //           <div style={{ textAlign: "right" }}>
// //             <p>{car.name}</p>
// //             <p>{car.rentPerHour} Rent Per hour /-</p>
// //             <p>Fuel Type : {car.fuelType}</p>
// //             <p>Max Persons : {car.capacity}</p>
// //           </div>
// //           <Divider
// //             type="horizontal"
// //             dashed
// //             style={{ borderColor: "tomato", borderWidth: "0px" }}
// //           >
// //             Select Time Slot
// //           </Divider>
// //           <RangePicker
// //             showTime={{ format: "HH:mm" }}
// //             format="MMM DD YYYY HH:mm"
// //             onChange={selectTimeSlot}
// //             style={{ border: "1.5px solid #f1c40f" }}
// //           />
// //           <br />
// //           <button
// //             className="btn1 mt-2"
// //             onClick={() => {
// //               setShowModal(true);
// //             }}
// //             style={{ width: "150px", height: "40px" }}
// //           >
// //             See Booked Slots
// //           </button>
// //           {from && to && (
// //             <div>
// //               <p>
// //                 Total Hours : <b>{totalHours}</b>
// //               </p>
// //               <p>
// //                 Rent Per Hour : <b>{car.rentPerHour}</b>
// //               </p>
// //               <Checkbox
// //                 onChange={(e) => {
// //                   if (e.target.checked) {
// //                     setRidingGears(true);
// //                   } else {
// //                     setRidingGears(false);
// //                   }
// //                 }}
// //               >
// //                 Require Riding Gears
// //               </Checkbox>
// //               <h3>Total Amount : {totalAmount}</h3>
// //               <StripeCheckout
// //                 shippingAddress
// //                 token={onToken}
// //                 amount={totalAmount * 100}
// //                 currency="INR"
// //                 stripeKey="pk_test_51LChp4SE5wcmqxP8nYVqd0iLIUbj35nA1s9pmjTEROTdLHZZIujCcQX4uXSpdZSJJO62s4IHbfpNenR49GN1Zbem00p8aLkQ4N"
// //               >
// //                 <button className="btn1">Book Now</button>
// //               </StripeCheckout>
// //             </div>
// //           )}
// //         </Col>
// //       </Row>

// //       {car.name && (
// //         <Modal
// //           visible={showModal}
// //           closable={false}
// //           footer={false}
// //           title="Booked time slots"
// //         >
// //           <div className="p-2">
// //             {car.bookedTimeSlots.map((slot) => {
// //               return (
// //                 <button className="btn1 mt-2">
// //                   {slot.from} - {slot.to}
// //                 </button>
// //               );
// //             })}

// //             <div className="text-right mt-5">
// //               <button
// //                 className="btn1"
// //                 onClick={() => {
// //                   setShowModal(false);
// //                 }}
// //               >
// //                 CLOSE
// //               </button>
// //             </div>
// //           </div>
// //         </Modal>
// //       )}
// //     </DefaultLayout>
// //   );
// // }

// // export default BookingBike;


// import React, { useEffect, useState } from "react";
// import DefaultLayout from "../components/DefaultLayout";
// import { useLocation } from "react-router";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllCars } from "../redux/actions/carsActions";
// import { BookCar } from "../redux/actions/bookingActions";
// import Spinner from "../components/Spinner";
// import moment from "moment";
// import StripeCheckout from "react-stripe-checkout";

// function BookingBike() {
//   const { cars } = useSelector((state) => state.carsReducer);
//   const { loading } = useSelector((state) => state.alertsReducer);

//   const dispatch = useDispatch();

//   const [car, setCar] = useState({});
//   const [from, setFrom] = useState();
//   const [to, setTo] = useState();
//   const [totalHours, setTotalHours] = useState(0);
//   const [ridingGears, setRidingGears] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [showModal, setShowModal] = useState(false);

//   const location = useLocation();
//   const path = location.pathname.split("/")[2];

//   useEffect(() => {
//     if (cars.length === 0) {
//       dispatch(getAllCars());
//     } else {
//       setCar(cars.find((o) => o._id === path));
//     }
//   }, [cars, path, dispatch]);

//   useEffect(() => {
//     if (car && totalHours) {
//       let amount = totalHours * car.rentPerHour;
//       if (ridingGears) {
//         amount += 20 * totalHours;
//       }
//       setTotalAmount(amount);
//     }
//   }, [ridingGears, totalHours, car]);

//   function handleTimeChange(type, value) {
//     if (type === "from") {
//       setFrom(value);
//     } else {
//       setTo(value);
//     }

//     if (from && to) {
//       const start = moment(from);
//       const end = moment(to);
//       setTotalHours(end.diff(start, "hours"));
//     }
//   }

//   function onToken(token) {
//     const reqObj = {
//       token,
//       user: JSON.parse(localStorage.getItem("user"))._id,
//       car: car._id,
//       totalHours,
//       totalAmount,
//       ridingGearsRequired: ridingGears,
//       bookedTimeSlots: {
//         from,
//         to,
//       },
//     };
//     dispatch(BookCar(reqObj));
//   }

//   return (
//     <DefaultLayout>
//       {loading && <Spinner />}

//       <div className="flex flex-col lg:flex-row items-center justify-center min-h-[90vh] gap-6">
//         {/* Bike Image */}
//         <div className="lg:w-1/2 w-full flex justify-center">
//           <img
//             src={car.image}
//             alt={car.name}
//             className="max-w-sm rounded-lg shadow-lg"
//             data-aos="flip-left"
//             data-aos-duration="1500"
//           />
//         </div>

//         {/* Bike Info */}
//         <div className="lg:w-1/2 w-full p-4 text-right">
//           <h2 className="text-lg font-semibold border-b border-dashed border-gray-400 mb-2 pb-1">
//             Bike Info
//           </h2>
//           <div>
//             <p>{car.name}</p>
//             <p>{car.rentPerHour} Rent Per hour /-</p>
//             <p>Fuel Type : {car.fuelType}</p>
//             <p>Max Persons : {car.capacity}</p>
//           </div>

//           {/* Time Slot */}
//           <h2 className="text-lg font-semibold border-b border-dashed border-gray-400 mt-6 mb-2 pb-1">
//             Select Time Slot
//           </h2>
//           <div className="flex gap-3 mt-2">
//             <input
//               type="datetime-local"
//               className="border border-yellow-400 rounded px-3 py-2 w-full focus:ring focus:ring-yellow-500"
//               onChange={(e) => handleTimeChange("from", e.target.value)}
//             />
//             <input
//               type="datetime-local"
//               className="border border-yellow-400 rounded px-3 py-2 w-full focus:ring focus:ring-yellow-500"
//               onChange={(e) => handleTimeChange("to", e.target.value)}
//             />
//           </div>

//           {/* See booked slots */}
//           <button
//             className="bg-gray-800 text-white px-4 py-2 rounded mt-3 hover:bg-gray-900"
//             onClick={() => setShowModal(true)}
//           >
//             See Booked Slots
//           </button>

//           {from && to && (
//             <div className="mt-4 space-y-2">
//               <p>
//                 Total Hours : <b>{totalHours}</b>
//               </p>
//               <p>
//                 Rent Per Hour : <b>{car.rentPerHour}</b>
//               </p>

//               {/* Riding Gears Checkbox */}
//               <label className="flex items-center justify-end gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                   onChange={(e) => setRidingGears(e.target.checked)}
//                 />
//                 <span>Require Riding Gears</span>
//               </label>

//               <h3 className="text-lg font-semibold">
//                 Total Amount : ₹{totalAmount}
//               </h3>

//               {/* Stripe Checkout */}
//               <StripeCheckout
//                 shippingAddress
//                 token={onToken}
//                 amount={totalAmount * 100}
//                 currency="INR"
//                 stripeKey="pk_test_51LChp4SE5wcmqxP8nYVqd0iLIUbj35nA1s9pmjTEROTdLHZZIujCcQX4uXSpdZSJJO62s4IHbfpNenR49GN1Zbem00p8aLkQ4N"
//               >
//                 <button className="bg-blue-600 text-white px-6 py-2 rounded mt-2 hover:bg-blue-700 transition">
//                   Book Now
//                 </button>
//               </StripeCheckout>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modal */}
//       {car.name && showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Booked Time Slots</h2>
//             <div className="space-y-2">
//               {car.bookedTimeSlots?.map((slot, idx) => (
//                 <button
//                   key={idx}
//                   className="bg-blue-500 text-white px-3 py-1 rounded w-full"
//                 >
//                   {slot.from} - {slot.to}
//                 </button>
//               ))}
//             </div>
//             <div className="text-right mt-5">
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//                 onClick={() => setShowModal(false)}
//               >
//                 CLOSE
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </DefaultLayout>
//   );
// }

// export default BookingBike;


import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import { BookCar } from "../redux/actions/bookingActions";
import Spinner from "../components/Spinner";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";

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
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === path));
    }
  }, [cars, path, dispatch]);

  useEffect(() => {
    if (car && totalHours) {
      let amount = totalHours * car.rentPerHour;
      if (ridingGears) {
        amount += 20 * totalHours;
      }
      setTotalAmount(amount);
    }
  }, [ridingGears, totalHours, car]);

  function handleTimeChange(type, value) {
    if (type === "from") {
      setFrom(value);
    } else {
      setTo(value);
    }

    if (from && to) {
      const start = moment(from);
      const end = moment(to);
      setTotalHours(end.diff(start, "hours"));
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

      <div className="flex flex-col lg:flex-row items-start justify-center min-h-[90vh] gap-8 px-4 py-6">
        {/* Bike Image */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <img
            src={car.image}
            alt={car.name}
            className="w-full max-w-md rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Booking Section */}
        <div className="lg:w-1/2 w-full bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
            {car.name || "Bike Info"}
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Rent:</span> ₹{car.rentPerHour} / hr
            </p>
            <p>
              <span className="font-medium">Fuel:</span> {car.fuelType}
            </p>
            <p>
              <span className="font-medium">Capacity:</span> {car.capacity} persons
            </p>
          </div>

          {/* Time Slot */}
          <h2 className="text-lg font-semibold text-gray-800 mt-6">
            Select Time Slot
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <input
              type="datetime-local"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-yellow-500 outline-none"
              onChange={(e) => handleTimeChange("from", e.target.value)}
            />
            <input
              type="datetime-local"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-yellow-500 outline-none"
              onChange={(e) => handleTimeChange("to", e.target.value)}
            />
          </div>

          {/* See booked slots */}
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-900 transition w-full sm:w-auto"
            onClick={() => setShowModal(true)}
          >
            See Booked Slots
          </button>

          {from && to && (
            <div className="mt-6 space-y-3">
              <p className="text-gray-700">
                Total Hours: <b>{totalHours}</b>
              </p>
              <p className="text-gray-700">
                Rent Per Hour: <b>₹{car.rentPerHour}</b>
              </p>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                  onChange={(e) => setRidingGears(e.target.checked)}
                />
                <span>Require Riding Gears</span>
              </label>

              <h3 className="text-lg font-bold text-gray-900">
                Total Amount : ₹{totalAmount}
              </h3>

              {/* Stripe Checkout */}
              <StripeCheckout
                shippingAddress
                token={onToken}
                amount={totalAmount * 100}
                currency="INR"
                stripeKey="pk_test_51LChp4SE5wcmqxP8nYVqd0iLIUbj35nA1s9pmjTEROTdLHZZIujCcQX4uXSpdZSJJO62s4IHbfpNenR49GN1Zbem00p8aLkQ4N"
              >
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg mt-2 hover:bg-blue-700 transition">
                  🚴 Book Now
                </button>
              </StripeCheckout>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {car.name && showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Booked Time Slots
            </h2>
            <div className="space-y-2">
              {car.bookedTimeSlots?.map((slot, idx) => (
                <div
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-center font-medium"
                >
                  {slot.from} - {slot.to}
                </div>
              ))}
            </div>
            <button
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default BookingBike;
