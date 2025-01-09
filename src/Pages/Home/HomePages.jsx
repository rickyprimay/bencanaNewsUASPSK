import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import NewsCard from "../../Components/NewsCard";

const Homepage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user")) : null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have been logged out successfully.",
    });

    setIsModalOpen(false);
    navigate("/login");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const news = [
    {
      id: 1,
      image: "https://example.com/article-image-1.jpg",
      title: "Dampak Kekeringan di Asia",
      description: "Kekeringan memengaruhi lebih dari 2 juta hektar sawah di Asia Tenggara...",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="relative bg-cover bg-center h-[400px]" style={{ backgroundImage: "url('https://awsimages.detik.net.id/community/media/visual/2023/03/07/ilustrasi-musim-kemarau_169.jpeg?w=620')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl text-white font-bold">
              Dampak Kekeringan Global
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Informasi terkini dan cara menghadapi bencana kekeringan.
            </p>
            <button className="mt-6 btn btn-primary">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>

        <div className="container mx-auto py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Artikel Terkini
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((newsData) => (
              <NewsCard
                key={newsData.id}
                image={newsData.image}
                title={newsData.title}
                description={newsData.description}
                onReadMore={() => navigate(`/articles/${newsData.id}`)}
              />
            ))}
          </div>
        </div>

        <Footer />

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="modal modal-open">
              <div className="modal-box">
                <h2 className="text-xl">Are you sure you want to log out?</h2>
                <div className="flex space-x-4 mt-4">
                  <button onClick={handleLogout} className="btn btn-primary">
                    Yes, Log Out
                  </button>
                  <button onClick={closeModal} className="btn">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
