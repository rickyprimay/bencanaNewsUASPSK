import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
        email,
        password,
      });

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: response.data.message,
        });

        // Simpan token ke localStorage
        localStorage.setItem("token", response.data.token);

        // Simpan data user ke localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/"); // Arahkan pengguna ke homepage
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          (err.response && err.response.data.message) ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
