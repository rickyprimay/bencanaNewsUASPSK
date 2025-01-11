import React from "react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div
          className="relative bg-cover bg-center h-[500px]"
          style={{
            backgroundImage:
              "url('https://dlh.semarangkota.go.id/wp-content/uploads/2021/02/138043_620-image-tempo.co.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-5xl text-white font-bold text-outline">Tentang Kekeringan</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl text-outline">
              Memahami bencana kekeringan, penyebab, dampaknya, dan langkah-langkah yang dapat kita ambil untuk mengatasinya.
            </p>
          </div>
        </div>

        <div className="container mx-auto py-12 px-6 md:px-12">
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-teal-600">
              Apa itu Kekeringan?
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify mb-6">
              Kekeringan adalah kondisi di mana terjadi kekurangan air yang signifikan akibat curah hujan yang minim dalam jangka waktu panjang. Hal ini dapat berdampak pada kehidupan sehari-hari, ekosistem, dan berbagai sektor ekonomi. Kekeringan tidak hanya menyebabkan krisis air bersih tetapi juga menimbulkan berbagai permasalahan lainnya.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-teal-600">
              Penyebab Kekeringan
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify mb-6">
              Kekeringan dapat disebabkan oleh berbagai faktor, baik alami maupun buatan manusia:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li><span className="font-semibold">Perubahan iklim global:</span> Suhu bumi yang meningkat memengaruhi pola cuaca.</li>
              <li><span className="font-semibold">Deforestasi:</span> Penebangan hutan secara masif mengurangi kemampuan lingkungan menyimpan air.</li>
              <li><span className="font-semibold">Pengelolaan air yang buruk:</span> Penyalahgunaan sumber daya air dapat memperburuk situasi.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-teal-600">
              Dampak Kekeringan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Krisis Air Bersih</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ketersediaan air untuk kebutuhan harian menurun, memengaruhi kesehatan masyarakat.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Kelangkaan Pangan</h3>
                <p className="text-gray-700 leading-relaxed">
                  Produksi pertanian menurun drastis, mengakibatkan harga pangan melonjak.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Kerusakan Ekosistem</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ekosistem alami seperti sungai dan hutan terancam rusak akibat kekeringan.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Meningkatnya Kebakaran Hutan</h3>
                <p className="text-gray-700 leading-relaxed">
                  Lahan kering menjadi lebih rentan terhadap kebakaran besar.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-teal-600">
              Apa yang Bisa Dilakukan?
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify mb-6">
              Untuk mengurangi dampak kekeringan, langkah-langkah berikut dapat dilakukan:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Menghemat air dengan mengurangi penggunaan yang tidak perlu.</li>
              <li>Menanam pohon untuk meningkatkan kapasitas penyimpanan air tanah.</li>
              <li>Mendukung kebijakan lingkungan dan energi terbarukan.</li>
              <li>Memanfaatkan teknologi modern untuk efisiensi irigasi.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed text-justify">
              Kolaborasi antara pemerintah, masyarakat, dan organisasi non-profit sangat penting dalam mengatasi kekeringan secara berkelanjutan. Dengan langkah-langkah ini, kita dapat menjaga bumi tetap sehat untuk generasi mendatang.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;