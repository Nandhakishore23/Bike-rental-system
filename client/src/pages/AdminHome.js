// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import DefaultLayout from "../components/DefaultLayout";
// import { deleteBike, getAllCars } from "../redux/actions/carsActions";
// import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
// import { Link } from "react-router-dom";
// import Spinner from "../components/Spinner";
// import moment from "moment";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { Popconfirm, message } from "antd";
// const { RangePicker } = DatePicker;
// function AdminHome() {
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

//   return (
//     <DefaultLayout>
//       <Row justify="center" gutter={16} className="mt-2">
//         <Col lg={20} sm={24}>
//           <div className="d-flex justify-content-between align-items-center">
//             <h3 className="mt-1 mr-2">Admin Panel</h3>
//             <button className="btn1">
//               <a href="/addbike">ADD BIKE</a>
//             </button>
//           </div>
//         </Col>
//       </Row>

//       {loading === true && <Spinner />}

//       <Row justify="center" gutter={16}>
//         {totalCars.map((car) => {
//           return (
//             <Col lg={5} sm={24} xs={24} key={Math.random()}>
//               <div className="car p-2 bs1">
//                 <img src={car.image} className="carimg" alt="" />

//                 <div className="car-content d-flex align-items-center justify-content-between">
//                   <div className="text-left pl-2">
//                     <p>{car.name}</p>
//                     <p> Rent Per Hour {car.rentPerHour} /-</p>
//                   </div>

//                   <div className="mr-4">
//                     <Link to={`/editbike/${car._id}`}>
//                       <EditOutlined
//                         className="mr-3"
//                         style={{ color: "green", cursor: "pointer" }}
//                       />
//                     </Link>

//                     <Popconfirm
//                       title="Are you sure to delete this car?"
//                       onConfirm={() => {
//                         dispatch(deleteBike({ carid: car._id }));
//                       }}
//                       okText="Yes"
//                       cancelText="No"
//                     >
//                       <DeleteOutlined
//                         style={{ color: "red", cursor: "pointer" }}
//                       />
//                     </Popconfirm>
//                   </div>
//                 </div>
//               </div>
//             </Col>
//           );
//         })}
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default AdminHome;



import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteBike, getAllCars } from "../redux/actions/carsActions";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  return (
    <DefaultLayout>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-black">
          Admin Panel
        </h3>
        <Link
          to="/addbike"
          className="px-5 py-2 rounded-lg font-medium text-white 
                     bg-gradient-to-r from-indigo-500 to-purple-500 
                     shadow-md hover:shadow-xl hover:from-purple-500 hover:to-pink-500 
                     transition-all duration-300"
        >
          + Add Bike
        </Link>
      </div>

      {/* Spinner */}
      {loading && <Spinner />}

      {/* Bikes Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {totalCars.map((car) => (
          <div
            key={car._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-black ">
                  {car.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Rent Per Hour:{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {car.rentPerHour} /-
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {/* Edit Button */}
                <Link
                  to={`/editbike/${car._id}`}
                  className="text-green-600 hover:text-green-800 transition"
                  title="Edit"
                >
                  ✏️
                </Link>

                {/* Delete Button with Confirm */}
                <button
                  onClick={() => {
                    if (
                      window.confirm("Are you sure you want to delete this bike?")
                    ) {
                      dispatch(deleteBike({ carid: car._id }));
                    }
                  }}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
}

export default AdminHome;
