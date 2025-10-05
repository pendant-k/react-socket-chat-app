import { create } from "zustand";
import axiosInstance from "../lib/axios";

interface AuthStore {
    authUser: null;
    isLoggingIn: boolean;
    isSigningUp: boolean;
    isUpdatingProfile: boolean;

    isCheckingAuth: boolean;

    checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.error("Error checking auth", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },
}));

export default useAuthStore;
