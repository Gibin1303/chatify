import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkelton from "./UsersLoadingSkelton";
import NochatsFound from "./NochatsFound";
import { useAuthStore } from "../store/useAuthStore";

const Chatlist = () => {
  const { getAllChatsPartners, chats, isUsersLoading, setSelectedUser } =
    useChatStore();

    const {onlineUsers}=useAuthStore()

  useEffect(() => {
    getAllChatsPartners();
  }, [getAllChatsPartners]);

  if (isUsersLoading) return <UsersLoadingSkelton />;
  if (chats.length === 0) return <NochatsFound />;


  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar  ${onlineUsers.includes(chat._id)?"online":"offline"}`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} className="text-white text-xs" alt="No imag" />
              </div>
            </div>
            <h4 className="font-medium truncate text-white">{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default Chatlist;
