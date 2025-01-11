import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import NewsCard from "../../../Components/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchDisasters } from "../../../Redux/slice/disasterSlice";
import { logout } from "../../../Redux/slice/authSlice";
import "aos/dist/aos.css"; 
import AOS from "aos"; 

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { disasters, loading } = useSelector((state) => state.disasters);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDisasters());
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have been logged out successfully.",
    });
    setIsModalOpen(false);
    navigate("/login");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div
          className="relative bg-cover bg-center h-[500px] text-white"
          style={{
            backgroundImage: "url('https://awsimages.detik.net.id/community/media/visual/2023/03/07/ilustrasi-musim-kemarau_169.jpeg?w=620')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex flex-col items-center justify-center text-center">
            <h1
              className="text-outline text-5xl md:text-6xl font-bold drop-shadow-md animate-bounce"
            >
              Dampak Kekeringan Global
            </h1>
            <p
              className="text-outline mt-4 text-xl md:text-2xl drop-shadow-md animate-pulse"
            >
              Informasi terkini dan cara menghadapi bencana kekeringan.
            </p>
            <Link
              to="/about"
              className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-800 shadow-lg transition-all transform hover:scale-110"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>

        <div className="container mx-auto py-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10 text-teal-600 border-b-2 border-black inline-block pb-2"
          >
            Berita Terkini
          </h2>

          {loading ? (
            <div className="text-center text-lg text-gray-500">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {disasters.map((disaster) => (
                <div key={disaster.id} data-aos="fade-up">
                  <NewsCard
                    image={disaster.image}
                    datePublished={disaster.created_at}
                    title={disaster.title}
                    description={disaster.description}
                    onReadMore={() => navigate(`/articles/${disaster.id}`)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-300">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                Apakah Anda yakin ingin keluar?
              </h2>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition duration-300"
                >
                  Keluar
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
