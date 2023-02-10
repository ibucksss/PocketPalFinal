import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/register.css";
import axios from "axios";
import Spinner from "../components/Spinner";
const Login = () => {
  // const url = "http://localhost:6000";
  // axios.defaults.baseURL = url;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      localStorage.setItem(
        "pocketpal-user",
        JSON.stringify({ ...response.data, password: "" })
      );
      setLoading(false);
      message.success("Login Successful");
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Login Failed");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("pocketpal-user")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Login for Pocket Pal</h1>
            <br />

            <Form.Item label="email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="password" type="password" name="password">
              <Input />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">Not Registered Yet? Click Here.</Link>
              <button type="submit" className="primary">
                Login
              </button>
            </div>
          </Form>
        </div>
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://assets7.lottiefiles.com/packages/lf20_ml0yft0o.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
