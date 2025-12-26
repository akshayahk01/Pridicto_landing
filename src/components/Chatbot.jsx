<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import { Send, Mic, X, MessageCircle, Maximize2, Minimize2, Moon, Sun } from "lucide-react";
=======
import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Lightbulb, MessageCircle, ThumbsUp } from 'lucide-react';
import aiSuggestionEngine from '../services/aiSuggestionEngine';
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b

const loadHistory = () =>
  JSON.parse(localStorage.getItem("chatHistory") || "[]");
const saveHistory = (data) =>
  localStorage.setItem("chatHistory", JSON.stringify(data));

<<<<<<< HEAD
export default function LuxuryChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(loadHistory());
  const [botTyping, setBotTyping] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Dragging
  const chatRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const startDrag = (e) => {
    const element = chatRef.current;
    const rect = element.getBoundingClientRect();
=======
// Suggestion Card Component for Chatbot
const SuggestionCard = ({ suggestion, onVote }) => (
  <div style={{
    background: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '12px',
    margin: '8px 0',
    maxWidth: '280px'
  }}>
    <div style={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>
      {suggestion.title}
    </div>
    <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>
      {suggestion.description}
    </div>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '11px',
      color: '#495057'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>👍 {suggestion.netVotes || 0}</span>
        <span>💬 {suggestion.commentCount || 0}</span>
      </div>
      <button
        onClick={() => onVote(suggestion.id)}
        style={{
          background: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
          fontSize: '11px'
        }}
      >
        Vote
      </button>
    </div>
  </div>
);

const getSuggestionSteps = (suggestions, dispatch, navigate) => [
  {
    id: '1',
    message: 'Hello! How can I help you today?',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 1, label: 'Learn about our services', trigger: '3' },
      { value: 2, label: 'Get personalized suggestions', trigger: '7' },
      { value: 3, label: 'Browse community ideas', trigger: '8' },
      { value: 4, label: 'Get a quote', trigger: '4' },
      { value: 5, label: 'Contact us', trigger: '5' },
      { value: 6, label: 'Explore now', trigger: '6' },
    ],
  },
  {
    id: '3',
    message: 'We offer Business Plans, Pitch Decks, Financial Modelling, Market Research, Startup Consulting, and HR Support. Which one interests you?',
    trigger: '2',
  },
  {
    id: '4',
    message: 'Please visit our Contact page to request a proposal. We\'ll get back to you soon!',
    end: true,
  },
  {
    id: '5',
    message: 'You can reach us at info@predicto.ai or visit the Contact page.',
    end: true,
  },
  {
    id: '6',
    message: 'Navigating to home page...',
    trigger: '7',
  },
  {
    id: '7',
    component: <NavigateToHome />,
    end: true,
  },
  {
    id: '7',
    component: <PersonalizedSuggestionsComponent />,
    trigger: '9',
  },
  {
    id: '8',
    component: <CommunitySuggestionsComponent />,
    trigger: '10',
  },
  {
    id: '9',
    message: 'Would you like to vote on any of these suggestions or explore more options?',
    trigger: '11',
  },
  {
    id: '10',
    message: 'What do you think about these community ideas? Want to vote or add your own suggestion?',
    trigger: '12',
  },
  {
    id: '11',
    options: [
      { value: 'vote', label: 'Vote on suggestions', trigger: '13' },
      { value: 'more', label: 'See more suggestions', trigger: '8' },
      { value: 'create', label: 'Create new suggestion', trigger: '14' },
      { value: 'done', label: 'That\'s all for now', trigger: '2' },
    ],
  },
  {
    id: '12',
    options: [
      { value: 'vote', label: 'Vote on suggestions', trigger: '13' },
      { value: 'create', label: 'Create new suggestion', trigger: '14' },
      { value: 'done', label: 'Thanks!', trigger: '2' },
    ],
  },
  {
    id: '13',
    component: <VoteComponent />,
    trigger: '15',
  },
  {
    id: '14',
    component: <CreateSuggestionComponent />,
    trigger: '2',
  },
  {
    id: '15',
    message: 'Great! Your vote has been recorded. Is there anything else I can help you with?',
    trigger: '2',
  },
];

// Personalized Suggestions Component
const PersonalizedSuggestionsComponent = () => {
  const { suggestions } = useSelector(state => state.suggestions);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const personalizedSuggestions = React.useMemo(() => {
    if (!isAuthenticated || !suggestions.length) return [];
    
    return aiSuggestionEngine.generatePersonalizedSuggestions(
      user,
      suggestions.slice(0, 3),
      {} // user behavior data
    );
  }, [suggestions, user, isAuthenticated]);

  return (
    <div>
      <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>
        💡 Personalized Suggestions for You
      </div>
      {personalizedSuggestions.map(suggestion => (
        <SuggestionCard 
          key={suggestion.id} 
          suggestion={suggestion} 
          onVote={(id) => {
            // Handle voting logic here
            console.log('Voting on suggestion:', id);
          }}
        />
      ))}
      {personalizedSuggestions.length === 0 && (
        <div style={{ fontStyle: 'italic', color: '#6c757d' }}>
          No personalized suggestions available at the moment.
        </div>
      )}
    </div>
  );
};

// Community Suggestions Component
const CommunitySuggestionsComponent = () => {
  const { suggestions } = useSelector(state => state.suggestions);
  
  const topSuggestions = suggestions
    .sort((a, b) => (b.netVotes || 0) - (a.netVotes || 0))
    .slice(0, 3);

  return (
    <div>
      <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>
        🔥 Trending Community Ideas
      </div>
      {topSuggestions.map(suggestion => (
        <SuggestionCard 
          key={suggestion.id} 
          suggestion={suggestion} 
          onVote={(id) => {
            console.log('Voting on suggestion:', id);
          }}
        />
      ))}
    </div>
  );
};

