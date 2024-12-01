import React, { useState } from "react";
import "./Sidebar.css";
import { ReactComponent as MenuIcon } from "../assets/finetuned.svg";
import { useAIContext } from "./AIContext";

function Sidebar({isMenuOpen, setIsMenuOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setAIType } = useAIContext();

  const toggleMenu = () => {
    console.log("intoggle");
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // change ai type
  const handleAITypeSelect = (type) => {
    setAIType(type);
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };


  return (
    <div className={`chat-page-container ${isMenuOpen ? "menu-open" : ""}`}>
      <div>
        {/* sidebar for desktop */}
        <div className="sidebar">
          <div
            className={`icon ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <MenuIcon />
          </div>
        </div>

        {/* menu for desktop */}
        <div className={`menu ${isMenuOpen ? "open" : "closed"}`}>
          <div className="uppercards">
            <div
              className="card generalai"
              onClick={() => handleAITypeSelect("general")}
            >
              <h2>General A.I.</h2>
            </div>
            <div className="square-card">
              <div
                className="card fitnessai"
                onClick={() => handleAITypeSelect("fitness")}
              >
                <h2>Fitness A.I.</h2>
              </div>
              <div
                className="card legalai"
                onClick={() => handleAITypeSelect("legal")}
              >
                <h2>Legal A.I.</h2>
              </div>
            </div>
          </div>
          <div className="lowercards">
            <div
              className="card therapyai"
              onClick={() => handleAITypeSelect("therapy")}
            >
              <h2>
                Therapy <br></br>A.I.
              </h2>
            </div>
          </div>
        </div>

        <div
          className={`mobile-menu-icon ${isMobileMenuOpen ? "hidden" : ""}`}
          onClick={toggleMobileMenu}
        >
          <MenuIcon />
        </div>

        {/* Mobile Menu */}
        <div className={`menu-mobile ${isMobileMenuOpen ? "open" : "closed"}`}>
          <div className="close-btn" onClick={toggleMobileMenu}>
            ×
          </div>
          <div className="uppercards">
            <div
              className="card generalai"
              onClick={() => handleAITypeSelect("general")}
            >
              <h2>General<br></br> A.I.</h2>
            </div>
            <div className="square-card">
              <div
                className="card fitnessai"
                onClick={() => handleAITypeSelect("fitness")}
              >
                <h2>Fitness A.I.</h2>
              </div>
              <div
                className="card legalai"
                onClick={() => handleAITypeSelect("legal")}
              >
                <h2>Legal A.I.</h2>
              </div>
            </div>
          </div>
          <div className="lowercards">
            <div
              className="card therapyai"
              onClick={() => handleAITypeSelect("therapy")}
            >
              <h2>
                Therapy <br></br>A.I.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
