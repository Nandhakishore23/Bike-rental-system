import React from "react";
// import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminRegister } from "../redux/actions/adminActions";
import AOS from "aos";
import Spinner from "../components/Spinner";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
import "../index.css";
AOS.init();

function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  function onFinish(values) {
    dispatch(adminRegister(values));
    console.log(values);
  }
  return (
    <div className="login">
      {loading && <Spinner />}
      {/* <Row gutter={16} className="d-flex align-items-center"> */}
        {/* <Col lg={16} style={{ position: "relative" }}>
          <img
            src={require("../images/bike.png")}
            alt=""
            className="w-100"
            data-aos="slide-left"
            data-aos-duration="2000"
          />

          <h1 className="login-logo">
            Z<i className="fa-solid fa-person-biking" />
            pRides
          </h1>
        </Col> */}
        <Col className="text-center p-3 center">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Admin Registeration</h1>
            <hr />
            <Form.Item
              hasFeedback
              name="username"
              label="Username"
              validateDebounce={1000}
              rules={[{ required: true, min:1, max:20 }]}
            >
              <Input />
            </Form.Item>

            <Form.Item hasFeedback name="email" label="Email" validateDebounce={1000} rules={[{ required: true, type: "email" }]}>
              <Input />
            </Form.Item>
            <Form.Item hasFeedback name="phone" label="Phone" rules={[{ required: true , pattern: /^[0-9]{10}$/, message: "Please enter a valid phone number" }]}>
              <Input />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="password"
              label="Password"
              validateDebounce={1000}
              rules={[{ required: true, min:6, max:20}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="cpassword"
              label="Confirm Password"
              validateDebounce={1000}
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>

            <button className="btn1 mt-2 mb-3">Register</button>
            <br />
            <Link to={"/login"}>
              <p className="mt-2">User Login</p>
            </Link>
            <br />

            <Link to={"/register"}>
              <p className="mt-2">User Register</p>
            </Link>
          </Form>
        </Col>
      {/* </Row> */}
    </div>
  );
}

export default Register;
