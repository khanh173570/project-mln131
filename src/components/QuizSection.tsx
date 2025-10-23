import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Việc lựa chọn con đường quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa ở Việt Nam đã được Đảng Cộng sản Việt Nam xác định dứt khoát và đúng đắn từ văn kiện nào?",
    options: [
      "Cương lĩnh năm 1991",
      "Cương lĩnh năm 1930",
      "Đại hội VI (1986)",
      "Đại hội IX (2001)"
    ],
    correctAnswer: 1,
    explanation: "Cương lĩnh năm 1930 là văn kiện đầu tiên xác định dứt khoát con đường quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa ở Việt Nam."
  },
  {
    id: 2,
    question: "Theo Đại hội IX của Đảng, 'quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa' có nghĩa là bỏ qua việc xác lập vị trí thống trị của yếu tố nào?",
    options: [
      "Khoa học và công nghệ tư bản chủ nghĩa",
      "Quan hệ sản xuất tư bản chủ nghĩa và kiến trúc thượng tầng tư bản chủ nghĩa",
      "Hệ tư tưởng tư bản chủ nghĩa",
      "Lực lượng sản xuất hiện đại"
    ],
    correctAnswer: 1,
    explanation: "Bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa, nhưng vẫn kế thừa những thành tựu tích cực."
  },
  {
    id: 3,
    question: "Trong quá trình quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa, Việt Nam phải tiếp thu, kế thừa những thành tựu nào mà nhân loại đã đạt được dưới chế độ tư bản chủ nghĩa?",
    options: [
      "Chỉ các thành tựu về văn hóa và đạo đức",
      "Chỉ các thành tựu về quản lí và kinh tế học chính trị",
      "Đặc biệt là những thành tựu về khoa học và công nghệ, thành tựu về quản lí để phát triển xã hội",
      "Toàn bộ các hình thức sở hữu tư nhân"
    ],
    correctAnswer: 2,
    explanation: "Phải tiếp thu, kế thừa những thành tựu mà nhân loại đã đạt được dưới chủ nghĩa tư bản, đặc biệt là những thành tựu về khoa học và công nghệ, thành tựu về quản lí để phát triển xã hội."
  },
  {
    id: 4,
    question: "Trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam, dù còn nhiều hình thức phân phối, nhưng phân phối nào sau đây vẫn giữ vai trò chủ đạo?",
    options: [
      "Phân phối theo vốn và tài sản",
      "Phân phối theo lao động",
      "Phân phối theo mức độ đóng góp ngoài lao động",
      "Phân phối theo quỹ phúc lợi xã hội"
    ],
    correctAnswer: 1,
    explanation: "Phân phối theo lao động vẫn là chủ đạo (ngoài ra còn phân phối theo mức độ đóng góp và quỹ phúc lợi xã hội)."
  },
  {
    id: 5,
    question: "Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội (bổ sung, phát triển năm 2011) đã xác định mô hình chủ nghĩa xã hội Việt Nam với bao nhiêu đặc trưng bản chất?",
    options: [
      "6 đặc trưng",
      "7 đặc trưng",
      "8 đặc trưng",
      "9 đặc trưng"
    ],
    correctAnswer: 2,
    explanation: "Cương lĩnh (2011) đã phát triển mô hình chủ nghĩa xã hội Việt Nam với tám đặc trưng bản chất."
  },
  {
    id: 6,
    question: "Đặc trưng nào sau đây là một trong tám đặc trưng bản chất của chủ nghĩa xã hội Việt Nam theo Cương lĩnh (2011)?",
    options: [
      "Có nền kinh tế phát triển cao dựa trên chế độ công hữu hoàn toàn",
      "Con người có cuộc sống ấm no, tự do, hạnh phúc, có điều kiện phát triển toàn diện",
      "Có Nhà nước pháp quyền xã hội chủ nghĩa do Đảng Cộng sản lãnh đạo và thực hiện cơ chế đa đảng",
      "Mọi quyền lực thuộc về nhân dân và được thực hiện bằng chế độ dân chủ trực tiếp"
    ],
    correctAnswer: 1,
    explanation: "Con người có cuộc sống ấm no, tự do, hạnh phúc, có điều kiện phát triển toàn diện là một trong tám đặc trưng bản chất của chủ nghĩa xã hội Việt Nam."
  },
  {
    id: 7,
    question: "Cương lĩnh (Bổ sung và phát triển năm 2011) đã xác định bao nhiêu phương hướng cơ bản phản ánh con đường đi lên chủ nghĩa xã hội ở nước ta?",
    options: [
      "7 phương hướng",
      "8 phương hướng",
      "9 phương hướng",
      "12 phương hướng"
    ],
    correctAnswer: 1,
    explanation: "Cương lĩnh (2011) xác định 8 phương hướng cơ bản để xây dựng chủ nghĩa xã hội ở Việt Nam."
  },
  {
    id: 8,
    question: "Phương hướng nào sau đây được xác định trong Cương lĩnh (2011) về xây dựng chủ nghĩa xã hội ở Việt Nam?",
    options: [
      "Xây dựng và hoàn thiện mô hình kinh tế kế hoạch hóa tập trung",
      "Phát triển nền kinh tế thị trường định hướng xã hội chủ nghĩa",
      "Lấy phát triển văn hóa làm nhiệm vụ trung tâm",
      "Đổi mới chính trị làm khâu then chốt"
    ],
    correctAnswer: 1,
    explanation: "Phát triển nền kinh tế thị trường định hướng xã hội chủ nghĩa là một trong những phương hướng cơ bản được xác định trong Cương lĩnh (2011)."
  },
  {
    id: 9,
    question: "Để thực hiện các phương hướng cơ bản, Đảng ta yêu cầu phải đặc biệt chú trọng nắm vững và giải quyết tốt các mối quan hệ lớn. Theo Đại hội XII, có bao nhiêu mối quan hệ lớn cần được xử lý tốt?",
    options: [
      "7",
      "8",
      "9",
      "12"
    ],
    correctAnswer: 2,
    explanation: "Đại hội XII xác định 9 mối quan hệ lớn cần nhận thức và giải quyết tốt trong quá trình xây dựng chủ nghĩa xã hội."
  },
  {
    id: 10,
    question: "Mối quan hệ nào sau đây là một trong những mối quan hệ lớn cần quán triệt và xử lý tốt trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam?",
    options: [
      "Giữa độc lập, tự chủ và hội nhập quốc tế",
      "Giữa sở hữu nhà nước và sở hữu tư nhân",
      "Giữa giai cấp công nhân và giai cấp tư sản",
      "Giữa Nhà nước quản lý và Đảng lãnh đạo"
    ],
    correctAnswer: 0,
    explanation: "Quan hệ giữa độc lập, tự chủ và hội nhập quốc tế là một trong 9 mối quan hệ lớn cần được xử lý tốt."
  },
  {
    id: 11,
    question: "Để thực hiện các mục tiêu xây dựng đất nước theo định hướng xã hội chủ nghĩa, Đại hội XII (2016) đã xác định toàn Đảng, toàn dân ta cần quán triệt và thực hiện tốt bao nhiêu nhiệm vụ cơ bản?",
    options: [
      "8 nhiệm vụ",
      "9 nhiệm vụ",
      "11 nhiệm vụ",
      "12 nhiệm vụ"
    ],
    correctAnswer: 3,
    explanation: "Đại hội XII xác định cần quán triệt và thực hiện tốt 12 nhiệm vụ cơ bản để xây dựng đất nước theo định hướng xã hội chủ nghĩa."
  }
];

const QuizSection = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map());

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  // Tính điểm dựa trên số câu trả lời đúng
  const score = Array.from(userAnswers.entries()).reduce((acc, [questionId, answer]) => {
    const question = questions.find(q => q.id === questionId);
    return acc + (question && answer === question.correctAnswer ? 1 : 0);
  }, 0);

  // Khôi phục trạng thái cho câu hiện tại khi component load hoặc chuyển câu
  useEffect(() => {
    const currentAnswer = userAnswers.get(currentQuestion.id);
    if (currentAnswer !== undefined) {
      setSelectedAnswer(currentAnswer);
      setShowResult(true);
    } else {
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [currentQuestionIndex, userAnswers, currentQuestion.id]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    
    // Lưu câu trả lời
    const newAnswers = new Map(userAnswers);
    newAnswers.set(currentQuestion.id, selectedAnswer);
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    // Kiểm tra xem câu hiện tại đã được trả lời chưa
    if (!userAnswers.has(currentQuestion.id)) {
      // Nếu chưa trả lời, không cho phép chuyển câu
      return;
    }
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // useEffect sẽ tự động khôi phục trạng thái
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // useEffect sẽ tự động khôi phục trạng thái
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserAnswers(new Map());
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-4 tracking-tight">
              CÂU HỎI ÔN TẬP
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-full mb-6"></div>
          </div>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Kiểm tra kiến thức của bạn về <span className="text-amber-400 font-semibold">Quá độ lên chủ nghĩa xã hội ở Việt Nam</span>
          </p>
        </motion.div>
        {/* Quiz Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 max-w-5xl mx-auto"
        >
          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-slate-200 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-600">
                Câu {currentQuestionIndex + 1} / {totalQuestions}
              </span>
              <span className="text-lg font-semibold text-amber-400 bg-amber-900/30 px-4 py-2 rounded-full border border-amber-600/50">
                Điểm: {score} / {userAnswers.size}
              </span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-3 border border-slate-600/50">
              <motion.div
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 h-3 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-5 md:p-6 text-left rounded-2xl border-2 transition-all duration-300 ${
                      selectedAnswer === index
                        ? showResult
                          ? index === currentQuestion.correctAnswer
                            ? 'border-green-400 bg-green-500/20 text-green-100 shadow-green-500/20'
                            : 'border-red-400 bg-red-500/20 text-red-100 shadow-red-500/20'
                          : 'border-blue-400 bg-blue-500/20 text-blue-100 shadow-blue-500/20'
                        : showResult && index === currentQuestion.correctAnswer
                        ? 'border-green-400 bg-green-500/20 text-green-100 shadow-green-500/20'
                        : 'border-slate-600/50 bg-slate-800/30 text-slate-200 hover:border-slate-500 hover:bg-slate-700/40 hover:text-white'
                    } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'} shadow-xl backdrop-blur-sm`}
                    whileHover={!showResult ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center">
                      <span className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mr-4 text-lg font-bold ${
                        selectedAnswer === index || (showResult && index === currentQuestion.correctAnswer)
                          ? 'border-current bg-current text-slate-900'
                          : 'border-current'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-lg">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showResult && currentQuestion.explanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-400/30 p-6 mb-8 rounded-2xl backdrop-blur-sm"
                  >
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="text-indigo-100 text-lg">
                          <span className="font-semibold text-indigo-300">Giải thích:</span> {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <motion.button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center px-6 py-3 bg-slate-700/50 text-slate-300 rounded-xl border border-slate-600/50 hover:bg-slate-600/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-sm"
                  whileHover={currentQuestionIndex > 0 ? { scale: 1.05, x: -2 } : {}}
                  whileTap={currentQuestionIndex > 0 ? { scale: 0.95 } : {}}
                >
                  <ChevronLeftIcon className="w-5 h-5 mr-2" />
                  Trước
                </motion.button>

                <div className="flex flex-col items-center space-y-2">
                  <div className="flex space-x-4">
                    {!showResult && selectedAnswer !== null && (
                      <motion.button
                        onClick={handleSubmitAnswer}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        Trả lời
                      </motion.button>
                    )}

                    {currentQuestionIndex === totalQuestions - 1 && showResult ? (
                      <motion.button
                        onClick={resetQuiz}
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-500 hover:to-emerald-500 transition-all duration-300 font-semibold shadow-lg shadow-green-500/25 border border-green-400/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Làm lại
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === totalQuestions - 1 || !userAnswers.has(currentQuestion.id)}
                        className={`flex items-center px-6 py-3 rounded-xl border transition-all duration-300 backdrop-blur-sm ${
                          currentQuestionIndex === totalQuestions - 1 || !userAnswers.has(currentQuestion.id)
                            ? 'bg-slate-700/30 text-slate-500 border-slate-600/30 opacity-50 cursor-not-allowed'
                            : 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-600/50 hover:text-white'
                        }`}
                        whileHover={currentQuestionIndex < totalQuestions - 1 && userAnswers.has(currentQuestion.id) ? { scale: 1.05, x: 2 } : {}}
                        whileTap={currentQuestionIndex < totalQuestions - 1 && userAnswers.has(currentQuestion.id) ? { scale: 0.95 } : {}}
                      >
                        Tiếp
                        <ChevronRightIcon className="w-5 h-5 ml-2" />
                      </motion.button>
                    )}
                  </div>
                  
                  {/* Thông báo khi chưa trả lời */}
                  {currentQuestionIndex < totalQuestions - 1 && !userAnswers.has(currentQuestion.id) && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-amber-400 bg-amber-900/20 px-3 py-1 rounded-lg border border-amber-600/30"
                    >
                      💡 Vui lòng trả lời câu hỏi để tiếp tục
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Final Score */}
          {currentQuestionIndex === totalQuestions - 1 && userAnswers.size === totalQuestions && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="mt-12 p-8 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-400/30 rounded-3xl text-center backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center"
              >
                <span className="text-2xl font-bold text-white">{Math.round((score / totalQuestions) * 100)}%</span>
              </motion.div>
              
              <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Hoàn thành!
              </h3>
              
              <p className="text-xl text-slate-200 mb-4">
                Bạn đã trả lời đúng <span className="text-amber-400 font-bold">{score}</span> / <span className="text-orange-400 font-bold">{totalQuestions}</span> câu hỏi
              </p>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className={`text-lg mt-4 px-6 py-3 rounded-xl border ${
                  score >= totalQuestions * 0.8 
                    ? "text-green-300 bg-green-900/30 border-green-500/30" 
                    : score >= totalQuestions * 0.6 
                    ? "text-yellow-300 bg-yellow-900/30 border-yellow-500/30"
                    : "text-red-300 bg-red-900/30 border-red-500/30"
                }`}
              >
                {score >= totalQuestions * 0.8 
                  ? "🎉 Xuất sắc! Bạn đã nắm vững kiến thức về Quá độ lên chủ nghĩa xã hội ở Việt Nam!" 
                  : score >= totalQuestions * 0.6 
                  ? "👏 Khá tốt! Hãy ôn tập thêm để nắm vững hơn."
                  : "📚 Cần cố gắng hơn! Hãy đọc lại tài liệu và thử lại."
                }
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default QuizSection;