import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import { AuthProvider, useAuth } from "../../context/AuthContext";
import { signin, signup } from "../../utils/mainApi";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import SearchPage from "../SearchPage/SearchPage";
import ItemDetail from "../ItemDetail/ItemDetail";
import Profile from "../Profile/Profile";
import About from "../About/About";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import NotFound from "../NotFound/NotFound";

import "./App.css";

function AppContent() {
  const { isLoggedIn, setIsLoggedIn, setCurrentUser, setToken, logout } =
    useAuth();

  const [activeModal, setActiveModal] = useState(null);

  function handleLoginClick() {
    setActiveModal("login");
  }
  function handleRegisterClick() {
    setActiveModal("register");
  }
  function handleCloseModal() {
    setActiveModal(null);
  }
  function handleSwitchToRegister() {
    setActiveModal("register");
  }
  function handleSwitchToLogin() {
    setActiveModal("login");
  }

  async function handleLogin(credentials) {
    const data = await signin(credentials);

    localStorage.setItem("vortyx_token", data.token);
    setToken(data.token);
    setIsLoggedIn(true);

    const { getCurrentUser } = await import("../../utils/mainApi");
    const user = await getCurrentUser(data.token);
    setCurrentUser(user);

    handleCloseModal();
  }

  async function handleRegister(userData) {
    await signup(userData);

    await handleLogin({
      email: userData.email,
      password: userData.password,
    });
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onLogout={logout}
      />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/games/:id" element={<ItemDetail type="game" />} />
        <Route path="/movies/:id" element={<ItemDetail type="movie" />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={handleCloseModal}
        onLogin={handleLogin}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={handleCloseModal}
        onRegister={handleRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
