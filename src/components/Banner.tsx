import { motion } from 'framer-motion';

interface BannerProps {
  onPlayMusic?: () => void;
  isPlaying?: boolean;
}

const Banner = ({ onPlayMusic, isPlaying = false }: BannerProps = {}) => {
  const bannerStyle = {
    position: 'relative' as const,
    height: '600px',
    backgroundImage: 'url("/images/banner.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    scrollMarginTop: '64px',
  };

  const overlayStyle = {
    position: 'absolute' as const,
    inset: 0,
    background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))',
  };

  const contentStyle = {
    position: 'absolute' as const,
    textAlign: 'center' as const,
    zIndex: 10,
    width: '90%',
    maxWidth: '1200px',
  };

  const titleStyle = {
    fontSize: '64px',
    fontWeight: 'bold',
    marginBottom: '24px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    fontFamily: '"Roboto Condensed", sans-serif',
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
  };

  const buttonStyle = {
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    padding: '12px 28px',
    fontSize: '18px',
    borderRadius: '30px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  // Tách text thành từng chữ để animate riêng
  const titleText = 'CHỦ NGHĨA XÃ HỘI VÀ THỜI KỲ QUÁ ĐỘ LÊN CHỦ NGHĨA XÃ HỘI';
  const words = titleText.split(' ');

  // Framer motion container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      id="banner"
      style={bannerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div style={overlayStyle}></div>
      
      <div style={contentStyle}>
        <motion.div
          style={titleStyle}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              variants={itemVariants}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.button
          style={buttonStyle}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            delay: 1,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlayMusic}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f44336';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#d32f2f';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {isPlaying ? '⏸️ Tạm dừng nhạc' : '🎵 Bật nhạc nền'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Banner;