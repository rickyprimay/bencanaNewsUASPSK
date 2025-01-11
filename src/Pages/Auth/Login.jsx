import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      Swal.fire('Success', 'You have logged in successfully!', 'success');
      navigate('/');
    } catch (error) {
      Swal.fire('Error', 'Invalid credentials, please try again.', 'error');
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
              <button className="btn bg-teal-600 text-white hover:bg-teal-700" type="submit">
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <a href="/register" className="text-teal-600">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
