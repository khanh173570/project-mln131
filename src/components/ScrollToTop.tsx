import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            position: 'fixed',
            bottom: '180px', // Tăng lên để tránh chồng với chat và music button
            right: '16px',   // Căn chỉnh với các nút khác
            zIndex: 50,
            padding: '0', // Loại bỏ padding để có kích thước chính xác
            backgroundColor: '#d32f2f',
            color: 'white',
            borderRadius: '50%',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            width: '64px',  // Đồng nhất với các nút khác
            height: '64px', // Đồng nhất với các nút khác
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f44336';
            e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.15)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#d32f2f';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label="Scroll to top"
        >
          <FaArrowUp style={{ width: '24px', height: '24px' }} />
        </motion.button>
      )}
    </>
  );
};

export default ScrollToTop;