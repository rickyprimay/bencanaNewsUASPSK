import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDisasterDetail } from "../../../Redux/slice/disasterSlice";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

const DetailNews = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { disasterDetail, loading, error } = useSelector((state) => state.disasters);

  useEffect(() => {
    dispatch(fetchDisasterDetail(id));
  }, [dispatch, id]);

  if (loading) {
    return <div className="text-center mt-20 text-xl text-gray-500">Loading...</div>;
  }

  if (error || !disasterDetail) {
    return (
      <div className="text-center mt-20 text-xl text-gray-500">
        Gagal memuat detail bencana.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-12 px-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div
              className="h-[600px] bg-cover bg-center"
              style={{ backgroundImage: `url(${disasterDetail.image})` }}
            ></div>

            <div className="p-6">
              <h1 className="text-3xl font-bold text-teal-600 mb-4">{disasterDetail.title}</h1>
              <p className="text-gray-500 text-sm mb-2">
                Dipublikasi pada: {new Date(disasterDetail.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm mb-2">
                Author: <span className="font-medium text-gray-700">{disasterDetail.author}</span>
              </p>
              <p className="text-gray-500 text-sm mb-2">
                Lokasi: <span className="font-medium text-gray-700">{disasterDetail.location}</span>
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">{disasterDetail.description}</p>
              <p className="text-gray-700 leading-relaxed mb-6">{disasterDetail.content}</p>

              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-800 transition-all"
              >
                Kembali ke Home
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailNews;
