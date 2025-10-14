import { all } from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  allChats: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",
  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
      toast.success("Contacts loaded");
    } catch (error) {
      console.log("Error fetching contacts:", error);
      toast.error(error.response?.data?.message || "Failed to load contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getAllChatsPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
      toast.success("Chats loaded");
    } catch (error) {
      console.log("Error fetching chats:", error);
      toast.error(error.response?.data?.message || "Failed to load chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesbyUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  scrollToBottom: null,
  setScrollToBottom: (fn) => set({ scrollToBottom: fn }),

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authuser } = useAuthStore.getState();

    const temp_Id = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: temp_Id,
      senderId: authuser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      cratedAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: messages.concat(res.data) });
      get().scrollToBottom?.("smooth");
    } catch (error) {
      set({messages:messages})
      toast.error(error.response?.data?.message || "something went wrong");
    }
  },
}));
