"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! I’m Rony. Feel free to ask about my work experience, technical skills, or career journey.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    const chatHistory = [...messages, userMessage].map((messsage) => ({
      role: messsage.sender === "user" ? "user" : "assistant",
      content: messsage.text,
    }));
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await response.json();
      const fallbackMessage = "Sorry, I couldn't answer that right now. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: data?.message || fallbackMessage,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I couldn't answer that right now. Please try again.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isMobile && isOpen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute top-[60px] right-3 bottom-3 left-3 flex flex-col rounded-2xl border border-gray-700/50 bg-gray-900/50 shadow-2xl shadow-teal-500/10 backdrop-blur-xl"
        >
          <div className="relative border-b border-gray-700/50">
            <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-teal-500 to-cyan-500" />
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 font-bold text-white">
                R
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Rony</h3>
                <p className="text-xs text-gray-400">Software Engineer</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-800/50"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className={message.sender === "user" ? "flex justify-end" : ""}>
                <div
                  className={`max-w-[85%] ${
                    message.sender === "ai"
                      ? "bg-gray-800/60 backdrop-blur-sm"
                      : "bg-gradient-to-r from-teal-500 to-cyan-500"
                  } rounded-2xl p-3`}
                >
                  <p className="text-sm text-white">{message.text}</p>
                  <p className="mt-1 text-xs text-gray-400">{formatTime(message.timestamp)}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div>
                <div className="max-w-[85%] rounded-2xl bg-gray-800/60 p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-gray-300"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: dot * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-700/50 p-4">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 rounded-full border border-gray-700/50 bg-gray-800/50 px-4 py-3 pr-12 text-sm text-white placeholder-gray-500 transition-colors focus:border-teal-500/50 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all hover:shadow-lg hover:shadow-teal-500/50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-6 bottom-24 z-50 flex h-[500px] w-[380px] flex-col rounded-2xl border border-gray-700/50 bg-gray-900/50 shadow-2xl shadow-teal-500/10 backdrop-blur-xl"
          >
            <div className="relative border-b border-gray-700/50">
              <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-teal-500 to-cyan-500" />
              <div className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 font-bold text-white">
                  R
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">Rony</h3>
                  <p className="text-xs text-gray-400">Software Engineer</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-800/50"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={message.sender === "user" ? "flex justify-end" : ""}
                >
                  <div
                    className={`max-w-[85%] ${
                      message.sender === "ai"
                        ? "bg-gray-800/60 backdrop-blur-sm"
                        : "bg-gradient-to-r from-teal-500 to-cyan-500"
                    } rounded-2xl p-3`}
                  >
                    <p className="text-sm text-white">{message.text}</p>
                    <p className="mt-1 text-xs text-gray-500">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div>
                  <div className="max-w-[85%] rounded-2xl bg-gray-800/60 p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          className="h-1.5 w-1.5 rounded-full bg-gray-300"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: dot * 0.15,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-700/50 p-4">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 rounded-full border border-gray-700/50 bg-gray-800/50 px-4 py-3 pr-12 text-sm text-white placeholder-gray-500 transition-colors focus:border-teal-500/50 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all hover:shadow-lg hover:shadow-teal-500/50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed right-6 bottom-6 z-50 cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.5 }}
      >
        <div className="relative">
          {!isOpen && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 opacity-75"
                animate={{
                  scale: [1, 1.4, 1.4],
                  opacity: [0.75, 0, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeOut",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 opacity-75"
                animate={{
                  scale: [1, 1.4, 1.4],
                  opacity: [0.75, 0, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeOut",
                  delay: 0.5,
                }}
              />
            </>
          )}

          <AnimatePresence>
            {showLabel && !isOpen && !isMobile && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute top-1/2 right-16 -translate-y-1/2 rounded-full bg-gray-800 px-3 py-1.5 text-sm whitespace-nowrap text-white shadow-lg"
              >
                Talk to me
                <motion.span
                  className="ml-1 inline-block"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  👋
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              isMobile ? "h-12 w-12" : "h-14 w-14"
            } relative flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30 transition-shadow hover:shadow-xl hover:shadow-teal-500/40`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={
              !isOpen
                ? {
                    y: [0, -8, 0],
                  }
                : {}
            }
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              },
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className={isMobile ? "h-5 w-5" : "h-6 w-6"} />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer"
                >
                  <MessageCircle className={isMobile ? "h-5 w-5" : "h-6 w-6"} />
                </motion.div>
              )}
            </AnimatePresence>

            {!isOpen && (
              <motion.span
                className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-black bg-red-500"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
