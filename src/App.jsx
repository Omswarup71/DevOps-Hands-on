import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="flex-grow w-full">
          <Home />
        </div>
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="flex-grow w-full">
          <Paste />
        </div>
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="flex-grow w-full">
          <ViewPaste />
        </div>
      </div>
    ),
  },
]);

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364]">
      <RouterProvider router={router} />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
