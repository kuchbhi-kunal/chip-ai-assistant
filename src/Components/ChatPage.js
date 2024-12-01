import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatAssistant from "./ChatAssistant";
import "./ChatPage.css";

function ChatPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="chat-page-container">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="chat-main-content">
        <ChatAssistant isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </div>
  );
}

export default ChatPage;
