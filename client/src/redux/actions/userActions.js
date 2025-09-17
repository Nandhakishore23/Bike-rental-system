// import axios from "axios";
// import { message } from "antd";
// const API = axios.create({
//   baseURL: process.env.Frontend_URL,
// });

// export const userLogin = (reqObj) => async (dispatch) => {
//   dispatch({ type: "LOADING", payload: true });

//   try {
//     const response = await API.post("https://bike-rental-system-api.vercel.app/api/users/login", reqObj);
//     localStorage.setItem("user", JSON.stringify(response.data));
//     message.success("Login Success");
//     dispatch({ type: "LOADING", payload: false });
//     setTimeout(() => {
//       window.location.href = "/";
//     }, 500);
//   } catch (err) {
//     console.log(err);
//     message.error("Invalid Credintials");
//     dispatch({ type: "LOADING", payload: false });
//   }
// };

// export const userRegister = (reqObj) => async (dispatch) => {
//   dispatch({ type: "LOADING", payload: true });

//   try {
//     const response = await API.post("https://bike-rental-system-api.vercel.app/api/users/register", reqObj);
//     message.success("Registered sucessfully");
//     setTimeout(() => {
//       window.location.href = "/login";
//     }, 500);

//     dispatch({ type: "LOADING", payload: false });
//   } catch (err) {
//     console.log(err);
//     message.error("registration failed");
//     dispatch({ type: "LOADING", payload: false });
//   }
// };


import axios from "axios";
import { message } from "antd";

const API = axios.create({
  baseURL: "https://bike-rental-system-api.vercel.app", // ✅ backend base URL
});

// LOGIN
export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await API.post("/api/users/login", reqObj);

    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login Success");
    dispatch({ type: "LOADING", payload: false });

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (err) {
    console.error("❌ Login error:", err.message);
    message.error("Invalid Credentials");
    dispatch({ type: "LOADING", payload: false });
  }
};

// REGISTER
export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    // ✅ Make sure username, email, password are sent
    const { username, email, password } = reqObj;

    
    const response = await API.post("/api/users/register", {
      username,
      email,
      password,
    });
    console.log("Registering user:", response.data);

    // message.success("✅ Registered successfully. Please login.");
    dispatch({ type: "LOADING", payload: false });

    // setTimeout(() => {
    //   window.location.href = "/login";
    // }, 500);

    // return response.data;
  } catch (err) {
    console.error("❌ Register error:", err.message);
    message.error("Registration failed");
    dispatch({ type: "LOADING", payload: false });
  }
};
