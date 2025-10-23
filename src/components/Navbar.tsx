import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const navStyle = {
    background: '#d32f2f',
    color: 'white',
    padding: '0 16px',
    position: 'sticky' as const,
    top: 0,
    zIndex: 40,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'color 0.2s',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'color 0.2s',
    paddingBottom: '8px',
    borderBottom: '2px solid transparent',
  };

  const menuButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '8px',
    display: 'none',
    fontSize: '24px',
  };

  const mobileMenuStyle = {
    display: isOpen ? 'block' : 'none',
    paddingTop: '16px',
    paddingBottom: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  };

  const mobileLinkStyle = {
    display: 'block',
    padding: '8px 16px',
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '16px',
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link 
          to="/" 
          style={logoStyle as any}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
        >
       
        </Link>

        <div style={{ ...navLinksStyle, '@media (max-width: 768px)': { display: 'none' } } as any}>
          <div 
            onClick={() => scrollToSection('banner')}
            style={{
              ...linkStyle,
              borderBottomColor: activeSection === 'banner' ? '#f5f5f5' : 'transparent',
            } as any}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              if (activeSection !== 'banner') {
                e.currentTarget.style.borderBottomColor = 'transparent';
              }
            }}
          >
            Trang Chủ
          </div>
          <div 
            onClick={() => scrollToSection('transition-socialism')}
            style={{
              ...linkStyle,
              borderBottomColor: activeSection === 'transition-socialism' ? '#f5f5f5' : 'transparent',
            } as any}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              if (activeSection !== 'transition-socialism') {
                e.currentTarget.style.borderBottomColor = 'transparent';
              }
            }}
          >
            Quá độ CNXH
          </div>
          <div 
            onClick={() => scrollToSection('characteristics')}
            style={{
              ...linkStyle,
              borderBottomColor: activeSection === 'characteristics' ? '#f5f5f5' : 'transparent',
            } as any}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              if (activeSection !== 'characteristics') {
                e.currentTarget.style.borderBottomColor = 'transparent';
              }
            }}
          >
            Đặc trưng CNXH
          </div>
          <a 
            href="https://dangcongsan.vn" 
            target="_blank" 
            rel="noopener noreferrer"
            style={linkStyle as any}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottomColor = 'transparent';
            }}
          >
            Tài liệu
          </a>
        </div>

        <button
          style={{ ...menuButtonStyle, display: window.innerWidth <= 768 ? 'block' : 'none' } as any}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={mobileMenuStyle}
        >
          <div
            style={mobileLinkStyle as any}
            onClick={() => {
              scrollToSection('banner');
              setIsOpen(false);
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Trang Chủ
          </div>
          <div
            style={mobileLinkStyle as any}
            onClick={() => {
              scrollToSection('transition-socialism');
              setIsOpen(false);
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Quá độ CNXH
          </div>
          <div
            style={mobileLinkStyle as any}
            onClick={() => {
              scrollToSection('characteristics');
              setIsOpen(false);
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Đặc trưng CNXH
          </div>
          <a 
            href="https://dangcongsan.vn" 
            target="_blank" 
            rel="noopener noreferrer"
            style={mobileLinkStyle as any}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Tài liệu
          </a>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;