// Vote Component
const VoteComponent = () => (
  <div>
    <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>
      👍 Voting Made Easy!
    </div>
    <div style={{ fontSize: '14px', color: '#6c757d' }}>
      Click the "Vote" button on any suggestion you like. Your voice helps shape our platform!
    </div>
  </div>
);

// Create Suggestion Component  
const CreateSuggestionComponent = () => (
  <div>
    <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>
      ✨ Share Your Ideas
    </div>
    <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '8px' }}>
      We love hearing from our community! Your suggestions help us improve.
    </div>
    <div style={{ fontSize: '13px', color: '#495057' }}>
      Visit our Suggestions page to submit your idea and see what others are thinking about!
    </div>
  </div>
);

function NavigateToHome() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/');
  }, [navigate]);
  return null;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { suggestions } = useSelector(state => state.suggestions);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b

    pos.current = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
  };

  const drag = (e) => {
    const element = chatRef.current;
    element.style.left = `${e.clientX - pos.current.offsetX}px`;
    element.style.top = `${e.clientY - pos.current.offsetY}px`;
  };

  const stopDrag = () => {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    saveHistory(messages);
  }, [messages]);

  // 🔥 AI Ready Function
  const generateBotReply = async (text) => {
    return "This is AI placeholder response. Connect API to make it powerful 😎";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((p) => [...p, userMsg]);
    const query = input;
    setInput("");
    setBotTyping(true);

    const botReply = await generateBotReply(query);

    setTimeout(() => {
      const botMsg = { from: "bot", text: botReply };
      setMessages((p) => [...p, botMsg]);
      setBotTyping(false);
    }, 900);
  };

  const quickReplies = ["Pricing", "Show Services", "Portfolio", "Support"];

  const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (e) => setInput(e.results[0][0].transcript);
    recognition.start();
  };

  // Generate dynamic steps based on current state
  const dynamicSteps = getSuggestionSteps(suggestions, dispatch, navigate);

  return (
    <>
<<<<<<< HEAD
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-blue-500
           text-white p-5 rounded-full shadow-[0_0_30px_rgba(0,102,255,.8)]
           hover:scale-110 transition duration-300 animate-pulse"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {open && (
        <div
          ref={chatRef}
          className={`fixed ${
            fullscreen ? "bottom-0 right-0 w-full h-full" : "bottom-6 right-6 w-80 sm:w-96"
          } ${darkMode ? "bg-[#0b141a]" : "bg-white/85"}
           rounded-2xl shadow-2xl border overflow-hidden animate-popUp backdrop-blur-xl`}
        >
          {/* Header */}
          <div
            onMouseDown={startDrag}
            className={`flex justify-between items-center p-4 cursor-grab ${
              darkMode ? "bg-[#111b21] text-white" : "bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
            }`}
          >
            <div className="font-semibold tracking-wide">Predicto AI Assistant</div>

            <div className="flex gap-3 items-center">
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun /> : <Moon />}
              </button>

              <button onClick={() => setFullscreen(!fullscreen)}>
                {fullscreen ? <Minimize2 /> : <Maximize2 />}
              </button>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className={`h-80 ${
              fullscreen && "h-[85vh]"
            } p-4 overflow-y-auto space-y-3 ${
              darkMode ? "bg-[#0b141a]" : "bg-gray-100"
            }`}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] px-3 py-2 rounded-xl text-sm shadow ${
                  msg.from === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : darkMode
                    ? "bg-[#202c33] text-white"
                    : "bg-white text-gray-800 border"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {botTyping && (
              <div
                className={`w-16 px-3 py-2 rounded-xl shadow flex gap-1 ${
                  darkMode ? "bg-[#202c33]" : "bg-gray-300"
                }`}
              >
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          <div className={`p-3 flex flex-wrap gap-2 border-t ${darkMode ? "bg-[#111b21] text-white" : "bg-white"}`}>
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  handleSend();
                }}
                className="px-3 py-1 text-xs bg-gray-200 rounded-full hover:bg-gray-300"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className={`p-3 border-t flex items-center gap-2 ${darkMode ? "bg-[#111b21]" : "bg-white"}`}>
            <button onClick={startVoice}>
              <Mic className={`${darkMode ? "text-white" : "text-gray-600"}`} />
            </button>

            <input
              className={`flex-1 px-3 py-2 text-sm border rounded-full outline-none ${
                darkMode ? "bg-[#202c33] text-white" : ""
              }`}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              className="p-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full"
            >
              <Send />
            </button>
          </div>

          {/* Animations */}
          <style>
            {`
            .animate-popUp { animation: pop .35s ease; }
            @keyframes pop {
              from { transform: scale(.8); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .typing-dot {
              width: 6px;
              height: 6px;
              background: white;
              border-radius: 50%;
              animation: blink 1.3s infinite;
            }
            @keyframes blink {
              0% { opacity: .2 }
              50% { opacity: 1 }
              100% { opacity: .2 }
            }
          `}
          </style>
        </div>
=======
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          cursor: 'pointer',
          fontSize: '24px',
        }}
        onClick={toggleChat}
        title="Chat with us - Get personalized suggestions!"
      >
        {isAuthenticated ? '🤖✨' : '🤖'}
      </div>
      {isOpen && (
        <ThemeProvider theme={theme}>
          <ChatBot 
            steps={dynamicSteps} 
            floating={false}
            placeholder="Type your message..."
            enableSmoothScroll={true}
          />
        </ThemeProvider>
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b
      )}
    </>
  );
}
