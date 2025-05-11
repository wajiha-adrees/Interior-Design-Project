'use client';
import { useState } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';

const ChatButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: '👋 Hi Wajiha Adrees! I\'m your interior design assistant. How may I help you with your design project today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Predefined responses for common questions
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you with your interior design needs today?";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
      return "Our interior design services are customized to your needs and budget. Would you like to schedule a free consultation to discuss your project requirements?";
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('provide')) {
      return "We offer comprehensive interior design services including space planning, color consultation, furniture selection, and complete room makeovers. What specific service are you interested in?";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('phone')) {
      return "You can reach us through our contact form on the website, or call us directly at our office. Would you like me to provide the contact details?";
    }
    
    if (lowerMessage.includes('appointment') || lowerMessage.includes('schedule') || lowerMessage.includes('consultation')) {
      return "I'd be happy to help you schedule a consultation. Would you prefer an in-person meeting or a virtual consultation?";
    }
    
    if (lowerMessage.includes('style') || lowerMessage.includes('design') || lowerMessage.includes('theme')) {
      return "We specialize in various design styles including modern, contemporary, traditional, and minimalist. What style are you most interested in for your space?";
    }
    
    if (lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('how long')) {
      return "Project timelines vary depending on the scope and complexity. A typical room makeover can take 4-6 weeks, while larger projects may take 3-6 months. Would you like to discuss your specific project timeline?";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else you'd like to know about our interior design services?";
    }

    // Default response for unrecognized queries
    return "I understand you're interested in interior design. Could you please provide more specific details about what you'd like to know? I can help with services, pricing, scheduling, or design styles.";
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages([
      {
        type: 'bot',
        content: '👋 Hi Wajiha Adrees! I\'m your interior design assistant. How may I help you with your design project today?'
      }
    ]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage = message.trim();
      setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
      setMessage('');
      setIsLoading(true);

      // Simulate a small delay for more natural conversation
      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        setMessages(prev => [...prev, {
          type: 'bot',
          content: botResponse
        }]);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className={`bg-gray-950 text-white p-4 rounded-full shadow-lg 
            transition-all duration-300 hover:bg-gray-800 hover:ring-2 hover:ring-gray-950 ring-offset-2
            ${isHovered ? 'rotate-12' : ''} 
            ${isOpen ? 'scale-90' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open chat"
        >
          <FaComments className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Modal */}
      <div
        className={`fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-2xl transition-all duration-300 transform 
          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
      >
        {/* Chat Header */}
        <div className="bg-gray-950 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h3 className="font-semibold text-lg">Let&apos;s Chat</h3>
          <button
            onClick={handleClose}
            className="hover:bg-gray-800 p-1 rounded-full transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="h-96 p-4 overflow-y-auto bg-zinc-50">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.type === 'user' 
                    ? 'bg-gray-950 text-white ml-auto' 
                    : 'bg-zinc-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="bg-zinc-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-sm text-gray-800">Typing...</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-950 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`bg-gray-950 text-white p-2 rounded-full hover:bg-gray-800 hover:ring-2 hover:ring-gray-950 ring-offset-2 transition-all ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              <FaPaperPlane className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatButton; 