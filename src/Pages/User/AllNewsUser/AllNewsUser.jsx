import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../../Redux/slice/dashboardDisasterSlice";
import { createNews, updateNews, deleteNews } from "../../../Redux/slice/updateDeleteDisaster";
import Navbar from "../../../Components/Navbar";
import Sidebar from "../../../Components/Sidebar";
import Table from "../../../Components/Table";
import Swal from "sweetalert2";

const AllNewsUser = () => {
  const dispatch = useDispatch();
  const { news, loading, error } = useSelector((state) => state.dashboardDisasters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState({
    id: "",
    title: "",
    description: "",
    content: "",
    location: "",
    image: null
  });

  const [showFullDescription, setShowFullDescription] = useState({});
  const [showFullContent, setShowFullContent] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleEdit = (newsItem) => {
    setCurrentNews(newsItem);
    setIsModalOpen(true);
  };

  const handleDelete = (newsItem) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNews(newsItem.id))
          .then(() => Swal.fire("Deleted!", "News has been deleted.", "success"))
          .catch(() => Swal.fire("Error", "Failed to delete the news", "error"));
      }
    });
  };

  const handleToggleDescription = (id) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleToggleContent = (id) => {
    setShowFullContent((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAdd = () => {
    setCurrentNews({
      id: "",
      title: "",
      description: "",
      content: "",
      location: "",
      image: null
    });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const columns = [
    { header: "No.", accessor: (item, index) => index + 1 },
    { header: "Judul", accessor: "title" },
    {
      header: "Deskripsi",
      render: (item) => (
        <>
          {showFullDescription[item.id]
            ? item.description
            : `${item.description.substring(0, 100)}...`}
          <button
            onClick={() =>
              setShowFullDescription((prev) => ({
                ...prev,
                [item.id]: !prev[item.id],
              }))
            }
            className="text-blue-600 ml-2"
          >
            {showFullDescription[item.id] ? "Show Less" : "Read More"}
          </button>
        </>
      ),
    },
    {
      header: "Konten",
      render: (item) => (
        <>
          {showFullContent[item.id]
            ? item.content
            : `${item.content.substring(0, 100)}...`}
          <button
            onClick={() =>
              setShowFullContent((prev) => ({
                ...prev,
                [item.id]: !prev[item.id],
              }))
            }
            className="text-blue-600 ml-2"
          >
            {showFullContent[item.id] ? "Show Less" : "Read More"}
          </button>
        </>
      ),
    },
    { header: "Author", accessor: "author" }, 
    { header: "Lokasi", accessor: "location" },
    {
      header: "Gambar",
      render: (item) => <img src={item.image} alt="News" className="w-20 h-20 object-cover" />,
    },
  ];

  const actions = [
    {
      label: "Edit",
      onClick: handleEdit,
      className: "bg-blue-500 text-white mr-2",
    },
    {
      label: "Delete",
      onClick: handleDelete,
      className: "bg-red-500 text-white",
    },
  ];

  const confirmDelete = () => {
    if (newsToDelete) {
      dispatch(deleteNews(newsToDelete.id))
        .then(() => {
          Swal.fire("Deleted", "News deleted successfully", "success").then(() => {
            window.location.reload();
          });
        })
        .catch(() => {
          Swal.fire("Error", "There was an error deleting the news", "error");
        });
    }
    setIsDeleteModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", currentNews.title);
    formData.append("description", currentNews.description);
    formData.append("content", currentNews.content);
    formData.append("location", currentNews.location);

    if (currentNews.image) {
      formData.append("image", currentNews.image);
    }

    if (currentNews.id) {
      dispatch(updateNews(currentNews.id, formData))
        .then(() => {
          Swal.fire("Updated", "News updated successfully", "success").then(() => {
            window.location.reload();
          });
        })
        .catch(() => {
          Swal.fire("Error", "There was an error updating the news", "error");
        });
    } else {
      dispatch(createNews(formData))
        .then(() => {
          Swal.fire("Added", "News added successfully", "success").then(() => {
            window.location.reload();
          });
        })
        .catch(() => {
          Swal.fire("Error", "There was an error adding the news", "error");
        });
    }

    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCurrentNews({ ...currentNews, image: file });

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-grow flex flex-col">
        <Navbar />
        <div className="p-6 space-y-6">
          <div className="text-3xl font-semibold text-teal-600">Berita kamu</div>
          <button onClick={handleAdd} className="px-4 py-2 bg-teal-600 text-white rounded-lg">
            Tambah Berita
          </button>
          <div className="overflow-x-auto">
            <Table data={news} columns={columns} actions={actions} />
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-1/2 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-teal-600">
                  {currentNews.id ? "Edit Berita" : "Tambah Berita"}
                </h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul :</label>
                    <input
                      type="text"
                      id="title"
                      value={currentNews.title}
                      onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}
                      className="mt-2 block w-full px-3 py-2 border rounded-lg text-black bg-transparent"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi :</label>
                    <textarea
                      id="description"
                      value={currentNews.description}
                      onChange={(e) => setCurrentNews({ ...currentNews, description: e.target.value })}
                      className="mt-2 block w-full px-3 py-2 border rounded-lg text-black bg-transparent"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Konten :</label>
                    <textarea
                      id="content"
                      value={currentNews.content}
                      onChange={(e) => setCurrentNews({ ...currentNews, content: e.target.value })}
                      className="mt-2 block w-full px-3 py-2 border rounded-lg text-black bg-transparent"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lokasi :</label>
                    <input
                      type="text"
                      id="location"
                      value={currentNews.location}
                      onChange={(e) => setCurrentNews({ ...currentNews, location: e.target.value })}
                      className="mt-2 block w-full px-3 py-2 border rounded-lg text-black bg-transparent"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Gambar :</label>
                    <input
                      type="file"
                      id="image"
                      onChange={handleImageChange}
                      className="mt-2 block w-full px-3 py-2 border rounded-lg text-black bg-transparent"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="mt-2 w-32 h-32 object-cover"
                      />
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg">
                      {currentNews.id ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isDeleteModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-8 rounded-lg max-w-lg w-full">
                <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllNewsUser;
