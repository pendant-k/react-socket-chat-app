import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import {
    HomePage,
    LoginPage,
    ProfilePage,
    SignUpPage,
    SettingsPage,
} from "./pages";

function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </div>
    );
}

export default App;
