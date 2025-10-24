import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizSection from "./QuizSection";

// CSS để ẩn thanh cuộn
const hideScrollbarStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  .hide-scrollbar::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

// Thêm styles vào document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = hideScrollbarStyles;
  document.head.appendChild(styleSheet);
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  subItems?: string[];
}

interface ComparisonItem {
  left: string;
  right: string;
  icon?: string;
}

interface Section {
  id: string;
  title: string;
  content: string[];
  image?: string; // Thêm hình ảnh cho section
  subsections?: {
    title: string;
    content: string[];
    image?: string; // Thêm hình ảnh cho subsection
    timeline?: TimelineEvent[];
    comparison?: ComparisonItem[];
    cards?: {
      title: string;
      content: string;
      image?: string;
    }[];
  }[];
}

const sections: Section[] = [
  {
    id: "transition-socialism",
    title: "3.1. Quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa",
    content: [],
    image: "/images/img1.png",
    subsections: [
      {
        title: "A. Bối cảnh lịch sử và Đặc điểm xuất phát",
        image: "/images/img3.jpg",
        content: [
          "Xuất phát điểm thấp: Việt Nam vốn là xã hội thuộc địa, nửa phong kiến, lực lượng sản xuất rất thấp.",
          "Hậu quả chiến tranh: Đất nước trải qua chiến tranh ác liệt, kéo dài nhiều thập kỉ, hậu quả để lại còn nặng nề. Vẫn còn nhiều tàn dư thực dân phong kiến.",
          "Thách thức chính trị: Các thế lực thù địch thường xuyên tìm cách phá hoại chế độ xã hội chủ nghĩa và nền độc lập dân tộc của nhân dân ta.",
          "Xu thế thời đại:",
          "- Cuộc cách mạng khoa học công nghệ hiện đại đang diễn ra mạnh mẽ, tạo thời cơ phát triển nhanh nhưng cũng đặt ra những thách thức gay gắt.",
          "- Thời đại ngày nay vẫn là thời đại quá độ từ CNTB lên CNXH, cho dù chế độ XHCN ở Liên Xô và Đông Âu sụp đổ.",
          "- Theo quy luật tiến hóa của lịch sử, loài người nhất định sẽ tiến tới CNXH.",
        ],
      },
      {
        title: 'B. Con đường và nội dung của Quá độ "Bỏ qua"',
        image: "/images/img4.jpg",
        content: [],
        cards: [
          {
            title: "1. Tính tất yếu của sự lựa chọn",
            content:
              "Quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa là sự lựa chọn duy nhất đúng, khoa học, phản ánh đúng quy luật phát triển khách quan của cách mạng Việt Nam. Đây là sự lựa chọn dứt khoát và đúng đắn của Đảng, đáp ứng nguyện vọng của dân tộc và phù hợp với xu thế thời đại.",
            image: "/images/ca1.jpg",
          },
          {
            title:
              "2. Quan niệm về 'Bỏ qua chế độ tư bản chủ nghĩa' (Đại hội IX)",
            content:
              "Bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa. Không có nghĩa là đoạn tuyệt hoàn toàn mà phải tiếp thu, kế thừa những thành tựu mà nhân loại đã đạt được, đặc biệt là về khoa học, công nghệ và quản lý để phát triển xã hội.",
            image: "/images/ca2.jpg",
          },
          {
            title: "3. Biểu hiện của việc 'Bỏ qua' về mặt kinh tế",
            content:
              "Trong thời kỳ quá độ, vẫn còn nhiều hình thức sở hữu và thành phần kinh tế. Tuy nhiên, sở hữu tư nhân tư bản chủ nghĩa không chiếm vai trò chủ đạo. Phân phối theo lao động vẫn là chủ đạo, nhưng vẫn còn phân phối theo mức độ đóng góp và quỹ phúc lợi xã hội.",
            image: "/images/ca3.jpg",
          },
          {
            title: "4. Tính chất của quá trình quá độ",
            content:
              "Là tạo ra sự biến đổi về chất của xã hội trên tất cả các lĩnh vực. Là sự nghiệp rất khó khăn, phức tạp, lâu dài với nhiều chặng đường, nhiều hình thức tổ chức kinh tế, xã hội có tính chất quá độ.",
            image: "/images/ca4.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "characteristics",
    title: "3.2. Đặc trưng của CNXH và phương hướng xây dựng CNXH ở Việt Nam",
    content: [],
    image: "/images/img2.jpg",
    subsections: [
      {
        title: "3.2.1. Đặc trưng bản chất của CNXH Việt Nam",
        image: "/images/img1.png",
        content: [
          "Nhận thức của Đảng ta về chủ nghĩa xã hội ngày càng sáng rõ. Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội (Bổ sung, phát triển năm 2011) đã xác định mô hình chủ nghĩa xã hội Việt Nam với tám đặc trưng:",
        ],
        cards: [
          {
            title: "1. Dân giàu, nước mạnh, dân chủ, công bằng, văn minh",
            content: "Mục tiêu tổng quát của xây dựng CNXH ở Việt Nam",
            image: "/images/dt1.jpg",
          },
          {
            title: "2. Do nhân dân làm chủ",
            content: "Nhân dân là chủ thể của quá trình xây dựng CNXH",
            image: "/images/dt2.jpg",
          },
          {
            title: "3. Có nền kinh tế phát triển cao",
            content:
              "Dựa trên lực lượng sản xuất hiện đại và quan hệ sản xuất tiến bộ phù hợp",
            image: "/images/dt3.jpg",
          },
          {
            title: "4. Nền văn hóa tiên tiến, đậm đà bản sắc dân tộc",
            content: "Phát triển văn hóa vừa hiện đại vừa dân tộc",
            image: "/images/dt4.jpg",
          },
          {
            title: "5. Con người có cuộc sống ấm no, tự do, hạnh phúc",
            content: "Con người được phát triển toàn diện",
            image: "/images/dt5.jpg",
          },
          {
            title: "6. Các dân tộc bình đẳng, đoàn kết",
            content:
              "Các dân tộc trong cộng đồng Việt Nam bình đẳng, đoàn kết, tôn trọng và giúp nhau cùng phát triển",
            image: "/images/dt6.jpg",
          },
          {
            title: "7. Nhà nước pháp quyền XHCN của nhân dân",
            content:
              "Nhà nước của nhân dân, do nhân dân, vì nhân dân do Đảng Cộng sản lãnh đạo",
            image: "/images/dt7.jpg",
          },
          {
            title: "8. Quan hệ hữu nghị và hợp tác quốc tế",
            content:
              "Có quan hệ hữu nghị và hợp tác với các nước trên thế giới",
            image: "/images/dt8.png",
          },
        ],
      },
      {
        title: "3.2.2. Phương hướng xây dựng CNXH ở Việt Nam hiện nay",
        image: "/images/img2.jpg",
        content: [
          "Đảng ta đã xác định phương hướng xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội:",
        ],
        timeline: [
          {
            year: "Nội Dung Chính 1",
            title: "Tám Phương Hướng Cơ Bản",
            description:
              "Đảng ta đã xác định tám phương hướng cơ bản để xây dựng đất nước trong thời kỳ quá độ:",
            image: "/images/timeline1.jpg",
            subItems: [
              "Đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước gắn với phát triển kinh tế tri thức, bảo vệ tài nguyên, môi trường.",
              "Phát triển nền kinh tế thị trường định hướng xã hội chủ nghĩa.",
              "Xây dựng nền văn hóa tiên tiến, đậm đà bản sắc dân tộc; xây dựng con người, nâng cao đời sống nhân dân.",
              "Bảo đảm vững chắc quốc phòng và an ninh quốc gia, trật tự, an toàn xã hội.",
              "Thực hiện đường lối đối ngoại độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển.",
              "Xây dựng nền dân chủ xã hội chủ nghĩa, thực hiện đại đoàn kết toàn dân tộc.",
              "Xây dựng Nhà nước pháp quyền xã hội chủ nghĩa của nhân dân, do nhân dân, vì nhân dân.",
              "Xây dựng Đảng trong sạch, vững mạnh.",
            ],
          },
          {
            year: "Nội Dung Chính 2",
            title: "Yêu cầu trong quá trình thực hiện",
            description:
              "Trong quá trình thực hiện tám phương hướng cơ bản, cần phải đặc biệt chú trọng nắm vững và giải quyết tốt các mối quan hệ lớn:",
            image: "/images/timeline2.jpg",
            subItems: [
              "Quan hệ giữa đổi mới, ổn định và phát triển.",
              "Quan hệ giữa đổi mới kinh tế và đổi mới chính trị.",
              "Quan hệ giữa tuân theo các quy luật thị trường và bảo đảm định hướng XHCN.",
              "Quan hệ giữa phát triển lực lượng sản xuất và xây dựng quan hệ sản xuất XHCN.",
              "Quan hệ giữa Nhà nước và thị trường.",
              "Quan hệ giữa tăng trưởng kinh tế và phát triển văn hóa, thực hiện tiến bộ và công bằng xã hội.",
              "Quan hệ giữa xây dựng CNXH và bảo vệ Tổ quốc XHCN.",
              "Quan hệ giữa độc lập, tự chủ và hội nhập quốc tế.",
              "Quan hệ giữa Đảng lãnh đạo, Nhà nước quản lý, nhân dân làm chủ.",
            ],
          },
        ],
      },
    ],
  },
];

const ContentSection = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const [selectedSubsection, setSelectedSubsection] = useState<{
    sectionId: string;
    subsectionIndex: number;
  } | null>(null);

  // Lock page scrolling when any section is expanded (fullscreen overlay open)
  useEffect(() => {
    const hasOpen = expandedSections.size > 0 || selectedSubsection !== null;
    const prev = document.body.style.overflow;
    if (hasOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev || "";
    }
    return () => {
      // restore when component unmounts
      document.body.style.overflow = prev || "";
    };
  }, [expandedSections, selectedSubsection]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const openSubsectionModal = (sectionId: string, subsectionIndex: number) => {
    setSelectedSubsection({ sectionId, subsectionIndex });
  };

  const closeSubsectionModal = () => {
    setSelectedSubsection(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#d32f2f",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Nội Dung Chính
        </h2>

        {/* Section List */}
        {sections.map((section) => (
          <motion.div
            id={section.id}
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              borderLeft: "4px solid #d32f2f",
              transition: "box-shadow 0.2s",
              scrollMarginTop: "80px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 10px 15px rgba(0, 0, 0, 0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)")
            }
          >
            {/* Header with image */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                padding: "24px",
                cursor: "pointer",
                backgroundColor: expandedSections.has(section.id)
                  ? "#f8f8f8"
                  : "white",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => toggleSection(section.id)}
            >
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#d32f2f",
                    margin: 0,
                    marginBottom: "8px",
                  }}
                >
                  {section.title}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    margin: 0,
                  }}
                >
                  Bấm để{" "}
                  {expandedSections.has(section.id)
                    ? "thu gọn"
                    : "xem chi tiết"}
                </p>
              </div>
              {section.image && (
                <div style={{ width: "120px", height: "80px", flexShrink: 0 }}>
                  <img
                    src={section.image}
                    alt={section.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  fontSize: "24px",
                  color: "#d32f2f",
                  transform: expandedSections.has(section.id)
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              >
                ▼
              </div>
            </div>
          </motion.div>
        ))}

        {/* Fullscreen Expandable Content */}
        {sections.map((section) => (
          <AnimatePresence key={`fullscreen-${section.id}`}>
            {expandedSections.has(section.id) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1000,
                  overflowY: "auto",
                }}
              >
                {/* Full-width overlay header (improved title) */}
                <motion.div
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1001,
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.98), rgba(255,255,255,0.95))",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    padding: "18px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    backdropFilter: "saturate(1.1) blur(6px)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#d32f2f",
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {section.title}
                    </h2>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <button
                      aria-label="Close section"
                      onClick={() => toggleSection(section.id)}
                      style={{
                        background: "#d32f2f",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      X
                    </button>
                  </div>
                </motion.div>

                {/* Background Content - make overlay content the only scrollable area */}
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 1000,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    background: "rgba(0,0,0,0.25)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "1200px",
                      height: "100vh",
                      overflow: "auto",
                      scrollBehavior: "smooth",
                      backgroundImage:
                        section.id === "transition-socialism"
                          ? "url(/images/bg-transition.svg)"
                          : section.id === "characteristics"
                          ? "url(/images/bg-characteristics.svg)"
                          : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      paddingTop: "80px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingBottom: "40px",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                    className="hide-scrollbar"
                  >
                    <div
                      style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                      }}
                    >
                      {section.content.length > 0 && (
                        <ul
                          style={{
                            listStyleType: "disc",
                            listStylePosition: "inside",
                            marginBottom: "24px",
                          }}
                        >
                          {section.content.map((item, index) => (
                            <li
                              key={index}
                              style={{
                                color: "#555",
                                marginBottom: "8px",
                                lineHeight: "1.6",
                              }}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Subsections for characteristics section */}
                      {section.subsections &&
                        section.id === "characteristics" && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "32px",
                            }}
                          >
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns:
                                  "repeat(auto-fit, minmax(400px, 1fr))",
                                gap: "32px",
                                marginBottom: "32px",
                              }}
                            >
                              {section.subsections.map((subsection, index) => {
                                const cardStyles = [
                                  {
                                    bg: "url(/images/img1.png)",
                                    light: "rgba(102, 126, 234, 0.1)",
                                    bgColor: "#667eea",
                                  },
                                  {
                                    bg: "url(/images/img2.jpg)",
                                    light: "rgba(240, 147, 251, 0.1)",
                                    bgColor: "#f093fb",
                                  },
                                ];
                                const cardStyle =
                                  cardStyles[index % cardStyles.length];

                                return (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                      delay: index * 0.2,
                                      duration: 0.6,
                                      ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                    whileHover={{
                                      scale: 1.05,
                                      y: -8,
                                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                                    }}
                                    onClick={() =>
                                      openSubsectionModal(section.id, index)
                                    }
                                    style={{
                                      background: "white",
                                      borderRadius: "16px",
                                      overflow: "hidden",
                                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                      cursor: "pointer",
                                      transition:
                                        "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                                      border: "2px solid rgba(0,0,0,0.05)",
                                      position: "relative",
                                      marginTop: "200px",
                                    }}
                                  >
                                    {/* Image header */}
                                    <div
                                      style={{
                                        backgroundImage: cardStyle.bg,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor: cardStyle.bgColor,
                                        height: "200px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        position: "relative",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {/* Overlay for better text visibility */}
                                      <div
                                        style={{
                                          position: "absolute",
                                          top: 0,
                                          left: 0,
                                          right: 0,
                                          bottom: 0,
                                          backgroundColor: "rgba(0,0,0,0.4)",
                                          zIndex: 0,
                                        }}
                                      ></div>
                                      <div
                                        style={{
                                          textAlign: "center",
                                          color: "white",
                                          zIndex: 1,
                                          position: "relative",
                                        }}
                                      ></div>
                                    </div>

                                    {/* Content */}
                                    <div
                                      style={{
                                        padding: "32px",
                                        background: cardStyle.light,
                                        minHeight: "240px",
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <h3
                                        style={{
                                          fontSize: "22px",
                                          fontWeight: "bold",
                                          color: "#333",
                                          marginBottom: "16px",
                                          lineHeight: "1.4",
                                        }}
                                      >
                                        {subsection.title}
                                      </h3>

                                      {/* Content items count */}
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "16px",
                                          marginBottom: "24px",
                                          flexWrap: "wrap",
                                        }}
                                      >
                                        {subsection.content &&
                                          subsection.content.length > 0 && (
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                padding: "8px 16px",
                                                backgroundColor: "white",
                                                borderRadius: "20px",
                                                boxShadow:
                                                  "0 2px 8px rgba(0,0,0,0.05)",
                                              }}
                                            >
                                              <span
                                                style={{ fontSize: "18px" }}
                                              >
                                                📋
                                              </span>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                  color: "#333",
                                                }}
                                              >
                                                {subsection.content.length} nội
                                                dung chính
                                              </span>
                                            </div>
                                          )}
                                        {subsection.cards &&
                                          subsection.cards.length > 0 && (
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                padding: "8px 16px",
                                                backgroundColor: "white",
                                                borderRadius: "20px",
                                                boxShadow:
                                                  "0 2px 8px rgba(0,0,0,0.05)",
                                              }}
                                            >
                                              <span
                                                style={{ fontSize: "18px" }}
                                              >
                                                🎯
                                              </span>
                                              <span
                                                style={{
                                                  fontWeight: "bold",
                                                  color: "#333",
                                                }}
                                              >
                                                {subsection.cards.length} nội
                                                dung chi tiết
                                              </span>
                                            </div>
                                          )}
                                      </div>

                                      {/* Description preview */}
                                      <p
                                        style={{
                                          fontSize: "14px",
                                          color: "#666",
                                          lineHeight: "1.6",
                                          flex: 1,
                                          marginBottom: "24px",
                                        }}
                                      >
                                        {subsection.content &&
                                        subsection.content[0]
                                          ? subsection.content[0].substring(
                                              0,
                                              100
                                            ) + "..."
                                          : "Nhấp để xem chi tiết"}
                                      </p>

                                      {/* Click to view */}
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                          color: "#d32f2f",
                                          fontWeight: "bold",
                                          fontSize: "14px",
                                        }}
                                      >
                                        <span>👉 Nhấp để xem chi tiết</span>
                                        <span style={{ fontSize: "16px" }}>
                                          →
                                        </span>
                                      </div>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                      {/* Other subsections */}
                      {section.subsections &&
                        section.id !== "characteristics" && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "32px",
                            }}
                          >
                            {section.subsections.map((subsection, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: index * 0.1,
                                  duration: 0.6,
                                  ease: [0.25, 0.1, 0.25, 1],
                                }}
                                style={{
                                  background: "rgba(255, 255, 255, 0.95)",
                                  borderRadius: "12px",
                                  overflow: "hidden",
                                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                  backdropFilter: "blur(10px)",
                                  transition: "all 0.3s ease",
                                  border: "1px solid rgba(211, 47, 47, 0.1)",
                                  position: "relative",
                                }}
                              >
                                {/* Accent top bar */}
                                <div
                                  style={{
                                    height: "4px",
                                    background: `linear-gradient(90deg, #d32f2f 0%, #f44336 50%, #e91e63 100%)`,
                                  }}
                                ></div>

                                {/* Subsection Header with Image */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "16px",
                                    padding: "20px",
                                    borderBottom: "1px solid #ddd",
                                    background:
                                      "linear-gradient(135deg, rgba(211, 47, 47, 0.05) 0%, rgba(244, 67, 54, 0.05) 100%)",
                                  }}
                                >
                                  <div style={{ flex: 1 }}>
                                    <h3
                                      style={{
                                        fontSize: "20px",
                                        fontWeight: "600",
                                        color: "#d32f2f",
                                        margin: 0,
                                        textShadow:
                                          "0 1px 3px rgba(211, 47, 47, 0.1)",
                                      }}
                                    >
                                      {subsection.title}
                                    </h3>
                                  </div>
                                  {subsection.image && (
                                    <div
                                      style={{
                                        width: "100px",
                                        height: "60px",
                                        flexShrink: 0,
                                      }}
                                    >
                                      <img
                                        src={subsection.image}
                                        alt={subsection.title}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "cover",
                                          borderRadius: "6px",
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* Subsection Content */}
                                <div
                                  style={{
                                    padding: "20px",
                                    background:
                                      "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(211, 47, 47, 0.01))",
                                  }}
                                >
                                  <div style={{ marginBottom: "16px" }}>
                                    {subsection.content.map(
                                      (item, itemIndex) => (
                                        <div
                                          key={itemIndex}
                                          style={{
                                            marginBottom: "12px",
                                            lineHeight: "1.8",
                                          }}
                                        >
                                          {item.startsWith("-") ? (
                                            <div
                                              style={{
                                                marginLeft: "32px",
                                                color: "#555",
                                                position: "relative",
                                                padding: "8px 12px",
                                                borderLeft: "3px solid #ff6b6b",
                                                backgroundColor:
                                                  "rgba(255, 107, 107, 0.05)",
                                                borderRadius: "4px",
                                              }}
                                            >
                                              <span
                                                style={{
                                                  position: "absolute",
                                                  left: "-16px",
                                                  color: "#d32f2f",
                                                  fontWeight: "bold",
                                                  fontSize: "18px",
                                                }}
                                              >
                                                ▸
                                              </span>
                                              {item.substring(1).trim()}
                                            </div>
                                          ) : (
                                            <div
                                              style={{
                                                color: "#555",
                                                position: "relative",
                                                paddingLeft: "24px",
                                                padding: "8px 12px",
                                                backgroundColor:
                                                  "rgba(211, 47, 47, 0.03)",
                                                borderRadius: "4px",
                                                borderLeft: "2px solid #ffa6a6",
                                              }}
                                            >
                                              {item}
                                            </div>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>

                                  {subsection.cards && (
                                    <div style={{ marginTop: "24px" }}>
                                      <div
                                        style={{
                                          display: "grid",
                                          gridTemplateColumns:
                                            "repeat(auto-fill, minmax(260px, 1fr))",
                                          gap: "20px",
                                        }}
                                      >
                                        {subsection.cards.map((card, idx) => {
                                          const colors = [
                                            {
                                              gradient:
                                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                              accent: "#667eea",
                                            },
                                            {
                                              gradient:
                                                "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                              accent: "#f093fb",
                                            },
                                            {
                                              gradient:
                                                "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                                              accent: "#4facfe",
                                            },
                                            {
                                              gradient:
                                                "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                                              accent: "#43e97b",
                                            },
                                          ];
                                          const color =
                                            colors[idx % colors.length];

                                          return (
                                            <motion.div
                                              key={idx}
                                              initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                                y: 20,
                                              }}
                                              animate={{
                                                opacity: 1,
                                                scale: 1,
                                                y: 0,
                                              }}
                                              transition={{
                                                delay: idx * 0.1,
                                                duration: 0.5,
                                                ease: [0.25, 0.1, 0.25, 1],
                                              }}
                                              whileHover={{
                                                scale: 1.05,
                                                y: -8,
                                                boxShadow: `0 16px 40px rgba(0,0,0,0.2)`,
                                              }}
                                              style={{
                                                backgroundColor: "white",
                                                borderRadius: "12px",
                                                boxShadow:
                                                  "0 4px 12px rgba(0,0,0,0.1)",
                                                overflow: "hidden",
                                                display: "flex",
                                                flexDirection: "column",
                                                cursor: "pointer",
                                                transition:
                                                  "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                                                border:
                                                  "1px solid rgba(0,0,0,0.05)",
                                              }}
                                            >
                                              {/* Image area */}
                                              {card.image && (
                                                <div
                                                  style={{
                                                    height: "180px",
                                                    overflow: "hidden",
                                                    position: "relative",
                                                    backgroundColor: "#f5f5f5",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    padding: "10px",
                                                  }}
                                                >
                                                  <img
                                                    src={card.image}
                                                    alt={card.title}
                                                    style={{
                                                      maxWidth: "100%",
                                                      maxHeight: "100%",
                                                      width: "auto",
                                                      height: "auto",
                                                      objectFit: "contain",
                                                      transition:
                                                        "transform 0.3s ease",
                                                    }}
                                                  />
                                                </div>
                                              )}

                                              {/* Content */}
                                              <div
                                                style={{
                                                  padding: "20px",
                                                  flex: 1,
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <h5
                                                  style={{
                                                    fontSize: "16px",
                                                    fontWeight: "700",
                                                    marginBottom: "12px",
                                                    color: color.accent,
                                                    lineHeight: "1.4",
                                                  }}
                                                >
                                                  {card.title}
                                                </h5>
                                                <p
                                                  style={{
                                                    fontSize: "14px",
                                                    color: "#666",
                                                    lineHeight: "1.6",
                                                    flex: 1,
                                                  }}
                                                >
                                                  {card.content}
                                                </p>
                                              </div>
                                            </motion.div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                  {/* Timeline for section 3.2.2 */}
                                  {subsection.timeline && (
                                    <div
                                      style={{
                                        marginTop: "32px",
                                        paddingTop: "32px",
                                        borderTop: "2px dashed #ddd",
                                      }}
                                    >
                                      <h4
                                        style={{
                                          fontSize: "24px",
                                          fontWeight: "bold",
                                          marginBottom: "32px",
                                          color: "#d32f2f",
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "12px",
                                          textAlign: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <span style={{ fontSize: "28px" }}>
                                          📈
                                        </span>
                                        Phương Hướng Xây Dựng CNXH
                                        <span style={{ fontSize: "28px" }}>
                                          🏛️
                                        </span>
                                      </h4>

                                      <div
                                        style={{
                                          position: "relative",
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "48px",
                                          marginLeft: "32px",
                                          paddingLeft: "32px",
                                        }}
                                      >
                                        {/* Main timeline line */}
                                        <div
                                          style={{
                                            position: "absolute",
                                            left: "16px",
                                            top: "24px",
                                            bottom: "24px",
                                            width: "4px",
                                            background:
                                              "linear-gradient(to bottom, #d32f2f 0%, #f44336 50%, #e91e63 100%)",
                                            borderRadius: "2px",
                                          }}
                                        ></div>

                                        {subsection.timeline.map(
                                          (event, idx) => (
                                            <motion.div
                                              key={idx}
                                              initial={{ opacity: 0, x: -30 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{
                                                delay: idx * 0.3,
                                                duration: 0.6,
                                              }}
                                              style={{
                                                position: "relative",
                                                marginLeft: "24px",
                                              }}
                                            >
                                              {/* Timeline node */}
                                              <div
                                                style={{
                                                  position: "absolute",
                                                  left: "-56px",
                                                  top: "16px",
                                                  width: "32px",
                                                  height: "32px",
                                                  borderRadius: "50%",
                                                  background:
                                                    "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  color: "white",
                                                  fontWeight: "bold",
                                                  fontSize: "14px",
                                                  boxShadow:
                                                    "0 4px 12px rgba(211, 47, 47, 0.4)",
                                                  border: "4px solid white",
                                                  zIndex: 2,
                                                }}
                                              >
                                                {idx + 1}
                                              </div>

                                              {/* Timeline card */}
                                              <motion.div
                                                whileHover={{
                                                  scale: 1.02,
                                                  boxShadow:
                                                    "0 12px 30px rgba(211, 47, 47, 0.2)",
                                                }}
                                                style={{
                                                  background:
                                                    "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(211, 47, 47, 0.02) 100%)",
                                                  borderRadius: "16px",
                                                  padding: "24px",
                                                  boxShadow:
                                                    "0 6px 20px rgba(211, 47, 47, 0.15)",
                                                  border:
                                                    "2px solid rgba(211, 47, 47, 0.1)",
                                                  cursor: "pointer",
                                                  transition: "all 0.3s ease",
                                                  backdropFilter: "blur(10px)",
                                                }}
                                              >
                                                {/* Header */}
                                                <div
                                                  style={{
                                                    marginBottom: "16px",
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      display: "inline-block",
                                                      background:
                                                        "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
                                                      color: "white",
                                                      padding: "6px 12px",
                                                      borderRadius: "20px",
                                                      fontSize: "12px",
                                                      fontWeight: "bold",
                                                      marginBottom: "8px",
                                                    }}
                                                  >
                                                    {event.year}
                                                  </div>
                                                  <h5
                                                    style={{
                                                      fontSize: "20px",
                                                      fontWeight: "bold",
                                                      color: "#d32f2f",
                                                      margin: "8px 0",
                                                      lineHeight: "1.3",
                                                    }}
                                                  >
                                                    {event.title}
                                                  </h5>
                                                  <p
                                                    style={{
                                                      fontSize: "14px",
                                                      color: "#666",
                                                      margin: "0 0 16px 0",
                                                      lineHeight: "1.5",
                                                    }}
                                                  >
                                                    {event.description}
                                                  </p>
                                                </div>

                                                {/* Sub items */}
                                                {event.subItems && (
                                                  <div
                                                    style={{
                                                      display: "grid",
                                                      gridTemplateColumns:
                                                        "repeat(auto-fit, minmax(300px, 1fr))",
                                                      gap: "12px",
                                                      marginTop: "16px",
                                                    }}
                                                  >
                                                    {event.subItems.map(
                                                      (subItem, subIdx) => (
                                                        <motion.div
                                                          key={subIdx}
                                                          initial={{
                                                            opacity: 0,
                                                            y: 10,
                                                          }}
                                                          animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                          }}
                                                          transition={{
                                                            delay:
                                                              idx * 0.3 +
                                                              subIdx * 0.1,
                                                            duration: 0.4,
                                                          }}
                                                          whileHover={{
                                                            scale: 1.02,
                                                          }}
                                                          style={{
                                                            background: "white",
                                                            padding:
                                                              "12px 16px",
                                                            borderRadius: "8px",
                                                            border:
                                                              "1px solid rgba(211, 47, 47, 0.1)",
                                                            boxShadow:
                                                              "0 2px 8px rgba(0,0,0,0.05)",
                                                            transition:
                                                              "all 0.2s ease",
                                                            position:
                                                              "relative",
                                                            paddingLeft: "32px",
                                                          }}
                                                        >
                                                          <span
                                                            style={{
                                                              position:
                                                                "absolute",
                                                              left: "12px",
                                                              top: "14px",
                                                              width: "6px",
                                                              height: "6px",
                                                              backgroundColor:
                                                                "#d32f2f",
                                                              borderRadius:
                                                                "50%",
                                                            }}
                                                          ></span>
                                                          <span
                                                            style={{
                                                              fontSize: "13px",
                                                              color: "#555",
                                                              lineHeight: "1.4",
                                                            }}
                                                          >
                                                            {subItem}
                                                          </span>
                                                        </motion.div>
                                                      )
                                                    )}
                                                  </div>
                                                )}
                                              </motion.div>
                                            </motion.div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}

        {/* Phần Ý Nghĩa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: "60px", marginBottom: "60px" }}
        >
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "40px",
              color: "#d32f2f",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Ý Nghĩa Của Chủ Nghĩa Xã Hội
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "24px",
              marginBottom: "40px",
              marginLeft: "40px",
              marginRight: "40px",
            }}
          >
            {[
              {
                title: "Công Bằng Xã Hội",
                description:
                  "Xóa bỏ chế độ khai thác, tạo xã hội bình đẳng nơi mọi người có quyền như nhau",
                color: "#d32f2f",
              },
              {
                title: "Phát Triển Kinh Tế",
                description:
                  "Phát triển các lực lượng sản xuất, tăng năng suất lao động để nâng cao đời sống nhân dân",
                color: "#f44336",
              },
              {
                title: "Tự Do Con Người",
                description:
                  "Giải phóng con người khỏi áp lực của chế độ tư bản, cho phép phát triển toàn diện",
                color: "#c62828",
              },
              {
                title: "Hòa Bình Thế Giới",
                description:
                  "Xây dựng thế giới không có chiến tranh, khai thác, góp phần bảo vệ hòa bình toàn cầu",
                color: "#e53935",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                }}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderLeft: `5px solid ${item.color}`,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                    color: item.color,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#666",
                    lineHeight: "1.6",
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quiz Section */}
        <QuizSection />

        {/* Phần Thành Viên */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "60px" }}
        >
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "40px",
              color: "#d32f2f",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Thành Viên Dự Án
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 20px",
            }}
          >
            {[
              { name: "Hà Duy Tùng", mssv: "SE173573" },
              { name: "Bùi Đức Triệu", mssv: "SE170197" },
              { name: "Nguyễn Hữu Quốc Hưng", mssv: "SE172905" },
              { name: "Lý Hoàng Khang", mssv: "SE172528" },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 32px rgba(211, 47, 47, 0.2)",
                }}
                style={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "12px",
                  padding: "24px",
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderTop: "4px solid #d32f2f",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "#d32f2f",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    color: "white",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {member.name.charAt(0)}
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    color: "#333",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#d32f2f",
                    fontWeight: "600",
                  }}
                >
                  {member.mssv}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Phần Công Cụ Phụ Lục */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "60px" }}
        >
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "40px",
              color: "#d32f2f",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Công Cụ Phụ Lục
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "24px",
              marginBottom: "40px",
              marginLeft: "40px",
              marginRight: "40px",
            }}
          >
            {[
              {
                title: "ChatGPT",
                description:
                  "Tóm tắt ý chính từ giáo trình để chuẩn bị nội dung thuyết trình",
                icon: "🤖",
                color: "#4CAF50",
              },
              {
                title: "Padlet",
                description:
                  "Nơi chia sẻ ý tưởng, dành giải công việc, trao đổi với nhau",
                icon: "🔗",
                color: "#FF1493",
              },
              {
                title: "ClaudeAI",
                description: "Fix bug, logic code",
                icon: "🤖",
                color: "#9C27B0",
              },
              {
                title: "Gemini",
                description:
                  "Tóm tắt ý chính từ giáo trình để chuẩn bị câu hỏi",
                icon: "✨",
                color: "#4CAF50",
              },
            ].map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                  y: -5,
                }}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderTop: `5px solid ${tool.color}`,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    marginBottom: "12px",
                  }}
                >
                  {tool.icon}
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    color: tool.color,
                  }}
                >
                  {tool.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.6",
                  }}
                >
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Subsection Detail Modal */}
      <AnimatePresence>
        {selectedSubsection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.8)",
              padding: "20px",
            }}
            onClick={closeSubsectionModal}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                maxWidth: "95vw",
                width: "100%",
                maxHeight: "90vh",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                style={{
                  padding: "28px 32px",
                  borderBottom: "1px solid #eee",
                  background:
                    "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
                  color: "white",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {(() => {
                      const section = sections.find(
                        (s) => s.id === selectedSubsection.sectionId
                      );
                      return section?.subsections?.[
                        selectedSubsection.subsectionIndex
                      ]?.title;
                    })()}
                  </h3>
                  <button
                    onClick={closeSubsectionModal}
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      border: "none",
                      color: "white",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.3)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.2)")
                    }
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div
                style={{
                  padding: "32px",
                  maxHeight: "calc(90vh - 120px)",
                  overflow: "auto",
                }}
              >
                {(() => {
                  const section = sections.find(
                    (s) => s.id === selectedSubsection.sectionId
                  );
                  const subsection =
                    section?.subsections?.[selectedSubsection.subsectionIndex];

                  if (!subsection) return null;

                  return (
                    <div>
                      {/* Content */}
                      {subsection.content && subsection.content.length > 0 && (
                        <div style={{ marginBottom: "32px" }}>
                          <h4
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              color: "#d32f2f",
                              marginBottom: "20px",
                            }}
                          >
                            📋 Nội dung chính
                          </h4>
                          {subsection.content.map((item, idx) => (
                            <div
                              key={idx}
                              style={{
                                marginBottom: "16px",
                                padding: "16px",
                                backgroundColor: "#f8f9fa",
                                borderRadius: "10px",
                                borderLeft: "4px solid #d32f2f",
                                fontSize: "15px",
                                lineHeight: "1.6",
                              }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Cards */}
                      {subsection.cards && subsection.cards.length > 0 && (
                        <div>
                          <h4
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                              color: "#d32f2f",
                              marginBottom: "20px",
                            }}
                          >
                            🎯 Chi tiết các đặc trưng
                          </h4>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit, minmax(350px, 1fr))",
                              gap: "20px",
                            }}
                          >
                            {subsection.cards.map((card, idx) => {
                              const colors = [
                                "#667eea",
                                "#f093fb",
                                "#4facfe",
                                "#43e97b",
                                "#fa709a",
                                "#a8edea",
                                "#12100e",
                                "#fcb69f",
                              ];
                              const color = colors[idx % colors.length];

                              return (
                                <div
                                  key={idx}
                                  style={{
                                    backgroundColor: "white",
                                    border: `2px solid ${color}`,
                                    borderRadius: "12px",
                                    padding: "20px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    transition: "all 0.3s ease",
                                  }}
                                >
                                  {card.image && (
                                    <div
                                      style={{
                                        width: "100%",
                                        height: "200px",
                                        marginBottom: "16px",
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        backgroundColor: "#f5f5f5",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <img
                                        src={card.image}
                                        alt={card.title}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                  )}
                                  <h5
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                      color: color,
                                      marginBottom: "12px",
                                    }}
                                  >
                                    {card.title}
                                  </h5>
                                  <p
                                    style={{
                                      fontSize: "14px",
                                      color: "#666",
                                      lineHeight: "1.5",
                                      margin: 0,
                                    }}
                                  >
                                    {card.content}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Timeline */}
                      {subsection.timeline &&
                        subsection.timeline.length > 0 && (
                          <div style={{ marginTop: "32px" }}>
                            <h4
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                marginBottom: "32px",
                                color: "#d32f2f",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                textAlign: "center",
                                justifyContent: "center",
                              }}
                            >
                              <span style={{ fontSize: "28px" }}>📈</span>
                              Phương Hướng Xây Dựng CNXH
                              <span style={{ fontSize: "28px" }}>🏛️</span>
                            </h4>

                            <div
                              style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                gap: "48px",
                                marginLeft: "32px",
                                paddingLeft: "32px",
                              }}
                            >
                              {/* Main timeline line */}
                              <div
                                style={{
                                  position: "absolute",
                                  left: "16px",
                                  top: "24px",
                                  bottom: "24px",
                                  width: "4px",
                                  background:
                                    "linear-gradient(to bottom, #d32f2f 0%, #f44336 50%, #e91e63 100%)",
                                  borderRadius: "2px",
                                }}
                              ></div>

                              {subsection.timeline.map((event, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: 0.2 + idx * 0.3,
                                    duration: 0.6,
                                  }}
                                  style={{
                                    position: "relative",
                                    marginLeft: "24px",
                                  }}
                                >
                                  {/* Timeline node */}
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: "-56px",
                                      top: "16px",
                                      width: "32px",
                                      height: "32px",
                                      borderRadius: "50%",
                                      background:
                                        "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "white",
                                      fontWeight: "bold",
                                      fontSize: "14px",
                                      boxShadow:
                                        "0 4px 12px rgba(211, 47, 47, 0.4)",
                                      border: "4px solid white",
                                      zIndex: 2,
                                    }}
                                  >
                                    {idx + 1}
                                  </div>

                                  {/* Timeline card */}
                                  <motion.div
                                    whileHover={{
                                      scale: 1.02,
                                      boxShadow:
                                        "0 12px 30px rgba(211, 47, 47, 0.2)",
                                    }}
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(211, 47, 47, 0.02) 100%)",
                                      borderRadius: "16px",
                                      padding: "24px",
                                      boxShadow:
                                        "0 6px 20px rgba(211, 47, 47, 0.15)",
                                      border:
                                        "2px solid rgba(211, 47, 47, 0.1)",
                                      cursor: "pointer",
                                      transition: "all 0.3s ease",
                                      backdropFilter: "blur(10px)",
                                    }}
                                  >
                                    {/* Header */}
                                    <div style={{ marginBottom: "16px" }}>
                                      <div
                                        style={{
                                          display: "inline-block",
                                          background:
                                            "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
                                          color: "white",
                                          padding: "6px 12px",
                                          borderRadius: "20px",
                                          fontSize: "12px",
                                          fontWeight: "bold",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        {event.year}
                                      </div>
                                      <h5
                                        style={{
                                          fontSize: "20px",
                                          fontWeight: "bold",
                                          color: "#d32f2f",
                                          margin: "8px 0",
                                          lineHeight: "1.3",
                                        }}
                                      >
                                        {event.title}
                                      </h5>
                                      <p
                                        style={{
                                          fontSize: "14px",
                                          color: "#666",
                                          margin: "0 0 16px 0",
                                          lineHeight: "1.5",
                                        }}
                                      >
                                        {event.description}
                                      </p>
                                    </div>

                                    {/* Sub items */}
                                    {event.subItems && (
                                      <div
                                        style={{
                                          display: "grid",
                                          gridTemplateColumns:
                                            "repeat(auto-fit, minmax(300px, 1fr))",
                                          gap: "12px",
                                          marginTop: "16px",
                                        }}
                                      >
                                        {event.subItems.map(
                                          (subItem, subIdx) => (
                                            <motion.div
                                              key={subIdx}
                                              initial={{ opacity: 0, y: 10 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{
                                                delay:
                                                  0.4 +
                                                  idx * 0.3 +
                                                  subIdx * 0.1,
                                                duration: 0.4,
                                              }}
                                              whileHover={{ scale: 1.02 }}
                                              style={{
                                                background: "white",
                                                padding: "12px 16px",
                                                borderRadius: "8px",
                                                border:
                                                  "1px solid rgba(211, 47, 47, 0.1)",
                                                boxShadow:
                                                  "0 2px 8px rgba(0,0,0,0.05)",
                                                transition: "all 0.2s ease",
                                                position: "relative",
                                                paddingLeft: "32px",
                                              }}
                                            >
                                              <span
                                                style={{
                                                  position: "absolute",
                                                  left: "12px",
                                                  top: "14px",
                                                  width: "6px",
                                                  height: "6px",
                                                  backgroundColor: "#d32f2f",
                                                  borderRadius: "50%",
                                                }}
                                              ></span>
                                              <span
                                                style={{
                                                  fontSize: "13px",
                                                  color: "#555",
                                                  lineHeight: "1.4",
                                                }}
                                              >
                                                {subItem}
                                              </span>
                                            </motion.div>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </motion.div>
                                </motion.div>
                              ))}
                            </div>

                            {/* 12 Nhiệm vụ Cơ bản Đại hội XII */}
                            <div
                              style={{
                                marginTop: "48px",
                                width: "100%",
                                overflowX: "auto",
                              }}
                            >
                              <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                style={{
                                  background:
                                    "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
                                  color: "white",
                                  padding: "24px 32px",
                                  borderRadius: "16px",
                                  textAlign: "center",
                                  marginBottom: "32px",
                                  boxShadow:
                                    "0 8px 24px rgba(211, 47, 47, 0.3)",
                                }}
                              >
                                <h4
                                  style={{
                                    margin: 0,
                                    fontSize: "28px",
                                    fontWeight: "bold",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "12px",
                                  }}
                                >
                                  <span style={{ fontSize: "32px" }}>🏛️</span>
                                  12 Nhiệm vụ Cơ bản (Đại hội XII)
                                  <span style={{ fontSize: "32px" }}>🎯</span>
                                </h4>
                                <p
                                  style={{
                                    margin: "12px 0 0 0",
                                    fontSize: "16px",
                                    opacity: 0.9,
                                    fontStyle: "italic",
                                  }}
                                >
                                  Đảng ta yêu cầu không được phiến diện, cực
                                  đoan, duy ý chí trong giải quyết các mối quan
                                  hệ này
                                </p>
                              </motion.div>

                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "nowrap",
                                  gap: "12px",
                                  width: "100%",
                                  minWidth: "1000px",
                                  overflowX: "auto",
                                }}
                              >
                                {/* Cột 1: Nhiệm vụ 1-3 */}
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 1, duration: 0.6 }}
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(139, 195, 74, 0.05) 100%)",
                                    borderRadius: "12px",
                                    padding: "20px",
                                    border: "2px solid rgba(76, 175, 80, 0.2)",
                                    height: "fit-content",
                                  }}
                                >
                                  <h5
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                      color: "#4caf50",
                                      marginBottom: "16px",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                    }}
                                  >
                                    💰 Nhiệm vụ 1-3
                                  </h5>

                                  {[
                                    {
                                      num: 1,
                                      title:
                                        "Phát triển kinh tế nhanh, bền vững",
                                      desc: "Giữ vững ổn định vĩ mô, đổi mới mô hình tăng trưởng, cơ cấu lại nền kinh tế. Đẩy mạnh CNH-HĐH.",
                                    },
                                    {
                                      num: 2,
                                      title: "Hoàn thiện thể chế kinh tế",
                                      desc: "Tiếp tục phát triển kinh tế thị trường định hướng xã hội chủ nghĩa; nâng cao hiệu lực, hiệu quả trong quản lý.",
                                    },
                                    {
                                      num: 3,
                                      title: "Phát triển nguồn nhân lực",
                                      desc: "Đổi mới căn bản, toàn diện giáo dục, đào tạo và đẩy mạnh ứng dụng khoa học công nghệ.",
                                    },
                                  ].map((item, idx) => (
                                    <div
                                      key={idx}
                                      style={{
                                        marginBottom: idx < 2 ? "16px" : 0,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            background: "#4caf50",
                                            color: "white",
                                            padding: "4px 8px",
                                            borderRadius: "12px",
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {item.num}
                                        </div>
                                        <strong
                                          style={{
                                            fontSize: "14px",
                                            color: "#4caf50",
                                          }}
                                        >
                                          {item.title}:
                                        </strong>
                                      </div>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          color: "#555",
                                          lineHeight: "1.6",
                                          margin: 0,
                                          paddingLeft: "32px",
                                        }}
                                      >
                                        {item.desc}
                                      </p>
                                    </div>
                                  ))}
                                </motion.div>

                                {/* Cột 2: Nhiệm vụ 4-6 */}
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 1.1, duration: 0.6 }}
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(103, 58, 183, 0.05) 100%)",
                                    borderRadius: "12px",
                                    padding: "20px",
                                    border: "2px solid rgba(33, 150, 243, 0.2)",
                                    height: "fit-content",
                                  }}
                                >
                                  <h5
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                      color: "#2196f3",
                                      marginBottom: "16px",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                    }}
                                  >
                                    🎭 Nhiệm vụ 4-6
                                  </h5>

                                  {[
                                    {
                                      num: 4,
                                      title: "Xây dựng văn hóa",
                                      desc: "Phát triển nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc, con người Việt Nam phát triển toàn diện.",
                                    },
                                    {
                                      num: 5,
                                      title: "Quản lý xã hội và an sinh",
                                      desc: "Đảm bảo an sinh xã hội, nâng cao phúc lợi xã hội; thực hiện tốt chính sách với người có công.",
                                    },
                                    {
                                      num: 6,
                                      title: "Môi trường và khí hậu",
                                      desc: "Khai thác, sử dụng hiệu quả tài nguyên thiên nhiên; bảo vệ môi trường; ứng phó với biến đổi khí hậu.",
                                    },
                                  ].map((item, idx) => (
                                    <div
                                      key={idx}
                                      style={{
                                        marginBottom: idx < 2 ? "16px" : 0,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            background: "#2196f3",
                                            color: "white",
                                            padding: "4px 8px",
                                            borderRadius: "12px",
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {item.num}
                                        </div>
                                        <strong
                                          style={{
                                            fontSize: "14px",
                                            color: "#2196f3",
                                          }}
                                        >
                                          {item.title}:
                                        </strong>
                                      </div>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          color: "#555",
                                          lineHeight: "1.6",
                                          margin: 0,
                                          paddingLeft: "32px",
                                        }}
                                      >
                                        {item.desc}
                                      </p>
                                    </div>
                                  ))}
                                </motion.div>

                                {/* Cột 3: Nhiệm vụ 7-9 */}
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 1.2, duration: 0.6 }}
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%)",
                                    borderRadius: "12px",
                                    padding: "20px",
                                    border: "2px solid rgba(255, 152, 0, 0.2)",
                                    height: "fit-content",
                                  }}
                                >
                                  <h5
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                      color: "#ff9800",
                                      marginBottom: "16px",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                    }}
                                  >
                                    🛡️ Nhiệm vụ 7-9
                                  </h5>

                                  {[
                                    {
                                      num: 7,
                                      title: "Bảo vệ Tổ quốc",
                                      desc: "Kiên quyết đấu tranh bảo vệ vững chắc độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ của Tổ quốc.",
                                    },
                                    {
                                      num: 8,
                                      title: "Đường lối đối ngoại",
                                      desc: "Độc lập, tự chủ, đa phương hóa, đa dạng hóa, chủ động và tích cực hội nhập quốc tế.",
                                    },
                                    {
                                      num: 9,
                                      title: "Phát huy dân chủ",
                                      desc: "Hoàn thiện dân chủ xã hội chủ nghĩa và quyền làm chủ của nhân dân; củng cố đại đoàn kết dân tộc.",
                                    },
                                  ].map((item, idx) => (
                                    <div
                                      key={idx}
                                      style={{
                                        marginBottom: idx < 2 ? "16px" : 0,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            background: "#ff9800",
                                            color: "white",
                                            padding: "4px 8px",
                                            borderRadius: "12px",
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {item.num}
                                        </div>
                                        <strong
                                          style={{
                                            fontSize: "14px",
                                            color: "#ff9800",
                                          }}
                                        >
                                          {item.title}:
                                        </strong>
                                      </div>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          color: "#555",
                                          lineHeight: "1.6",
                                          margin: 0,
                                          paddingLeft: "32px",
                                        }}
                                      >
                                        {item.desc}
                                      </p>
                                    </div>
                                  ))}
                                </motion.div>

                                {/* Cột 4: Nhiệm vụ 10-12 */}
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 1.3, duration: 0.6 }}
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(233, 30, 99, 0.05) 100%)",
                                    borderRadius: "12px",
                                    padding: "20px",
                                    border: "2px solid rgba(156, 39, 176, 0.2)",
                                    height: "fit-content",
                                  }}
                                >
                                  <h5
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                      color: "#9c27b0",
                                      marginBottom: "16px",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                    }}
                                  >
                                    ⚖️ Nhiệm vụ 10-12
                                  </h5>

                                  {[
                                    {
                                      num: 10,
                                      title: "Nhà nước pháp quyền",
                                      desc: "Hoàn thiện Nhà nước pháp quyền xã hội chủ nghĩa, xây dựng bộ máy nhà nước tinh gọn, trong sạch, vững mạnh.",
                                    },
                                    {
                                      num: 11,
                                      title: "Xây dựng Đảng",
                                      desc: "Xây dựng Đảng trong sạch, vững mạnh, nâng cao năng lực lãnh đạo, tăng cường bản chất giai cấp công nhân.",
                                    },
                                    {
                                      num: 12,
                                      title: "Xử lý các quan hệ lớn",
                                      desc: "Quán triệt xử lý tốt 9 mối quan hệ lớn trong quá trình xây dựng chủ nghĩa xã hội.",
                                    },
                                  ].map((item, idx) => (
                                    <div
                                      key={idx}
                                      style={{
                                        marginBottom: idx < 2 ? "16px" : 0,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            background: "#9c27b0",
                                            color: "white",
                                            padding: "4px 8px",
                                            borderRadius: "12px",
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {item.num}
                                        </div>
                                        <strong
                                          style={{
                                            fontSize: "14px",
                                            color: "#9c27b0",
                                          }}
                                        >
                                          {item.title}:
                                        </strong>
                                      </div>
                                      <p
                                        style={{
                                          fontSize: "13px",
                                          color: "#555",
                                          lineHeight: "1.6",
                                          margin: 0,
                                          paddingLeft: "32px",
                                        }}
                                      >
                                        {item.desc}
                                      </p>
                                    </div>
                                  ))}
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentSection;
