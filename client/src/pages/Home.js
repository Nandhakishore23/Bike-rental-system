// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import DefaultLayout from "../components/DefaultLayout";
// import { getAllCars } from "../redux/actions/carsActions";
// import { Col, Row, Divider, DatePicker, Checkbox, Card } from "antd";
// import { Link } from "react-router-dom";
// import Spinner from "../components/Spinner";
// import moment from "moment";
// const { RangePicker } = DatePicker;
// function Home() {
//   const { cars } = useSelector((state) => state.carsReducer);
//   const { loading } = useSelector((state) => state.alertsReducer);
//   const [totalCars, setTotalcars] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllCars());
//   }, []);

//   useEffect(() => {
//     setTotalcars(cars);
//   }, [cars]);

//   function setFilter(values) {
//     var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
//     var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

//     var temp = [];

//     for (var car of cars) {
//       if (car.bookedTimeSlots.length === 0) {
//         temp.push(car);
//       } else {
//         var p = true;
//         for (var booking of car.bookedTimeSlots) {
//           if (
//             selectedFrom.isBetween(booking.from, booking.to) ||
//             selectedTo.isBetween(booking.from, booking.to) ||
//             moment(booking.from).isBetween(selectedFrom, selectedTo) ||
//             moment(booking.to).isBetween(selectedFrom, selectedTo)
//           ) {
//             p = false;
//           } else {
//           }
//         }
//         if (p) {
//           temp.push(car);
//         }
//       }
//     }

//     setTotalcars(temp);
//   }

//   return (
//     <DefaultLayout>
//       <Row className="mt-3" justify="center">
//         <Col lg={20} sm={24} className="d-flex justify-content-left">
//           <p>
//             <b>Check Availability </b> :{" "}
//           </p>
//           <br />
//           <RangePicker
//             showTime={{ format: "HH:mm" }}
//             format="MMM DD yyyy HH:mm"
//             onChange={setFilter}
//             style={{ border: "1.5px solid #f1c40f" }}
//           />
//         </Col>
//       </Row>

//       {loading === true && <Spinner />}

//       <Row justify="center" gutter={16}>
//         {totalCars.map((car) => {
//           return (
//             <Col
//               lg={7}
//               sm={20}
//               xs={20}
//               data-aos="flip-left"
//               data-aos-duration="1500"
//             >
//               <div style={{ marginBottom: "40px" }}></div>
//               <Card style={{ width: 300, borderRadius: "10px" , height: "270px" }}>

//               {/* <div className="car p-2 bs1"> */}
//                 <img
//                   src={car.image}
//                   alt=""
//                   className="carimg d-flex align-items-center"
//                   style={{marginBottom: "10px"}}
//                   />

//                 <div className="car-content d-flex align-items-center justify-content-between">
//                   <div className="text-left pl-2">
//                     <p>
//                       <b>{car.name}</b>
//                     </p>
//                     <p> Rent Per Hour: ₹{car.rentPerHour}</p>
//                   </div>

//                   <div>
//                     <Link to={`/booking/${car._id}`}>
//                       <button className="btn1 mr-2">Book Now</button>
//                     </Link>
//                   </div>
//                 </div>
//               {/* </div> */}
//                   </Card>
//             </Col>
//           );
//         })}
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default Home;



import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import moment from "moment";
import Chatbot from "../components/Chatbot";

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();

  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  function setFilter() {
    if (!from || !to) return;
    const selectedFrom = moment(from);
    const selectedTo = moment(to);

    const temp = [];
    for (let car of cars) {
      if (car.bookedTimeSlots.length === 0) {
        temp.push(car);
      } else {
        let available = true;
        for (let booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
            available = false;
            break;
          }
        }
        if (available) temp.push(car);
      }
    }
    setTotalcars(temp);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      {/* Availability Filter */}
      <div className="max-w-5xl mx-auto px-4 mt-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          🔎 Check Availability
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="datetime-local"
            className="border border-yellow-500 rounded px-3 py-2 focus:ring focus:ring-yellow-400 w-full sm:w-1/2"
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="datetime-local"
            className="border border-yellow-500 rounded px-3 py-2 focus:ring focus:ring-yellow-400 w-full sm:w-1/2"
            onChange={(e) => setTo(e.target.value)}
          />
          <button
            onClick={setFilter}
            className="bg-yellow-500 text-white px-5 py-2 rounded shadow hover:bg-yellow-600 transition"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Cars List */}
      <div className="max-w-6xl mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {totalCars.map((car, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col"
            data-aos="flip-left"
            data-aos-duration="1200"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                <p className="text-gray-600">₹{car.rentPerHour} / hour</p>
              </div>

              <div className="flex items-center justify-between mt-3">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {car.bookedTimeSlots.length === 0
                    ? "Available"
                    : "Partially Booked"}
                </span>
                <Link to={`/booking/${car._id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Chatbot />
    </DefaultLayout>
  );
}

export default Home;
