import { Navigate, Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import {
    HomePage,
    LoginPage,
    ProfilePage,
    SignUpPage,
    SettingsPage,
} from "./pages";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
    const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    console.log(authUser);

    if (isCheckingAuth && !authUser) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <Routes>
                <Route
                    path="/"
                    element={authUser ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/signup"
                    element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/login"
                    element={!authUser ? <LoginPage /> : <Navigate to="/" />}
                />
                <Route path="/settings" element={<SettingsPage />} />
                <Route
                    path="/profile"
                    element={
                        authUser ? <ProfilePage /> : <Navigate to="/login" />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
