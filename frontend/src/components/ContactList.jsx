import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkelton from "./UsersLoadingSkelton";
import { useAuthStore } from "../store/useAuthStore";

const ContactList = () => {
  const {
    allContacts,
    chats,
    isUsersLoading,
    setSelectedUser,
    getAllContacts,
  } = useChatStore();

  const {onlineUsers} = useAuthStore()

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkelton />;





  

  return (
    <>
      {allContacts?.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${
                onlineUsers?.includes(contact._id) ? "online" : "offline"
              }`}
            >
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} alt="" />
              </div>
            </div>
            <h4 className="font-medium truncate text-white">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;
