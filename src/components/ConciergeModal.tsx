import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { Sparkles, Send, X, Utensils, Calendar, RefreshCw, User, Award } from 'lucide-react';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onOpenTableReservation: () => void;
  onOpenBanquetInquiry: () => void;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  onOpenTableReservation,
  onOpenBanquetInquiry
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'concierge',
      text: "Assalamu Alaikum and welcome! I am your AI Concierge for Dastarkhan Restaurant & Banquet Hall in Osmaninagar, Sylhet. Whether you seek signature Mughlai recommendations, details on our Royal Tandoori platters, or guidance on reserving our Pillarless Ballroom for your celebration, how may I assist you today?",
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && initialPrompt) {
      handleSendPrompt(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const quickQuestions = [
    "Which signature dishes do you recommend for a first-time guest at Dastarkhan?",
    "Tell me about wedding and walima receptions in the 500-guest Royal Ballroom.",
    "What is included in the Package B: Royal Heritage banquet menu?",
    "Can we reserve a family majlis or private dining suite for 25 people?"
  ];

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: promptText.trim(),
          history: messages.slice(1) // exclude welcome greeting from model history format
        })
      });

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'concierge',
        text: data.reply || "Pardon me, let me invite you to speak directly with our reservation supervisors.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'concierge',
        text: "Pardon me, our AI assistant is momentarily offline. Please contact our front desk at +880 1712 345678 for personal assistance.",
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#1c1b1b] border border-[#d4af37] max-w-3xl w-full h-[88vh] max-h-[680px] min-h-[420px] flex flex-col overflow-hidden shadow-2xl animate-fadeIn my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#444748] flex items-center justify-between bg-[#141313] shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#fed65b]/20 border border-[#fed65b] flex items-center justify-center text-[#fed65b] shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg sm:text-xl text-white font-bold">Dastarkhan AI Concierge</h3>
                <span className="hidden xs:inline-block px-2 py-0.5 bg-[#fed65b]/20 text-[#fed65b] text-[9px] sm:text-[10px] uppercase tracking-widest border border-[#d4af37] font-bold">
                  Dining & Events
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#c8c6c5] truncate max-w-[240px] sm:max-w-none">
                Culinary Advice • Grand Ballroom Banquets • Sylheti Traditions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-[#2a2625] text-[#e5e2e1] hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close Concierge"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 sm:p-3 bg-[#141313]/80 border-b border-[#444748] flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] uppercase tracking-wider text-[#c8c6c5] shrink-0 font-bold hidden sm:inline">
            Suggested:
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(q)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#2a2625] border border-[#444748] text-[#e5e2e1] hover:text-white hover:border-[#fed65b] text-[11px] sm:text-xs whitespace-nowrap transition-colors shrink-0 font-medium cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 bg-[#1c1b1b]">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 sm:gap-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 border ${
                    isUser
                      ? 'bg-[#2a2625] border-[#444748] text-white'
                      : 'bg-[#141313] border-[#fed65b] text-[#fed65b]'
                  }`}
                >
                  {isUser ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-3.5 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#fed65b] text-[#1c1b1b] font-bold'
                      : 'bg-[#242222] text-[#e5e2e1] border border-[#444748]'
                  }`}
                >
                  {!isUser && (
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-wider text-[#fed65b] mb-1.5 sm:mb-2 font-bold border-b border-[#444748] pb-1">
                      <span>Dastarkhan AI — Osmaninagar</span>
                      <span>{msg.timestamp}</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-2.5 sm:gap-3.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#141313] border border-[#fed65b] text-[#fed65b] flex items-center justify-center shrink-0">
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
              </div>
              <div className="bg-[#242222] text-[#c8c6c5] border border-[#444748] p-3 sm:p-4 text-xs italic">
                Dastarkhan AI Concierge is consulting the culinary ledger...
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Footer actions for Reservations */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#141313] border-t border-[#444748] flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs shrink-0">
          <span className="text-[#c8c6c5] font-medium text-[11px] sm:text-xs">Ready to experience Dastarkhan?</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenTableReservation();
              }}
              className="px-3 sm:px-4 py-1.5 bg-[#fed65b] text-[#1c1b1b] uppercase tracking-wider font-bold hover:bg-[#d4af37] text-[11px] sm:text-xs"
            >
              Reserve Table
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBanquetInquiry();
              }}
              className="px-3 sm:px-4 py-1.5 border border-[#d4af37] text-white uppercase tracking-wider font-bold hover:bg-[#d4af37]/15 text-[11px] sm:text-xs"
            >
              Inquire Banquet
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#141313] border-t border-[#444748] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Mughlai dishes, walima banquets, or majlis tables..."
              className="flex-1 bg-[#1c1b1b] border border-[#444748] px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#fed65b]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-widest font-bold hover:bg-[#d4af37] disabled:opacity-50 transition-colors flex items-center space-x-1.5 cursor-pointer shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

