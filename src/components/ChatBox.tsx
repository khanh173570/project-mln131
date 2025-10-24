import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  SparklesIcon,
  UserIcon,
  ArrowUpIcon,
  LightBulbIcon,
  MinusIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBoxProps {
  onChatToggle?: (isOpen: boolean) => void;
}

const ChatBox = ({ onChatToggle }: ChatBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Thông báo cho parent component khi trạng thái chat thay đổi
  useEffect(() => {
    onChatToggle?.(isOpen);
  }, [isOpen, onChatToggle]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Xin chào! Tôi là AI Assistant chuyên về Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam. Hãy hỏi tôi bất kỳ điều gì về chủ đề này!',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Suggested questions for better UX
  const suggestedQuestions = [
    "8 đặc trưng của CNXH Việt Nam là gì?",
    "Quá độ bỏ qua TBCN có nghĩa là gì?",
    "Phương hướng xây dựng CNXH ở VN?",
    "Mối quan hệ lớn trong thời kỳ quá độ?"
  ];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      // Kiểm tra API key OpenAI
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey || apiKey === 'your-openai-api-key-here' || apiKey === '') {
        // Chuyển thẳng vào fallback responses nếu không có API key
        const fallbackResponses: { [key: string]: string } = {
          'chủ nghĩa xã hội': 'Chủ nghĩa xã hội Việt Nam có 8 đặc trưng: (1) Do nhân dân làm chủ; (2) Nền kinh tế thị trường định hướng XHCN; (3) Nhà nước pháp quyền XHCN; (4) Nền văn hóa tiên tiến; (5) Con người phát triển toàn diện; (6) Xã hội công bằng, dân chủ, văn minh; (7) Môi trường sinh thái bền vững; (8) Quốc phòng toàn dân vững mạnh.',
          'xã hội': 'Chủ nghĩa xã hội Việt Nam có 8 đặc trưng: (1) Do nhân dân làm chủ; (2) Nền kinh tế thị trường định hướng XHCN; (3) Nhà nước pháp quyền XHCN; (4) Nền văn hóa tiên tiến; (5) Con người phát triển toàn diện; (6) Xã hội công bằng, dân chủ, văn minh; (7) Môi trường sinh thái bền vững; (8) Quốc phòng toàn dân vững mạnh.',
          '8 đặc trưng': 'Theo Cương lĩnh 2011, CNXH Việt Nam có 8 đặc trưng: (1) Do nhân dân làm chủ; (2) Nền kinh tế thị trường định hướng XHCN; (3) Nhà nước pháp quyền XHCN; (4) Nền văn hóa tiên tiến; (5) Con người phát triển toàn diện; (6) Xã hội công bằng, dân chủ, văn minh; (7) Môi trường sinh thái bền vững; (8) Quốc phòng toàn dân vững mạnh.',
          'quá độ': 'Thời kỳ quá độ lên CNXH ở VN là thời kỳ biến đổi từ xã hội nửa phong kiến, nửa thuộc địa lên CNXH, bỏ qua chế độ tư bản chủ nghĩa. Bắt đầu từ Cách mạng Tháng 8/1945, có 3 giai đoạn: (1) Dân tộc dân chủ nhân dân; (2) Quá độ lên CNXH; (3) CNXH và CNCN.',
          'bỏ qua': 'Việt Nam thực hiện quá độ lên CNXH bỏ qua chế độ tư bản chủ nghĩa, tức là từ xã hội nửa phong kiến, nửa thuộc địa chuyển thẳng lên CNXH mà không trải qua giai đoạn phát triển tư bản chủ nghĩa đầy đủ như các nước phương Tây.',
          'mối quan hệ': 'Trong thời kỳ quá độ có 4 mối quan hệ lớn: (1) Quan hệ giai cấp và đấu tranh giai cấp; (2) Quan hệ dân tộc và vấn đề dân tộc; (3) Quan hệ quốc tế và thời đại; (4) Quan hệ giữa con người và tự nhiên.',
          'phương hướng': 'Phương hướng xây dựng CNXH ở VN: (1) Công nghiệp hóa, hiện đại hóa; (2) Phát triển kinh tế tri thức; (3) Xây dựng nền dân chủ XHCN; (4) Xây dựng con người mới; (5) Xây dựng Đảng và Nhà nước trong sạch, vững mạnh.',
          'cương lĩnh': 'Cương lĩnh 2011 của Đảng CSVN là văn kiện quan trọng xác định mục ti표u, đường lối xây dựng và bảo vệ Tổ quốc trong thời kỳ quá độ lên CNXH, nêu rõ 8 đặc trưng bản chất của CNXH Việt Nam.',
          'đảng': 'Đảng Cộng sản Việt Nam thành lập 3/2/1930, là lực lượng lãnh đạo Nhà nước và xã hội, đại diện cho lợi ích của giai cấp công nhân, nhân dân lao động và toàn dân tộc Việt Nam.',
          'hồ chí minh': 'Chủ tịch Hồ Chí Minh (1890-1969) là lãnh tụ vĩ đại của Đảng và nhân dân Việt Nam, người sáng lập Đảng CSVN, Chủ tịch nước VNDCCH, có công lao to lớn trong sự nghiệp giải phóng dân tộc và xây dựng CNXH.',
          'test': 'Tôi đang hoạt động bình thường! Hỏi tôi về: 8 đặc trưng CNXH, thời kỳ quá độ, mối quan hệ lớn, phương hướng xây dựng CNXH.',
          'hello': 'Xin chào! Tôi chuyên về CNXH và thời kỳ quá độ lên CNXH ở Việt Nam.',
          'hi': 'Chào bạn! Hỏi tôi về: 8 đặc trưng CNXH, quá độ bỏ qua TBCN, mối quan hệ lớn.',
          'xin chào': 'Xin chào! Tôi là AI Assistant chuyên về Chủ nghĩa xã hội và thời kỳ quá độ lên CNXH ở Việt Nam.'
        };

        const lowerMessage = userMessage.toLowerCase();
        for (const [key, response] of Object.entries(fallbackResponses)) {
          if (lowerMessage.includes(key)) {
            return response;
          }
        }
        return 'Tôi có thể giúp bạn tìm hiểu về: 8 đặc trưng CNXH, thời kỳ quá độ lên CNXH, mối quan hệ lớn, phương hướng xây dựng CNXH. Hãy hỏi tôi!';
      }

      // Gọi OpenAI API với timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 giây timeout
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Bạn là một AI assistant chuyên về Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam. 
              Hãy trả lời các câu hỏi một cách chính xác, ngắn gọn và dễ hiểu (tối đa 200 từ).
              Tập trung CHÍNH vào các chủ đề:
              - Quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa ở Việt Nam
              - 8 đặc trưng bản chất của chủ nghĩa xã hội Việt Nam (Cương lĩnh 2011)
              - Các phương hướng xây dựng chủ nghĩa xã hội ở Việt Nam
              - Các mối quan hệ lớn trong thời kỳ quá độ
              - Nhiệm vụ cơ bản xây dựng đất nước theo định hướng xã hội chủ nghĩa
              CHỈ trả lời về những chủ đề này. Nếu câu hỏi không liên quan, hãy hướng dẫn người dùng hỏi về các chủ đề chính.
              Trả lời bằng tiếng Việt.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        
        // Parse error để hiểu rõ hơn
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error?.code === 'insufficient_quota') {
            throw new Error('QUOTA_EXCEEDED');
          }
          if (errorData.error?.code === 'invalid_api_key') {
            throw new Error('INVALID_API_KEY');
          }
        } catch (parseError) {
          // Nếu không parse được, vẫn tiếp tục với lỗi gốc
        }
        
        throw new Error(`OpenAI API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      const text = data.choices?.[0]?.message?.content || 'Không nhận được phản hồi từ AI.';
      return text;
    } catch (error) {
      // Fallback responses cho các câu hỏi phổ biến
      const fallbackResponses: { [key: string]: string } = {
        'chủ nghĩa xã hội': 'Chủ nghĩa xã hội Việt Nam có 8 đặc trưng: (1) Do nhân dân làm chủ; (2) Nền kinh tế thị trường định hướng XHCN; (3) Nhà nước pháp quyền XHCN; (4) Nền văn hóa tiên tiến; (5) Con người phát triển toàn diện; (6) Xã hội công bằng, dân chủ, văn minh; (7) Môi trường sinh thái bền vững; (8) Quốc phòng toàn dân vững mạnh.',
        'xã hội': 'Chủ nghĩa xã hội Việt Nam có 8 đặc trưng: (1) Do nhân dân làm chủ; (2) Nền kinh tế thị trường định hướng XHCN; (3) Nhà nước pháp quyền XHCN; (4) Nền văn hóa tiên tiến; (5) Con người phát triển toàn diện; (6) Xã hội công bằng, dân chủ, văn minh; (7) Môi trường sinh thái bền vững; (8) Quốc phòng toàn dân vững mạnh.',
        '8 đặc trưng': 'Theo Cương lĩnh 2011, CNXH Việt Nam có 8 đặc trưng: (1) Do nhân dân làm chủ; (2) Nền kinh tế thị trường định hướng XHCN; (3) Nhà nước pháp quyền XHCN; (4) Nền văn hóa tiên tiến; (5) Con người phát triển toàn diện; (6) Xã hội công bằng, dân chủ, văn minh; (7) Môi trường sinh thái bền vững; (8) Quốc phòng toàn dân vững mạnh.',
        'quá độ': 'Thời kỳ quá độ lên CNXH ở VN là thời kỳ biến đổi từ xã hội nửa phong kiến, nửa thuộc địa lên CNXH, bỏ qua chế độ tư bản chủ nghĩa. Bắt đầu từ Cách mạng Tháng 8/1945, có 3 giai đoạn: (1) Dân tộc dân chủ nhân dân; (2) Quá độ lên CNXH; (3) CNXH và CNCN.',
        'bỏ qua': 'Việt Nam thực hiện quá độ lên CNXH bỏ qua chế độ tư bản chủ nghĩa, tức là từ xã hội nửa phong kiến, nửa thuộc địa chuyển thẳng lên CNXH mà không trải qua giai đoạn phát triển tư bản chủ nghĩa đầy đủ như các nước phương Tây.',
        'mối quan hệ': 'Trong thời kỳ quá độ có 4 mối quan hệ lớn: (1) Quan hệ giai cấp và đấu tranh giai cấp; (2) Quan hệ dân tộc và vấn đề dân tộc; (3) Quan hệ quốc tế và thời đại; (4) Quan hệ giữa con người và tự nhiên.',
        'phương hướng': 'Phương hướng xây dựng CNXH ở VN: (1) Công nghiệp hóa, hiện đại hóa; (2) Phát triển kinh tế tri thức; (3) Xây dựng nền dân chủ XHCN; (4) Xây dựng con người mới; (5) Xây dựng Đảng và Nhà nước trong sạch, vững mạnh.',
        'cương lĩnh': 'Cương lĩnh 2011 của Đảng CSVN là văn kiện quan trọng xác định mục tiêu, đường lối xây dựng và bảo vệ Tổ quốc trong thời kỳ quá độ lên CNXH, nêu rõ 8 đặc trưng bản chất của CNXH Việt Nam.',
        'đảng': 'Đảng Cộng sản Việt Nam thành lập 3/2/1930, là lực lượng lãnh đạo Nhà nước và xã hội, đại diện cho lợi ích của giai cấp công nhân, nhân dân lao động và toàn dân tộc Việt Nam.',
        'hồ chí minh': 'Chủ tịch Hồ Chí Minh (1890-1969) là lãnh tụ vĩ đại của Đảng và nhân dân Việt Nam, người sáng lập Đảng CSVN, Chủ tịch nước VNDCCH, có công lao to lớn trong sự nghiệp giải phóng dân tộc và xây dựng CNXH.',
        'test': 'Tôi đang hoạt động bình thường! Hỏi tôi về: 8 đặc trưng CNXH, thời kỳ quá độ, mối quan hệ lớn, phương hướng xây dựng CNXH.',
        'xin chào': 'Xin chào! Tôi là AI Assistant chuyên về Chủ nghĩa xã hội và thời kỳ quá độ lên CNXH ở Việt Nam.',
        'hello': 'Xin chào! Tôi chuyên về CNXH và thời kỳ quá độ lên CNXH ở Việt Nam.'
      };

      // Tìm fallback response
      const lowerMessage = userMessage.toLowerCase();
      
      for (const [key, response] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(key)) {
          return `[Chế độ offline] ${response}`;
        }
      }
      
      // Xử lý các loại lỗi khác nhau
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return 'Phản hồi từ AI quá lâu, đã chuyển sang chế độ offline. Hãy thử lại!';
        }
        if (error.message.includes('API_KEY')) {
          return 'Lỗi: API key không hợp lệ. Vui lòng kiểm tra cấu hình API key.';
        }
        if (error.message.includes('quota')) {
          return 'Lỗi: Đã vượt quá giới hạn API. Vui lòng thử lại sau.';
        }
        if (error.message.includes('network') || error.message.includes('fetch')) {
          return 'Lỗi: Không thể kết nối internet. Đã chuyển sang chế độ offline.';
        }
      }
      
      return 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc hỏi về: 8 đặc trưng CNXH, thời kỳ quá độ, mối quan hệ lớn, phương hướng xây dựng CNXH.';
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await generateResponse(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  }, [inputValue, isLoading]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }, []);

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 z-50 w-16 h-16 rounded-full shadow-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
        } flex items-center justify-center`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <XMarkIcon className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <ChatBubbleLeftRightIcon className="w-7 h-7 text-white" />
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.3, y: 50 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 z-40 w-full max-w-md h-[600px] md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden mx-4 md:mx-0"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-5 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <SparklesIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-sm text-blue-100">Đang online</p>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MinusIcon className="w-4 h-4" />
                </motion.button>
              </div>
              
              {/* Subtitle */}
              <p className="text-blue-100 text-sm mt-2">Chuyên gia về Chủ nghĩa Xã hội & Thời kỳ Quá độ</p>
              
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -left-8 -bottom-2 w-16 h-16 bg-white/5 rounded-full"></div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-4"
                >
                  <p className="text-sm text-gray-600 mb-3 text-center">Gợi ý câu hỏi:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 text-sm text-blue-700 transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <LightBulbIcon className="w-4 h-4 inline mr-2" />
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    }`}>
                      {message.isUser ? (
                        <UserIcon className="w-4 h-4" />
                      ) : (
                        <SparklesIcon className="w-4 h-4" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 relative ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                        : 'bg-white text-gray-800 shadow-md border border-gray-100'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.isUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                      
                      {/* Message tail */}
                      <div className={`absolute bottom-2 ${
                        message.isUser 
                          ? '-right-2 border-l-8 border-l-blue-500 border-t-8 border-t-transparent border-b-8 border-b-transparent' 
                          : '-left-2 border-r-8 border-r-white border-t-8 border-t-transparent border-b-8 border-b-transparent'
                      } w-0 h-0`}></div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Enhanced Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end space-x-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center">
                      <SparklesIcon className="w-4 h-4" />
                    </div>
                    <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-gray-100 relative">
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">AI đang suy nghĩ...</span>
                      </div>
                      
                      {/* Message tail */}
                      <div className="absolute bottom-2 -left-2 border-r-8 border-r-white border-t-8 border-t-transparent border-b-8 border-b-transparent w-0 h-0"></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-3 items-end">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Hỏi về chủ nghĩa xã hội và quá độ..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                    disabled={isLoading}
                    maxLength={500}
                  />
                  <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                    {inputValue.length}/500
                  </div>
                </div>
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUpIcon className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Character count warning */}
              {inputValue.length > 400 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-orange-500 mt-1 text-center"
                >
                  Còn {500 - inputValue.length} ký tự
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBox;