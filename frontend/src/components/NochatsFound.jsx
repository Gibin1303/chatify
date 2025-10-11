import React from "react";
import { MessageCircle, UserPlus } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const NochatsFound = () => {
    const {setActiveTab} = useChatStore();
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-400">
      <MessageCircle className="w-10 h-10 mb-3" />
      <p className="text-lg font-semibold">No chat selected</p>
      <p className="text-sm text-slate-500 mb-4">
        Choose a conversation or start a new one
      </p>

      <button
        onClick={() => setActiveTab("contacts")}
        className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
      >
        <UserPlus className="w-4 h-4" />
        Find Contacts
      </button>
    </div>
  );
};

export default NochatsFound;
