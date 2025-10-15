import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authuser: null,
  isCheckingAuth: true,
  isSignInUp: false,
  isLoggingUp: false,
  isLodding: false,
  socket: null,
  onlineUsers:[],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authuser: res.data });
      get().connectSocket()
    } catch (error) {
      console.log("Error checking auth:", error);
      set({ authuser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSignInUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authuser: res.data });
      set({ isSignInUp: false });
      toast.success("Signup successful!");
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      console.log("Error during signup:", error);
      set({ isSignInUp: false });
    } finally {
    }
  },
  login: async (data) => {
    set({ isLoggingUp: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authuser: res.data });
      set({ isLoggingUp: false });
      toast.success("Logged in successfully!");
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
      console.log("Error during login:", error);
      set({ isLoggingUp: false });
    } finally {
      set({ isLoggingUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authuser: null });
      toast.success("Logged out successfully!");
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed");
      console.log("Error during logout:", error);
    }
  },
  updateProfile: async (data) => {
    set({ isLodding: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authuser: res.data });
      toast.success("Profile updated successfully!");
      set({ isLodding: false });
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
      console.log("Error updating profile:", error);
      set({ isLodding: false });
    }
  },
  connectSocket: async () => {
    const { authuser } = get();
    if (!authuser || get().socket?.connected) return;
    const socket = io(BASE_URL, { withCredentials: true });


    socket.connect();
    set({socket})

    //listen for online users


    socket.on("getOnlineUsers",(userIds)=>{
       set({onlineUsers:userIds})
    })
  },

   disconnectSocket: ()=>{
    if(get().socket?.connected) get().socket.disconnect()
   }
}));
