// import { Col, Row, Form, Input } from "antd";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DefaultLayout from "../components/DefaultLayout";
// import Spinner from "../components/Spinner";
// import { addBike } from "../redux/actions/carsActions";
// function AddBike() {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.alertsReducer);

//   function onFinish(values) {
//     values.bookedTimeSlots = [];

//     dispatch(addBike(values));
//     console.log(values);
//   }

//   return (
//     <DefaultLayout>
//       {loading && <Spinner />}
//       <Row justify="center mt-5">
//         <Col lg={12} sm={24} xs={24} className="p-2">
//           <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
//             <h3>Add New Bike</h3>
//             <hr />
//             <Form.Item
//               name="name"
//               label="Bike name"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="image"
//               label="Image url"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="rentPerHour"
//               label="Rent per hour"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="capacity"
//               label="Capacity"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="mileage"
//               label="Mileage"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="fuelType"
//               label="Fuel Type"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>

//             <div className="text-right">
//               <button className="btn1">ADD BIKE</button>
//             </div>
//           </Form>
//         </Col>
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default AddBike;


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addBike } from "../redux/actions/carsActions";

function AddBike() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    values.bookedTimeSlots = [];
    dispatch(addBike(values));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <div className="flex justify-center items-center mt-8 px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Heading */}
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              🚲 Add New Bike
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Enter the bike details below to add it to the system.
            </p>
            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Bike Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Bike Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Yamaha R15"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none
                           dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Image URL
              </label>
              <input
                type="url"
                name="image"
                required
                placeholder="https://example.com/bike.jpg"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none
                           dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>

            {/* Rent Per Hour */}
            <div>
              <label
                htmlFor="rentPerHour"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Rent per Hour
              </label>
              <input
                type="number"
                name="rentPerHour"
                required
                placeholder="e.g. 150"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none
                           dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>

            {/* Capacity */}
            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                required
                placeholder="e.g. 2"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none
                           dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>

            {/* Mileage */}
            <div>
              <label
                htmlFor="mileage"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Mileage
              </label>
              <input
                type="number"
                name="mileage"
                required
                placeholder="e.g. 40"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none
                           dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label
                htmlFor="fuelType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Fuel Type
              </label>
              <input
                type="text"
                name="fuelType"
                required
                placeholder="e.g. Petrol / Electric"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none
                           dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg font-medium text-white 
                           bg-gradient-to-r from-indigo-500 to-purple-500 
                           shadow-md hover:shadow-lg hover:from-purple-500 hover:to-pink-500 
                           transition-all duration-300"
              >
                + Add Bike
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default AddBike;
