import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Password and Confirm Password do not match.",
      });
      return;
    } else if(password === "" || confirmPassword === ""){
      Swal.fire({
        icon: "error",
        title: "Password Required",
        text: "Password and Confirm Password are required.",
      });
      return;
      
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You can now log in with your account.",
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/"); 
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          (err.response && err.response.data.message) ||
          "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-4">
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
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            </div>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
