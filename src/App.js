import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AIProvider } from "./Components/AIContext";
import ChatPage from "./Components/ChatPage";

function App() {
  return (
    <AIProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </Router>
    </AIProvider>
  );
}

export default App;
