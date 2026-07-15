import { Wifi } from "lucide-react";
import logo from "../assets/logo.jpg";
function Navbar({ connectionStatus }) {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex gap-2 items-center cursor-none">
        <div className="w-8">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="text-xl cursor-none text-gray-800 font-black">LynK</h1>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white">
        <Wifi size={16} />
        <span>{connectionStatus}</span>
      </div>
    </nav>
  );
}

export default Navbar;
