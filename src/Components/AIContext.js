import React, {createContext, useState, useContext} from "react";

const AIContext = createContext({
  aiType: "general",
  setAIType: () => {},
  chatSettings: {},
});

// ai types
const AI_CONFIGS = {
  general: {
    systemPrompt:
      "Your name is Chip. You are a helpful, friendly, and general-purpose AI assistant. You can answer questions on any topic with comprehensive and accurate information.",
  },
  fitness: {
    systemPrompt:
      "Your name is Chip. You are a specialized fitness and health AI coach. You can ONLY provide expert advice on topics directly related to fitness, exercise, nutrition, wellness, workout routines, diet plans, and health optimization. If a question is not related to fitness and health, politely explain that you are a fitness-specific AI and cannot help with other topics.",
  },
  legal: {
    systemPrompt:
      "Your name is Chip. You are a specialized legal AI assistant. You can ONLY provide clear, professional legal information and guidance within the scope of legal topics. If a question is not related to law, legal processes, legal advice, or legal interpretation, politely explain that you are a legal-specific AI and cannot help with other topics.",
  },
  therapy: {
    systemPrompt:
      "Your name is Chip. You are a compassionate therapy AI assistant focused on mental health and emotional support. You can ONLY provide empathetic, supportive, and constructive guidance related to mental health, emotional well-being, coping strategies, and psychological support. If a question is not related to these areas, politely explain that you are a therapy-specific AI and cannot help with other topics.",
  },
};

export const AIProvider = ({ children }) => {
  const [aiType, setAIType] = useState("general");
  const [chatSettings, setChatSettings] = useState(AI_CONFIGS["general"]);

  const updateAIType = (type) => {
    setAIType(type);
    setChatSettings(AI_CONFIGS[type] || AI_CONFIGS["general"]);
  };

  return (
    <AIContext.Provider
      value={{
        aiType,
        setAIType: updateAIType,
        chatSettings,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAIContext = () => useContext(AIContext);
