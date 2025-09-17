// // // import React from "react";
// // // // import DefaultLayout from "../components/DefaultLayout";
// // // import { Row, Col, Form, Input } from "antd";
// // // import { Link } from "react-router-dom";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { userRegister } from "../redux/actions/userActions";
// // // import AOS from "aos";
// // // import Spinner from "../components/Spinner";
// // // import "aos/dist/aos.css"; // You can also use <link> for styles
// // // // ..
// // // import "../index.css";
// // // AOS.init();

// // // function Register() {
// // //   const dispatch = useDispatch();
// // //   const { loading } = useSelector((state) => state.alertsReducer);
// // //   function onFinish(values) {
// // //     dispatch(userRegister(values));
// // //     console.log(values);
// // //   }
// // //   return (
// // //     <div className="login">
// // //       {loading && <Spinner />}
// // //       {/* <Row gutter={16} className="d-flex align-items-center"> */}
// // //         {/* <Col lg={16} style={{ position: "relative" }}>
// // //           <img
// // //             src={require("../images/bike.png")}
// // //             alt=""
// // //             className="w-100"
// // //             data-aos="slide-left"
// // //             data-aos-duration="2000"
// // //           />

// // //           <h1 className="login-logo">
// // //             Z<i className="fa-solid fa-person-biking" />
// // //             pRides
// // //           </h1>
// // //         </Col> */}
// // //         <Col className="text-center p-3 center">
// // //           <Form
// // //             layout="vertical"
// // //             className="login-form p-5"
// // //             onFinish={onFinish}
// // //           >
// // //             <h1>User Registration</h1>
// // //             <hr />
// // //             <Form.Item
// // //               hasFeedback
// // //               name="username"
// // //               label="Username"
// // //               validateDebounce={1000}
// // //               rules={[{ required: true, max: 20, min:1 }]}
// // //             >
// // //               <Input />
// // //             </Form.Item>
// // //             <Form.Item
// // //               hasFeedback
// // //               name="password"
// // //               label="Password"
// // //               validateDebounce={1000}
// // //               rules={[{ required: true, min: 6, max: 20 }]}
// // //             >
// // //               <Input.Password />
// // //             </Form.Item>
// // //             <Form.Item
// // //               hasFeedback
// // //               name="cpassword"
// // //               label="Confirm Password"
// // //               validateDebounce={1000}
// // //               dependencies={["password"]}
// // //               rules={[
// // //                 { required: true, message: "Please confirm your password" },
// // //                 ({ getFieldValue }) => ({
// // //                   validator(_, value) {
// // //                     if (!value || getFieldValue("password") === value) {
// // //                       return Promise.resolve();
// // //                     }
// // //                     return Promise.reject(
// // //                       new Error("Passwords do not match!")
// // //                     );
// // //                   },
// // //                 }),
// // //               ]}
// // //             >
// // //               <Input.Password />
// // //             </Form.Item>

// // //             <button className="btn1 mt-2 mb-3">Register</button>
// // //             <br />
// // //             <Link to={"/login"}>
// // //               <p className="mt-2">User Login</p>
// // //             </Link>
// // //             <Link to={"/adminregister"}>
// // //               <p className="mt-2">Admin Register</p>
// // //             </Link>
// // //           </Form>
// // //         </Col>
// // //       {/* </Row> */}
// // //     </div>
// // //   );
// // // }

// // // export default Register;


// // import React from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { userRegister } from "../redux/actions/userActions";
// // import { Link } from "react-router-dom";
// // import Spinner from "../components/Spinner";
// // import { FaUserAlt, FaLock } from "react-icons/fa";

// // function Register() {
// //   const dispatch = useDispatch();
// //   const { loading } = useSelector((state) => state.alertsReducer);

// //   function onFinish(e) {
// //     e.preventDefault();
// //     const values = {
// //       username: e.target.username.value,
// //       password: e.target.password.value,
// //       cpassword: e.target.cpassword.value,
// //     };
// //     if (values.password !== values.cpassword) {
// //       alert("Passwords do not match!");
// //       return;
// //     }
// //     dispatch(userRegister(values));
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
// //       {/* Background Animated Blobs */}
// //       <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-80 sm:h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
// //       <div className="absolute top-36 -right-16 w-80 h-80 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
// //       <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

// //       {loading && <Spinner />}

// //       {/* Glassmorphic User Register Card */}
// //       <form
// //         onSubmit={onFinish}
// //         className="relative z-10 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl 
// //                    backdrop-blur-2xl bg-white/10 border border-white/20
// //                    transition-transform hover:scale-[1.02]"
// //       >
// //         {/* Title */}
// //         <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-2 tracking-wide">
// //           User Registration
// //         </h1>
// //         <p className="text-center text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
// //           Create your account to enjoy rides 🚴
// //         </p>

