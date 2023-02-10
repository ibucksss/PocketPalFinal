import "./App.css";
import "antd/dist/antd";
import { Button } from "antd";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home></Home>
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export function ProtectedRoute(props) {
  if (localStorage.getItem("pocketpal-user")) {
    return props.children;
  } else {
    return <Navigate to="login" />;
  }
}
export function NonProtectedRoute(props) {
  if (localStorage.getItem("pocketpal-user")) {
    return props.children;
  } else {
    return <Navigate to="login" />;
  }
}
export default App;
