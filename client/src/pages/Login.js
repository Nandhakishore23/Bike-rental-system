// // // // import React from "react";
// // // // // import DefaultLayout from "../components/DefaultLayout";
// // // // import { Alert, Col, Form, Input } from "antd";
// // // // import { Link } from "react-router-dom";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { userLogin } from "../redux/actions/userActions";
// // // // import AOS from "aos";
// // // // import Spinner from "../components/Spinner";
// // // // import "aos/dist/aos.css"; // You can also use <link> for styles
// // // // // ..
// // // // import "../index.css";
// // // // AOS.init();

// // // // function Login() {
// // // //   const dispatch = useDispatch();
// // // //   const { loading } = useSelector((state) => state.alertsReducer);
// // // //   function onFinish(values) {
// // // //     dispatch(userLogin(values));
// // // //     console.log(values);
// // // //   }
// // // //   return (

// // // //     <div className="login">

// // // //       {loading && <Spinner />}
// // // //       {/* <Row gutter={32} className="d-flex align-items-center"> */}
// // // //         {/* <Col lg={16} style={{ position: "relative" }}>
// // // //           <img
// // // //             src={require("../images/bike.png")}
// // // //             alt=""
// // // //             className="w-100"
// // // //             data-aos="slide-right"
// // // //             data-aos-duration="2000"
// // // //           />

// // // //           <h1 className="login-logo">
// // // //             Z<i className="fa-solid fa-person-biking" />
// // // //             pRides
// // // //           </h1>
// // // //         </Col> */}
// // // //         <Col className="text-center p-3 center">
// // // //           <Form
// // // //             layout="vertical"
// // // //             className="login-form p-5"
// // // //             onFinish={onFinish}
// // // //           >
// // // //             <h1>User Login</h1>
// // // //             <hr />
// // // //             <Form.Item
// // // //               hasFeedback
// // // //               name="username"
// // // //               label="Username"
// // // //               validateDebounce={1000}
// // // //               rules={[{ required: true, max: 20, min:1 }]}
// // // //             >
// // // //               <Input />
// // // //             </Form.Item>
// // // //             <Form.Item
// // // //               hasFeedback
// // // //               label="Password"
// // // //               name="password"
// // // //               validateDebounce={1000}
// // // //               rules={[{ required: true, min: 6, max: 20 }]}
// // // //             >
// // // //               <Input.Password />
// // // //             </Form.Item>

// // // //             <button className="btn1 mt-2">Login</button>
// // // //             <br />
// // // //             <Link to={"/register"}>
// // // //               <p className="mt-2">User Register</p>
// // // //             </Link>
// // // //             <Link to={"/adminlogin"}>
// // // //               <p className="mt-2">Admin Login</p>
// // // //             </Link>
// // // //           </Form>
// // // //         </Col>
// // // //       {/* </Row> */}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Login;



// // // import React from "react";
// // // import { Link } from "react-router-dom";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { userLogin } from "../redux/actions/userActions";
// // // import Spinner from "../components/Spinner";
// // // import AOS from "aos";
// // // import "aos/dist/aos.css";

// // // AOS.init();

// // // function Login() {
// // //   const dispatch = useDispatch();
// // //   const { loading } = useSelector((state) => state.alertsReducer);

// // //   function onFinish(e) {
// // //     e.preventDefault();
// // //     const values = {
// // //       username: e.target.username.value,
// // //       password: e.target.password.value,
// // //     };
// // //     dispatch(userLogin(values));
// // //   }

// // //   return (
// // //     <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200">
// // //       {loading && <Spinner />}

// // //       {/* Left Illustration */}
// // //       <div
// // //         className="hidden md:flex flex-col items-center justify-center w-1/2 p-10"
// // //         data-aos="fade-right"
// // //         data-aos-duration="1200"
// // //       >
// // //         <img
// // //           src={require("../images/bike.png")}
// // //           alt="Bike"
// // //           className="w-4/5 drop-shadow-lg"
// // //         />
// // //         <h1 className="mt-6 text-4xl font-extrabold text-white drop-shadow-lg">
// // //           <span className="text-gray-900">🚴</span>Bike
// // //         </h1>
// // //         <p className="text-white mt-4 text-lg font-medium text-center">
// // //           Ride smarter, ride faster.  
// // //           Your journey begins here.
// // //         </p>
// // //       </div>

