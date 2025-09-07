// import React from "react";
// // import DefaultLayout from "../components/DefaultLayout";
// import { Col, Form, Input } from "antd";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { adminLogin } from "../redux/actions/adminActions";
// import AOS from "aos";
// import Spinner from "../components/Spinner";
// import "aos/dist/aos.css"; // You can also use <link> for styles
// import "../index.css";
// // ..
// AOS.init();

// function Login() {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.alertsReducer);
//   function onFinish(values) {
//     dispatch(adminLogin(values));
//     console.log(values);
//   }
//   return (
//     <div className="login">
//       {loading && <Spinner />}
//       {/* <Row gutter={16} className="d-flex align-items-center"> */}
//         {/* <Col lg={16} style={{ position: "relative" }}>
//           <img
//             src={require("../images/bike.png")}
//             alt=""
//             className="w-100"
//             data-aos="slide-right"
//             data-aos-duration="2000"
//           />

//           <h1 className="login-logo">
//             Z<i className="fa-solid fa-person-biking" />
//             pRides
//           </h1>
//         </Col> */}
//         <Col className="text-center p-3 center">
//           <Form
//             layout="vertical"
//             className="login-form p-5"
//             onFinish={onFinish}
//           >
//             <h1>Admin Login</h1>
//             <hr />
//             <Form.Item
//               hasFeedback
//               name="username"
//               label="Username"
//               validateDebounce={1000}
//               rules={[{ required: true, min:1, max : 20 }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               hasFeedback
//               name="password"
//               label="Password"
//               validateDebounce={1000}
//               rules={[{ required: true , min: 6, max:20}]}
//             >
//               <Input />
//             </Form.Item>

//             <button className="btn1 mt-2">Login</button>
//             <br />
//             <Link to={"/adminregister"}>
//               <p className="mt-2">Admin Register</p>
//             </Link>
//             <Link to={"/login"}>
//               <p className="mt-2">User Login</p>
//             </Link>
//           </Form>
//         </Col>
//       {/* </Row> */}
//     </div>
//   );
// }

// export default Login;



import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../redux/actions/adminActions";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FaUserAlt, FaLock } from "react-icons/fa";

function AdminLogin() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(e) {
    e.preventDefault();
    const values = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    dispatch(adminLogin(values));
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background Animated Blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {loading && <Spinner />}

      {/* Glassmorphic Admin Login Card */}
      <form
        onSubmit={onFinish}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl shadow-2xl 
                   backdrop-blur-2xl bg-white/10 border border-white/20
                   transition-transform hover:scale-[1.02]"
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-white mb-2 tracking-wide">
          Admin Login
        </h1>
        <p className="text-center text-gray-300 mb-8 text-sm">
          Login to manage the rides 🚴
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
            to="/adminregister"
            className="block text-sm text-purple-300 hover:text-purple-400 transition"
          >
            Admin Register
          </Link>
          <Link
            to="/login"
            className="block text-sm text-pink-300 hover:text-pink-400 transition"
          >
            User Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
