import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape")  setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);


  return (
    <div className="flex items-center justify-between bg-slate-500/50 border-b border-slate-700/50 max-h-[84px] px-6 flex-1">
      <div className="flex items-center space-x-3">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              className="w-1 h-1"
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium">
            {selectedUser.fullName}
          </h3>
          <p className="text-slate-400 text-sm">Online</p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 hover:text-slate-200 transistion-colors cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatHeader;
