import React from "react";
import BorderAnimatedComponent from "../components/BorderAnimatedComponent";
import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import Chatlist from "../components/Chatlist";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/chatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

const Chatpage = () => {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedComponent>
        {/* left side */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div>{activeTab === "chats" ? <Chatlist /> : <ContactList />}</div>
        </div>
        {/* right side */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedComponent>
    </div>
  );
};

export default Chatpage;