// //         {/* Username */}
// //         <div className="mb-3 sm:mb-4">
// //           <label className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
// //             Username
// //           </label>
// //           <div className="flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/20 text-white 
// //                           border border-white/30 focus-within:ring-2 focus-within:ring-purple-400">
// //             <FaUserAlt className="mr-2 sm:mr-3 text-gray-300" />
// //             <input
// //               type="text"
// //               name="username"
// //               required
// //               className="w-full bg-transparent outline-none placeholder-gray-300 text-white text-sm sm:text-base"
// //               placeholder="Enter username"
// //             />
// //           </div>
// //         </div>

// //         {/* Password */}
// //         <div className="mb-3 sm:mb-4">
// //           <label className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
// //             Password
// //           </label>
// //           <div className="flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/20 text-white 
// //                           border border-white/30 focus-within:ring-2 focus-within:ring-pink-400">
// //             <FaLock className="mr-2 sm:mr-3 text-gray-300" />
// //             <input
// //               type="password"
// //               name="password"
// //               required
// //               className="w-full bg-transparent outline-none placeholder-gray-300 text-white text-sm sm:text-base"
// //               placeholder="Enter password"
// //             />
// //           </div>
// //         </div>

// //         {/* Confirm Password */}
// //         <div className="mb-5 sm:mb-6">
// //           <label className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
// //             Confirm Password
// //           </label>
// //           <div className="flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/20 text-white 
// //                           border border-white/30 focus-within:ring-2 focus-within:ring-pink-400">
// //             <FaLock className="mr-2 sm:mr-3 text-gray-300" />
// //             <input
// //               type="password"
// //               name="cpassword"
// //               required
// //               className="w-full bg-transparent outline-none placeholder-gray-300 text-white text-sm sm:text-base"
// //               placeholder="Confirm password"
// //             />
// //           </div>
// //         </div>

// //         {/* Register Button */}
// //         <button
// //           type="submit"
// //           className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 
// //                      text-white font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 
// //                      transition-transform transform hover:scale-105 text-sm sm:text-base"
// //         >
// //           Register
// //         </button>

// //         {/* Links */}
// //         <div className="text-center mt-5 sm:mt-6 space-y-1">
// //           <Link
// //             to="/login"
// //             className="block text-xs sm:text-sm text-pink-300 hover:text-pink-400 transition"
// //           >
// //             User Login
// //           </Link>
// //           <Link
// //             to="/adminregister"
// //             className="block text-xs sm:text-sm text-purple-300 hover:text-purple-400 transition"
// //           >
// //             Admin Register
// //           </Link>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Register;



// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { userRegister } from "../redux/actions/userActions";
// import { Link, useHistory } from "react-router-dom"; // ✅ useHistory instead of useNavigate
// import Spinner from "../components/Spinner";
// import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";

// function Register() {
//   const dispatch = useDispatch();
//   const history = useHistory(); // ✅ works with React Router v5
//   const { loading } = useSelector((state) => state.alertsReducer);

//   function onFinish(e) {
//     e.preventDefault();
//     const values = {
//       username: e.target.username.value,
//       email: e.target.email.value, // ✅ added email
//       password: e.target.password.value,
//       cpassword: e.target.cpassword.value,
//     };

//     if (values.password !== values.cpassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     dispatch(userRegister(values));
//     history.push("/login"); // ✅ redirect after register
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
//       {/* Background Animated Blobs */}
//       <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-80 sm:h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//       <div className="absolute top-36 -right-16 w-80 h-80 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//       <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

//       {loading && <Spinner />}

//       {/* Glassmorphic User Register Card */}
//       <form
//         onSubmit={onFinish}
//         className="relative z-10 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl 
//                    backdrop-blur-2xl bg-white/10 border border-white/20
//                    transition-transform hover:scale-[1.02]"
//       >
//         {/* Title */}
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-2 tracking-wide">
//           User Registration
//         </h1>
//         <p className="text-center text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
//           Create your account to enjoy rides 🚴
//         </p>

//         {/* Username */}
//         <div className="mb-3 sm:mb-4">
//           <label className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
//             Username
//           </label>
//           <div className="flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/20 text-white 
//                           border border-white/30 focus-within:ring-2 focus-within:ring-purple-400">
//             <FaUserAlt className="mr-2 sm:mr-3 text-gray-300" />
//             <input
//               type="text"
//               name="username"
//               required
//               className="w-full bg-transparent outline-none placeholder-gray-300 text-white text-sm sm:text-base"
//               placeholder="Enter username"
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div className="mb-3 sm:mb-4">
//           <label className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
//             Email
//           </label>
//           <div className="flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/20 text-white 
//                           border border-white/30 focus-within:ring-2 focus-within:ring-blue-400">
//             <FaEnvelope className="mr-2 sm:mr-3 text-gray-300" />
//             <input
//               type="email"
//               name="email"
//               required
//               className="w-full bg-transparent outline-none placeholder-gray-300 text-white text-sm sm:text-base"
//               placeholder="Enter email"
//             />
//           </div>
//         </div>