// // //       {/* Right Login Card */}
// // //       <div
// // //         className="w-full md:w-1/2 flex items-center justify-center p-6"
// // //         data-aos="fade-left"
// // //         data-aos-duration="1200"
// // //       >
// // //         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
// // //           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
// // //             User Login
// // //           </h2>

// // //           {/* Form */}
// // //           <form onSubmit={onFinish} className="space-y-5">
// // //             {/* Username */}
// // //             <div>
// // //               <label
// // //                 htmlFor="username"
// // //                 className="block text-sm font-medium text-gray-700 mb-1"
// // //               >
// // //                 Username
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 id="username"
// // //                 name="username"
// // //                 required
// // //                 maxLength={20}
// // //                 className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
// // //               />
// // //             </div>

// // //             {/* Password */}
// // //             <div>
// // //               <label
// // //                 htmlFor="password"
// // //                 className="block text-sm font-medium text-gray-700 mb-1"
// // //               >
// // //                 Password
// // //               </label>
// // //               <input
// // //                 type="password"
// // //                 id="password"
// // //                 name="password"
// // //                 required
// // //                 minLength={6}
// // //                 maxLength={20}
// // //                 className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
// // //               />
// // //             </div>

// // //             {/* Submit */}
// // //             <button
// // //               type="submit"
// // //               className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold shadow hover:bg-yellow-600 transition"
// // //             >
// // //               Login
// // //             </button>
// // //           </form>

// // //           {/* Links */}
// // //           <div className="mt-6 space-y-2 text-center text-sm text-gray-600">
// // //             <Link
// // //               to="/register"
// // //               className="block hover:text-yellow-600 transition"
// // //             >
// // //               User Register
// // //             </Link>
// // //             <Link
// // //               to="/adminlogin"
// // //               className="block hover:text-yellow-600 transition"
// // //             >
// // //               Admin Login
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Login;


// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { userLogin } from "../redux/actions/userActions";
// // import Spinner from "../components/Spinner";
// // import AOS from "aos";
// // import "aos/dist/aos.css";

// // AOS.init();

// // function Login() {
// //   const dispatch = useDispatch();
// //   const { loading } = useSelector((state) => state.alertsReducer);

// //   function onFinish(e) {
// //     e.preventDefault();
// //     const values = {
// //       username: e.target.username.value,
// //       password: e.target.password.value,
// //     };
// //     dispatch(userLogin(values));
// //   }

// //   return (
// //     // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200 p-6">
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-pink-300 to-purple-500 p-6">


// //       {loading && <Spinner />}

// //       <div
// //         className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8"
// //         data-aos="zoom-in"
// //         data-aos-duration="1000"
// //       >
// //         {/* Header */}
// //         <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
// //           Welcome Back 👋
// //         </h2>
// //         <p className="text-center text-gray-600 mb-8">
// //           Login to continue your journey
// //         </p>

// //         {/* Form */}
// //         <form onSubmit={onFinish} className="space-y-5">
// //           {/* Username */}
// //           <div>
// //             <label
// //               htmlFor="username"
// //               className="block text-sm font-medium text-gray-700 mb-1"
// //             >
// //               Username
// //             </label>
// //             <input
// //               type="text"
// //               id="username"
// //               name="username"
// //               required
// //               maxLength={20}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
// //             />
// //           </div>

// //           {/* Password */}
// //           <div>
// //             <label
// //               htmlFor="password"
// //               className="block text-sm font-medium text-gray-700 mb-1"
// //             >
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               id="password"
// //               name="password"
// //               required
// //               minLength={6}
// //               maxLength={20}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
// //             />
// //           </div>

// //           {/* Submit */}
// //           <button
// //             type="submit"
// //             className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold shadow hover:bg-yellow-600 transition"
// //           >
// //             Login
// //           </button>
// //         </form>

