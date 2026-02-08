import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import {
  PencilSquareIcon,
  TrashIcon,
  ShareIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline'; // EyeIcon is not needed here as this IS the current view
import toast from 'react-hot-toast';
import { removeFromPastes } from '../assets/redux/pastSlice'; // Path confirmed

function ViewPaste() {
  const allPastes = useSelector((state) => state.paste.pastes);
  const { id } = useParams(); // Gets the paste ID from the URL
  const [view, setView] = useState(null); // State to hold the single paste object
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirection after deletion or if not found

  useEffect(() => {
    if (id) {
      const paste = allPastes.find((p) => p._id === id); // Finds the paste from Redux store
      setView(paste);
      if (!paste) {
        // Redirect if paste not found (e.g., deleted or invalid ID)
        toast.error("Paste not found!");
        navigate('/'); // Redirect to the 'All Pastes' list
      }
    }
  }, [id, allPastes, navigate]); // Re-run effect if ID or allPastes change

  // Your existing handleDelete logic
  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted successfully!");
    navigate('/'); // Redirect to the main list after deletion
  };

  // Your existing handleShare logic
  const handleShare = (pasteId) => {
    const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareableLink);
    toast("Link copied to clipboard", { icon: "🔗" });
  };

  // Your existing handleCopy logic
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast("Content copied to clipboard", { icon: "👌" });
  };

  // Display loading/not found message if paste isn't loaded yet
  if (!view) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-600 dark:text-gray-400 text-xl">Loading paste or Paste not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-start gap-6 border border-gray-200 dark:border-gray-700">
        {/* Left Side: Title + Content + Timestamp */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {view.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg whitespace-pre-wrap leading-relaxed mb-4">
            {view.content}
          </p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Created on: {new Date(view.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex flex-col gap-3 items-end">
          <NavLink
            to={`/?pastId=${view._id}`} // NavLink to your edit form
            className="flex items-center justify-center gap-2 w-32 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 ease-in-out text-sm font-medium"
          >
            <PencilSquareIcon className="w-5 h-5" /> Edit
          </NavLink>

          <button
            onClick={() => handleDelete(view._id)} // Your delete button
            className="flex items-center justify-center gap-2 w-32 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 ease-in-out text-sm font-medium"
          >
            <TrashIcon className="w-5 h-5" /> Delete
          </button>

          <button
            onClick={() => handleShare(view._id)} // Your share button
            className="flex items-center justify-center gap-2 w-32 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 ease-in-out text-sm font-medium"
          >
            <ShareIcon className="w-5 h-5" /> Share
          </button>

          <button
            onClick={() => handleCopy(view.content)} // Your copy button
            className="flex items-center justify-center gap-2 w-32 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200 ease-in-out text-sm font-medium"
          >
            <ClipboardDocumentIcon className="w-5 h-5" /> Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewPaste;