import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import ContentSection from './components/ContentSection';
import AudioPlayer from './components/AudioPlayer';
import ChatBox from './components/ChatBox';
import { motion } from 'framer-motion';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [bannerToggleFunction, setBannerToggleFunction] = useState<(() => void) | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Auto play music khi trang load - add user interaction listener
  useEffect(() => {
    const handleUserInteraction = () => {
      console.log("User interacted, attempting autoplay");
      if (!initialized) {
        setInitialized(true);
        const randomIndex = Math.floor(Math.random() * 4);
        console.log("Starting auto-play with random song:", randomIndex);
        setCurrentSongIndex(randomIndex);
        setIsPlaying(true);
      }
      // Remove listener sau khi trigger
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    // Add listener để trigger autoplay sau user interaction
    if (!initialized) {
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);

      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      };
    }
  }, [initialized]);

  const handlePlayMusicFromBanner = () => {
    console.log("🎵 Banner button clicked!");
    if (bannerToggleFunction) {
      bannerToggleFunction();
    }
  };

  const setBannerControl = (toggleFunc: () => void) => {
    setBannerToggleFunction(() => toggleFunc);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Banner onPlayMusic={handlePlayMusicFromBanner} isPlaying={isPlaying} />
          <main className="container mx-auto px-4 py-8">
            <ContentSection />
          </main>
        </motion.div>
        <AudioPlayer 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          onBannerControl={setBannerControl}
          isChatOpen={isChatOpen}
        />
        <ChatBox onChatToggle={setIsChatOpen} />
      </div>
    </Router>
  );
}

export default App;