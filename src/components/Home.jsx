import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../assets/redux/pastSlice";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pastId = searchParams.get("pastId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pastId) {
      const paste = allPastes.find((val) => val._id === pastId);
      setTitle(paste?.title || "");
      setValue(paste?.content || "");
    }
  }, [pastId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pastId || Date.now().toString(23),
      createdAt: new Date().toISOString(),
    };
    if (pastId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="w-full px-6 py-10 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
       <input
  className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white
   text-gray-900 placeholder-white dark:bg-gray-900 dark:text-white dark:placeholder-white"
  type="text"
  placeholder="Enter the paste title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

        <button
          onClick={createPaste}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          {pastId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="relative rounded-md shadow-md bg-white">
        <div className="flex gap-2 px-4 py-2 border-b border-gray-200">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter the content here..."
          rows={18}
          className="w-full p-4 text-gray-800 text-lg resize-none outline-none border-l-4 border-blue-500 min-h-[400px]"
        ></textarea>
      </div>
    </div>
  );
}

export default Home;
