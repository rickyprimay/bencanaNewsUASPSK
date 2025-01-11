import React from "react";

const NewsCard = ({ image, title, description, datePublished, onReadMore }) => {
  const adjustedDate = new Date(datePublished);

  const formattedDate = adjustedDate.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-sm rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105">
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <p className="text-sm text-gray-600">{`Dipublish pada: ${formattedDate}`}</p>
        <h3 className="text-xl font-semibold mt-2 text-gray-800 truncate">{title}</h3>
        <p className="text-gray-700 mt-2 text-base line-clamp-3">{description}</p>
        <button
          onClick={onReadMore}
          className="mt-4 text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
        >
          Baca Selengkapnya
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
