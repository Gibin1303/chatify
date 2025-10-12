import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder";
import MessageInput from "./MessageInput";
import MessageLoaddingSkelton from "./MessageLoaddingSkelton";

const ChatContainer = () => {
  const { selectedUser, messages, getMessagesbyUserId, isMessagesLoading } = useChatStore();
  const { authuser } = useAuthStore();

  useEffect(() => {
    getMessagesbyUserId(selectedUser?._id);
  }, [selectedUser, getMessagesbyUserId]);

  console.log(messages, "hello getmessagebyId api");

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages?.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authuser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authuser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-300 text-slate-800"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt={"shared"}
                      className="h-48 rounded-lg object-cover"
                    />
                  )}
                  {msg.text && <p className="mt-3">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {/* {new Date(msg.createdAt).toISOString().slice(11,16)} */}
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : isMessagesLoading ? 
          <MessageLoaddingSkelton />
         : (
          <NoChatHistoryPlaceHolder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