// //         {/* Links */}
// //         <div className="mt-6 space-y-2 text-center text-sm text-gray-600">
// //           <Link
// //             to="/register"
// //             className="block hover:text-yellow-600 transition"
// //           >
// //             Create a new account
// //           </Link>
// //           <Link
// //             to="/adminlogin"
// //             className="block hover:text-yellow-600 transition"
// //           >
// //             Admin Login
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;


// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { userLogin } from "../redux/actions/userActions";
// import { Link } from "react-router-dom";
// import Spinner from "../components/Spinner";

// function Login() {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.alertsReducer);

//   function onFinish(e) {
//     e.preventDefault();
//     const values = {
//       username: e.target.username.value,
//       password: e.target.password.value,
//     };
//     dispatch(userLogin(values));
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
//       {/* Background Glow Effects */}
//       <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//       <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

//       {loading && <Spinner />}

//       {/* Glassmorphic Card */}
//       <form
//         onSubmit={onFinish}
//         className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-xl 
//                    backdrop-blur-xl bg-white/10 border border-white/20"
//       >
//         <h1 className="text-3xl font-extrabold text-center text-white mb-6">
//           User Login
//         </h1>

//         {/* Username */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-200 mb-1">
//             Username
//           </label>
//           <input
//             type="text"
//             name="username"
//             required
//             className="w-full px-4 py-2 rounded-lg bg-white/20 text-white 
//                        placeholder-gray-300 border border-white/30 
//                        focus:ring-2 focus:ring-purple-400 outline-none"
//             placeholder="Enter username"
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-200 mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             required
//             className="w-full px-4 py-2 rounded-lg bg-white/20 text-white 
//                        placeholder-gray-300 border border-white/30 
//                        focus:ring-2 focus:ring-pink-400 outline-none"
//             placeholder="Enter password"
//           />
//         </div>

//         {/* Login Button */}
//         <button
//           type="submit"
//           className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 
//                      text-white font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 
//                      transition-transform transform hover:scale-105"
//         >
//           Login
//         </button>

//         {/* Links */}
//         <div className="text-center mt-4 space-y-1">
//           <Link to="/register" className="text-sm text-purple-300 hover:underline">
//             User Register
//           </Link>
//           <br />
//           <Link to="/adminlogin" className="text-sm text-pink-300 hover:underline">
//             Admin Login
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaUserAlt, FaLock } from "react-icons/fa";

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(e) {
    e.preventDefault();
    const values = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    dispatch(userLogin(values));
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">

      {/* Background Animated Blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {loading && <Spinner />}

      {/* Glassmorphic Login Card */}
      <form
        onSubmit={onFinish}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl shadow-2xl 
                   backdrop-blur-2xl bg-white/10 border border-white/20
                   transition-transform hover:scale-[1.01]"
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-white mb-2 tracking-wide">
          Welcome Back
        </h1>
        <p className="text-center text-gray-300 mb-8 text-sm">
          Login to continue your rides 🚴
        </p>

        {/* Username */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Username
          </label>
          <div className="flex items-center px-4 py-3 rounded-xl bg-white/20 text-white 
                          border border-white/30 focus-within:ring-2 focus-within:ring-purple-400">
            <FaUserAlt className="mr-3 text-gray-300" />
            <input
              type="text"
              name="username"
              required
              className="w-full bg-transparent outline-none placeholder-gray-300 text-white"
              placeholder="Enter username"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Password
          </label>
          <div className="flex items-center px-4 py-3 rounded-xl bg-white/20 text-white 
                          border border-white/30 focus-within:ring-2 focus-within:ring-pink-400">
            <FaLock className="mr-3 text-gray-300" />
            <input
              type="password"
              name="password"
              required
              className="w-full bg-transparent outline-none placeholder-gray-300 text-white"
              placeholder="Enter password"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 
                     text-white font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 
                     transition-transform transform hover:scale-105"
        >
          Login
        </button>

        {/* Links */}
        <div className="text-center mt-6 space-y-2">
          <Link
            to="/register"
            className="block text-sm text-purple-300 hover:text-purple-400 transition"
          >
            Don’t have an account? Register
          </Link>
          <Link
            to="/adminlogin"
            className="block text-sm text-pink-300 hover:text-pink-400 transition"
          >
            Admin Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
