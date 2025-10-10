import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authuser: null,
  isCheckingAuth: true,
  isSignInUp: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authuser: res.data });
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
    } catch (error) {
        toast.error(error.response.data.message || "Signup failed");
      console.log("Error during signup:", error);
      set({ isSignInUp: false });
    } finally {
    }
  },
}));
