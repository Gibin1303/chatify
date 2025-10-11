import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authuser: null,
  isCheckingAuth: true,
  isSignInUp: false,
  isLoggingUp: false,
  isLodding: false,

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
  login: async (data) => {
    set({ isLoggingUp: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authuser: res.data });
      set({ isLoggingUp: false });
      toast.success("Logged in successfully!");
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
}));
