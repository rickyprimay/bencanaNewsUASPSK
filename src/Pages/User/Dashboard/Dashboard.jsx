import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-teal-600 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-teal-500">
          My Dashboard
        </div>
        <nav className="flex-grow">
          <ul className="menu p-4">
            <li>
              <a className="hover:bg-teal-700 rounded">Home</a>
            </li>
            <li>
              <a className="hover:bg-teal-700 rounded">Tambah Berita</a>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-teal-500">
          <button className="btn btn-outline btn-sm text-white w-full hover:bg-red-600">
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-teal-600">
            Welcome Back, {user?.name || "Guest"}!
          </h1>
        </header>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-teal-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Total Users</h2>
                <p className="text-3xl font-bold text-teal-600">1,230</p>
              </div>
            </div>
            <div className="card bg-yellow-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Monthly Revenue</h2>
                <p className="text-3xl font-bold text-yellow-600">$45,000</p>
              </div>
            </div>
            <div className="card bg-red-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Pending Tasks</h2>
                <p className="text-3xl font-bold text-red-600">24</p>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow">
            <div className="card-body">
              <h2 className="card-title">Recent Activity</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>John Doe added a new report</li>
                <li>Admin updated user permissions</li>
                <li>Server maintenance completed successfully</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="btn btn-primary btn-block">Create New</button>
            <button className="btn btn-secondary btn-block">View Reports</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
