import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editBike, getAllCars } from "../redux/actions/carsActions";

function EditBike({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState(null);
  const [totalCars, setTotalCars] = useState([]);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setTotalCars(cars);
      setCar(cars.find((o) => o._id === match.params.carid));
    }
  }, [cars, dispatch, match.params.carid]);

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    values._id = car._id;
    dispatch(editBike(values));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <div className="flex justify-center items-center mt-8 px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
          {totalCars.length > 0 && car && (
            <form onSubmit={onSubmit} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                ✏️ Edit Bike
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Update details for{" "}
                <span className="font-semibold">{car.name}</span>
              </p>
              <hr className="border-gray-200 dark:border-gray-700" />

              {/* Car Name */}
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
                  defaultValue={car.name}
                  required
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
                  defaultValue={car.image}
                  required
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
                  defaultValue={car.rentPerHour}
                  required
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
                  defaultValue={car.capacity}
                  required
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
                  defaultValue={car.fuelType}
                  required
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
                             bg-gradient-to-r from-green-500 to-teal-500 
                             shadow-md hover:shadow-lg hover:from-teal-500 hover:to-green-600 
                             transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default EditBike;