//         {/* Password */}
//         <div className="mb-3 sm:mb-4">
//           <label className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
//             Password
//           </label>
//           <div className="flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/20 text-white 
//                           border border-white/30 focus-within:ring-2 focus-within:ring-pink-400">
//             <FaLock className="mr-2 sm:mr-3 text-gray-300" />
//             <input
//               type="password"
//               name="password"
//               required
//               className="w-full bg-transparent outline-none placeholder-gray-300 text-white text-sm sm:text-base"
//               placeholder="Enter password"
//             />
//           </div>
//         </div>

//         {/* Confirm Password */}
//         <div className="mb-5 sm:mb-6">
//           <label className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
//             Confirm Password
//           </label>
//           <div className="flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/20 text-white 
//                           border border-white/30 focus-within:ring-2 focus-within:ring-pink-400">
//             <FaLock className="mr-2 sm:mr-3 text-gray-300" />
//             <input
//               type="password"
//               name="cpassword"
//               required
//               className="w-full bg-transparent outline-none placeholder-gray-300 text-white text-sm sm:text-base"
//               placeholder="Confirm password"
//             />
//           </div>
//         </div>

//         {/* Register Button */}
//         <button
//           type="submit"
//           className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 
//                      text-white font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 
//                      transition-transform transform hover:scale-105 text-sm sm:text-base"
//         >
//           Register
//         </button>

//         {/* Links */}
//         <div className="text-center mt-5 sm:mt-6 space-y-1">
//           <Link
//             to="/login"
//             className="block text-xs sm:text-sm text-pink-300 hover:text-pink-400 transition"
//           >
//             User Login
//           </Link>
//           <Link
//             to="/adminregister"
//             className="block text-xs sm:text-sm text-purple-300 hover:text-purple-400 transition"
//           >
//             Admin Register
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Register;


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import { Link, useHistory } from "react-router-dom"; // ✅ React Router v5
import Spinner from "../components/Spinner";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state) => state.alertsReducer);

  async function onFinish(e) {
    e.preventDefault();
    const values = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      cpassword: e.target.cpassword.value,
    };

    if (values.password !== values.cpassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      console.log("Registering user:", values);
      await dispatch(userRegister(values)); // ✅ Redux action
      //alert("✅ Registration successful! Please login.");
      history.push("/login"); // ✅ Redirect to login
    } catch (err) {
      console.error("Register Error:", err.message);
      alert("❌ Registration failed, try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      {/* Background Blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-36 -right-16 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {loading && <Spinner />}

      {/* Form */}
      <form
        onSubmit={onFinish}
        className="relative z-10 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-2xl bg-white/10 border border-white/20 hover:scale-[1.02] transition-transform"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-2">
          User Registration
        </h1>
        <p className="text-center text-gray-300 mb-6 text-sm sm:text-base">
          Create your account to enjoy rides 🚴
        </p>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Username
          </label>
          <div className="flex items-center px-3 py-2 rounded-xl bg-white/20 border border-white/30 focus-within:ring-2 focus-within:ring-purple-400">
            <FaUserAlt className="mr-2 text-gray-300" />
            <input
              type="text"
              name="username"
              required
              className="w-full bg-transparent outline-none placeholder-gray-300 text-white"
              placeholder="Enter username"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Email
          </label>
          <div className="flex items-center px-3 py-2 rounded-xl bg-white/20 border border-white/30 focus-within:ring-2 focus-within:ring-blue-400">
            <FaEnvelope className="mr-2 text-gray-300" />
            <input
              type="email"
              name="email"
              required
              className="w-full bg-transparent outline-none placeholder-gray-300 text-white"
              placeholder="Enter email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Password
          </label>
          <div className="flex items-center px-3 py-2 rounded-xl bg-white/20 border border-white/30 focus-within:ring-2 focus-within:ring-pink-400">
            <FaLock className="mr-2 text-gray-300" />
            <input
              type="password"
              name="password"
              required
              className="w-full bg-transparent outline-none placeholder-gray-300 text-white"
              placeholder="Enter password"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Confirm Password
          </label>
          <div className="flex items-center px-3 py-2 rounded-xl bg-white/20 border border-white/30 focus-within:ring-2 focus-within:ring-pink-400">
            <FaLock className="mr-2 text-gray-300" />
            <input
              type="password"
              name="cpassword"
              required
              className="w-full bg-transparent outline-none placeholder-gray-300 text-white"
              placeholder="Confirm password"
            />
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Register
        </button>

        {/* Links */}
        <div className="text-center mt-5 space-y-1">
          <Link
            to="/login"
            className="block text-xs text-pink-300 hover:text-pink-400"
          >
            User Login
          </Link>
          <Link
            to="/adminregister"
            className="block text-xs text-purple-300 hover:text-purple-400"
          >
            Admin Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
