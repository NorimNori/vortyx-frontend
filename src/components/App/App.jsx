import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import { AuthContext } from "../../context/AuthContext";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import SearchPage from "../SearchPage/SearchPage";
import ItemDetail from "../ItemDetail/ItemDetail";
import Profile from "../Profile/Profile";
//import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import NotFound from "../NotFound/NotFound";

import "./App.css";
import About from "../About/About";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    try {
      console.log("Login con:", credentials);
      handleCloseModal();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async function handleRegister(userData) {
    try {
      console.log("Registro con:", userData);
      handleCloseModal();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/games/:id" element={<ItemDetail type="game" />} />
        <Route path="/movies/:id" element={<ItemDetail type="movie" />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />

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
    </AuthContext.Provider>
  );
}

export default App;
