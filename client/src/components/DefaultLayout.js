// import React from "react";
// import { Menu, Dropdown, Button, Space, Row, Col } from "antd";
// import { Link } from "react-router-dom";
// import "../index.css";
// import Footer from "./footer/Footer";

// function DefaultLayout(props) {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const menu = (
//     <Menu>
//       <Menu.Item key={1}>
//         <a href="/">Home</a>
//       </Menu.Item>
//       {user && (
//         <Menu.Item key={2}>
//           <a href="/userbookings">Bookings</a>
//         </Menu.Item>
//       )}
//       {admin && (
//         <Menu.Item key={3}>
//           <a href="/admin">Admin</a>
//         </Menu.Item>
//       )}

//       {user && (
//         <Menu.Item
//           key={4}
//           onClick={() => {
//             localStorage.clear();
//             window.location.href = "/login";
//           }}
//         >
//           <li style={{ color: "tomato" }}>Logout</li>
//         </Menu.Item>
//       )}
//       {admin && (
//         <Menu.Item
//           key={5}
//           onClick={() => {
//             localStorage.clear();
//             window.location.href = "/adminlogin";
//           }}
//         >
//           <li style={{ color: "tomato" }}>Logout</li>
//         </Menu.Item>
//       )}
//     </Menu>
//   );
//   return (
//     <div>
//       <div className="header">
//         <Row gutter={16} justify="center">
//           <Col lg={20} sm={24} xs={24}>
//             <div className="d-flex justify-content-between">
//               <h1>
//                 <b>
//                   <Link to="/" style={{ color: "#f1c40f" }}>
//                     Bike
//                   </Link>
//                 </b>
//               </h1>

//               <Dropdown overlay={menu} placement="bottom">
//                 <button className="btn1" style={{ padding: "10px"}}>{user ? user.username : admin.username}</button>
//               </Dropdown>
//             </div>
//           </Col>
//         </Row>
//       </div>
//       <div className="content">{props.children}</div>

//       <div className="footer text-center">
//         <Footer></Footer>
//       </div>
//     </div>
//   );
// }

// export default DefaultLayout;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer/Footer";

function DefaultLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = user ? "/login" : "/adminlogin";
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold text-yellow-500 tracking-wide">
                🚴 Bike
              </span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-6 items-center">
              <Link
                to="/"
                className="text-gray-700 hover:text-yellow-500 font-medium transition"
              >
                Home
              </Link>

              {user && (
                <Link
                  to="/userbookings"
                  className="text-gray-700 hover:text-yellow-500 font-medium transition"
                >
                  Bookings
                </Link>
              )}

              {admin && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-yellow-500 font-medium transition"
                >
                  Admin
                </Link>
              )}

              {(user || admin) && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Logout
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-yellow-500 hover:bg-gray-100 focus:outline-none"
            >
              {menuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg px-4 py-3 space-y-2">
            <Link
              to="/"
              className="block text-gray-700 hover:text-yellow-500 font-medium"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/userbookings"
                className="block text-gray-700 hover:text-yellow-500 font-medium"
              >
                Bookings
              </Link>
            )}

            {admin && (
              <Link
                to="/admin"
                className="block text-gray-700 hover:text-yellow-500 font-medium"
              >
                Admin
              </Link>
            )}

            {(user || admin) && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default DefaultLayout;
