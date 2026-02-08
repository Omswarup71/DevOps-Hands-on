import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../assets/redux/pastSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  ShareIcon,
  EyeIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTitle, setSearchTitle] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
      paste.content.toLowerCase().includes(searchTitle.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted!", { icon: "🗑️" });
  };

  const handleShare = (pasteId) => {
    const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareableLink);
    toast("Link copied to clipboard", { icon: "🔗" });
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast("Content copied to clipboard", { icon: "👌" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 w-full">
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search paste here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center sm:text-left">
        All Pastes
      </h1>

      {filterData.length > 0 ? (
        <div className="space-y-4">
          {filterData.map((paste) => (
            <div
              key={paste?._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex-1 min-w-0 w-full">
                <NavLink to={`/pastes/${paste?._id}`} className="block">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white truncate hover:underline">
                    {paste.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 truncate">
                    {paste.content}
                  </p>
                </NavLink>
              </div>

              <div className="flex flex-col sm:flex-row items-end lg:items-center gap-2 lg:gap-4 w-full sm:w-auto justify-between">
                <div className="flex flex-wrap sm:flex-nowrap sm:space-x-2 gap-2">
                  <NavLink
                    to={`/?pastId=${paste?._id}`}
                    title="Edit Paste"
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-blue-200 transition-colors"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </NavLink>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    title="Delete Paste"
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-800 dark:hover:bg-red-700 dark:text-red-200 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare(paste?._id)}
                    title="Share Paste"
                    className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 dark:bg-green-800 dark:hover:bg-green-700 dark:text-green-200 transition-colors"
                  >
                    <ShareIcon className="w-5 h-5" />
                  </button>
                  <NavLink
                    to={`/pastes/${paste?._id}`}
                    title="View Paste"
                    className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 dark:bg-purple-800 dark:hover:bg-purple-700 dark:text-purple-200 transition-colors"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </NavLink>
                  <button
                    onClick={() => handleCopy(paste?.content)}
                    title="Copy Content"
                    className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600 dark:bg-yellow-800 dark:hover:bg-yellow-700 dark:text-yellow-200 transition-colors"
                  >
                    <ClipboardDocumentIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-2 sm:mt-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>
                    {new Date(paste.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          No pastes found.
        </p>
      )}
    </div>
  );
}

export default Paste;
