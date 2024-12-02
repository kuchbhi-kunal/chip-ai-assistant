import React, { useState, useEffect, useRef } from "react";
import OpenAI from "openai";
import { useAIContext } from "./AIContext";
import { Volume2, Copy } from "lucide-react";
import UpArrow from "../assets/uparrow.svg";

function ChatAssistant({ isMenuOpen, setIsMenuOpen }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const { aiType, chatSettings } = useAIContext();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop > 20) {
        container.classList.add("is-scrolled");
      } else {
        container.classList.remove("is-scrolled");
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const typingMessage = "Hi, I am Chip. How can I help you?";
    let currentText = "";
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < typingMessage.length) {
        currentText += typingMessage[index];
        setMessages([
          { role: "assistant", content: currentText, isWelcome: true },
        ]);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();

      voices.forEach((voice, index) => {
        console.log(`${index}: ${voice.name} (${voice.lang})`);
      } );
      
      const utterance = new SpeechSynthesisUtterance(text);
      const maleVoice = voices.find(voice =>
        (voice.name.toLowerCase().includes('male') ||
         voice.name.toLowerCase().includes('man')) &&
        voice.lang.toLowerCase().startsWith('en')
      );

      if (maleVoice) {
        utterance.voice = maleVoice;
      }

      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech not supported in this browser");
    }
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Message copied to clipboard");
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessages = [
      ...(hasUserSentMessage
        ? messages
        : messages.filter((msg) => !msg.isWelcome)),
      { role: "user", content: inputMessage },
    ];

    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);
    setIsTyping(false);
    setHasUserSentMessage(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: chatSettings.systemPrompt,
          },
          ...newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        ],
        temperature: chatSettings.temperature,
        max_tokens: chatSettings.maxTokens,
      });

      const aiResponse = response.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`chat-assistant-wrapper ${
        isMenuOpen && "chat-assistant-wrapper-onsidebarOpen"
      }`}
    >
      <div className="messages-container" ref={messagesContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.isWelcome
                ? "welcome-message"
                : msg.role === "user"
                ? "user-message"
                : "ai-message"
            }
          >
            {msg.content}
            {msg.role === "assistant" && isTyping && (
              <span className="typing-cursor">|</span>
            )}
            {msg.role === "assistant" && !msg.isWelcome && (
              <div className="message-actions">
                <button
                  onClick={() => speakMessage(msg.content)}
                  className="message-action-btn"
                  title="Speak message"
                >
                  <Volume2 size={20} />
                </button>
                <button
                  onClick={() => copyMessage(msg.content)}
                  className="message-action-btn"
                  title="Copy message"
                >
                  <Copy size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
        {isLoading && <div className="loading">Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Talk with me about ${aiType} stuff`}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          disabled={isTyping}
        />
        <button onClick={sendMessage} disabled={isLoading || isTyping}>
          <img src={UpArrow} alt="Up arrow" width="20" height="18" />
        </button>
      </div>
    </div>
  );
}

export default ChatAssistant;