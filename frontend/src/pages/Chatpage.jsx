import React from "react";
import { useAuthStore } from "../store/useAuthStore";
const Chatpage = () => {
  const {logout} = useAuthStore()
  return <div className="text-white">Chatpage
      <button className="btn z-10" onClick={logout}>Logout</button>
  </div>;
};

export default Chatpage;
