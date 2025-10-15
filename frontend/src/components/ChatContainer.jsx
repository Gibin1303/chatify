import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder";
import MessageInput from "./MessageInput";
import MessageLoaddingSkelton from "./MessageLoaddingSkelton";

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessagesbyUserId,
    isMessagesLoading,
    subscribeTomessage,
    unSuscribeFromMessages,
  } = useChatStore();
  const { authuser } = useAuthStore();

  useEffect(() => {
    if(!selectedUser._id)  return
    getMessagesbyUserId(selectedUser?._id);
    subscribeTomessage();

    //cleanup
    return () => {
      unSuscribeFromMessages();
    };
  }, [
    selectedUser,
    getMessagesbyUserId,
    subscribeTomessage,
    unSuscribeFromMessages,
  ]);

  // const setScrollToBottom = useChatStore((s) => s.setScrollToBottom);

  //   const containerRef = useRef(null);

  // const scrollToBottomHandler = (behavior = "smooth") => {
  //   const container = containerRef.current;
  //   if (!container) return;

  //   const offset = 20;
  //   const target = container.scrollHeight - container.clientHeight - offset;

  //   container.scrollTo({
  //     top: target > 0 ? target : 0,
  //     behavior,
  //   });
  // };

  // useEffect(() => {
  //   setScrollToBottom(() => scrollToBottomHandler);
  // }, [setScrollToBottom]);

  // useEffect(() => {
  //   requestAnimationFrame(() => scrollToBottomHandler("smooth"));
  // }, [messages]);

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessageLoaddingSkelton />
        ) : (
          <NoChatHistoryPlaceHolder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
