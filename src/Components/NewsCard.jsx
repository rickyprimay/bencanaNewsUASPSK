import React from "react";

const NewsCard = ({ image, title, description, onReadMore }) => {
  return (
    <div className="card shadow-lg bg-white">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <button onClick={onReadMore} className="mt-4 btn btn-link">
          Baca Selengkapnya
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
