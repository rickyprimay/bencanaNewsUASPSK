import React, { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchDisasterCounts } from "../../../Redux/slice/dashboardDisasterSlice"; 
import Navbar from "../../../Components/Navbar";
import Sidebar from "../../../Components/Sidebar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { totalNews, totalAllNews } = useSelector(
    (state) => state.dashboardDisasters
  );

  useEffect(() => {
    dispatch(fetchDisasterCounts());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <main className="flex-grow flex flex-col">
        <Navbar />

        <div className="p-6 space-y-6">
          {user && (
            <div className="text-3xl font-semibold text-teal-600">
              Selamat datang di Dashboard, {user.name}! 👋👋
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-teal-100 shadow-lg rounded-lg p-6">
              <div className="card-body">
                <h2 className="card-title text-xl font-semibold">Total Berita Kamu</h2>
                <p className="text-4xl font-bold text-teal-600">{totalNews}</p>
              </div>
            </div>
            <div className="card bg-yellow-100 shadow-lg rounded-lg p-6">
              <div className="card-body">
                <h2 className="card-title text-xl font-semibold">Total Semua Berita</h2>
                <p className="text-4xl font-bold text-yellow-600">{totalAllNews}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <button className="btn btn-primary btn-block text-white py-3 px-6 text-lg hover:bg-teal-700 transition">
              Tambahkan Berita
            </button>
            <button className="btn btn-secondary btn-block text-white py-3 px-6 text-lg hover:bg-yellow-600 transition">
              Lihat Semua Berita
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
