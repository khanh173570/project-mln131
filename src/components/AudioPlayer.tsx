import { useState, useEffect, useRef } from 'react';
import { IoMdMusicalNote, IoMdMusicalNotes, IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';

interface Song {
  title: string;
  artist: string;
  url: string;
}

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentSongIndex: number;
  setCurrentSongIndex: (index: number) => void;
  onBannerControl?: (toggleFunction: () => void) => void;
}

const songs: Song[] = [
  {
    title: "Giao Hưởng",
    artist: "Nhạc nền",
    url: "/audio/audio1.mp3" 
  },
  {
    title: "Giao Hưởng 2",
    artist: "Nhạc nền",
    url: "/audio/audio2.mp3"
  },
  {
    title: "Tiến quân ca",
    artist: "Nhạc Cách Mạng",
    url: "/audio/audio3.mp3"
  },
  {
    title: "Tiến Bước Dưới Quân Kì",
    artist: "Nhạc Cách Mạng",
    url: "/audio/audio4.mp3"
  }
];

const AudioPlayer = ({ isPlaying, setIsPlaying, currentSongIndex, setCurrentSongIndex, onBannerControl }: AudioPlayerProps) => {
  const [expanded, setExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Function definitions
  const getRandomSong = () => {
    if (songs.length > 0) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      return randomIndex;
    }
    return 0;
  };

  const nextSong = () => {
    if (songs.length > 0) {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(nextIndex);
    }
  };

  const prevSong = () => {
    if (songs.length > 0) {
      const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      setCurrentSongIndex(prevIndex);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const newProgress = (clickPosition / progressBar.offsetWidth) * 100;
    const newTime = (newProgress / 100) * audioRef.current.duration;
    
    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
  };

  useEffect(() => {
    // Truyền function điều khiển lên App.tsx
    if (onBannerControl) {
      onBannerControl(handleBannerToggle);
    }
  }, [onBannerControl]);

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio(songs[currentSongIndex].url);
      
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          console.log("Metadata loaded - Duration:", audioRef.current.duration);
          setDuration(audioRef.current.duration);
        }
      };
      

      const handleTimeUpdate = () => {
        if (audioRef.current && audioRef.current.duration > 0) {
          console.log("Time update - Current time:", audioRef.current.currentTime, "Paused:", audioRef.current.paused);
          setCurrentTime(audioRef.current.currentTime);
          const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(isNaN(newProgress) ? 0 : newProgress);
        }
      };
      
      const handleEnded = () => {
        console.log("Audio ended naturally");
        setIsPlaying(false);
        nextSong();
      };
      
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleEnded);
      
      // Debug pause/play events
      audioRef.current.addEventListener('pause', () => {
        console.log("PAUSE EVENT triggered!");
        console.trace("Pause called from:");
      });
      
      audioRef.current.addEventListener('play', () => {
        console.log("PLAY EVENT triggered!");
      });
      
      // Force load metadata
      audioRef.current.load();
    }
    
    return () => {
      // Không pause audio trong cleanup để tránh interrupt
      console.log("useEffect cleanup called");
    };
  }, [nextSong]);

  useEffect(() => {
    if (audioRef.current && songs[currentSongIndex]) {
      console.log("Loading song:", songs[currentSongIndex].title);
      
      audioRef.current.pause();
      audioRef.current.src = songs[currentSongIndex].url;
      audioRef.current.load();
      
      // Reset progress
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      
      // Nếu isPlaying = true, tự động phát
      if (isPlaying) {
        console.log("Auto-playing song:", songs[currentSongIndex].title);
        setTimeout(() => {
          if (audioRef.current && isPlaying) {
            audioRef.current.play().catch(error => {
              console.error("Error auto-playing:", error);
            });
          }
        }, 50);
      }
    }
  }, [currentSongIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      // Đảm bảo volume được set
      audioRef.current.volume = 1.0;
      audioRef.current.muted = false;
      
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        console.log("Audio paused manually");
      } else {
        // Debug thông tin hiện tại
        console.log("Debug - currentTime:", audioRef.current.currentTime);
        console.log("Debug - currentSongIndex:", currentSongIndex);
        console.log("Debug - isPlaying:", isPlaying);
        
        // Nếu chưa từng phát nhạc (currentTime = 0), chọn bài ngẫu nhiên
        if (audioRef.current.currentTime === 0) {
          const randomIndex = getRandomSong();
          console.log("First time playing - selecting random song:", songs[randomIndex].title);
          setCurrentSongIndex(randomIndex);
          return; // useEffect sẽ handle việc phát nhạc
        }
        console.log("Audio src:", audioRef.current.src);
        console.log("Audio volume:", audioRef.current.volume);
        console.log("Audio muted:", audioRef.current.muted);
        console.log("Audio readyState:", audioRef.current.readyState);
        console.log("Audio paused before play:", audioRef.current.paused);
        
        // Thêm temporary listeners để debug
        const tempPauseListener = () => {
          console.log("🚫 PAUSE EVENT - Audio was paused!");
          console.trace("Pause trace:");
        };
        
        const tempPlayListener = () => {
          console.log("▶️ PLAY EVENT - Audio started playing!");
        };
        
        audioRef.current.addEventListener('pause', tempPauseListener);
        audioRef.current.addEventListener('play', tempPlayListener);
        
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          console.log("Play started successfully");
          
          // Kiểm tra liên tục xem audio có bị pause không
          const checkInterval = setInterval(() => {
            if (audioRef.current) {
              if (audioRef.current.paused && isPlaying) {
                console.log("❌ Audio unexpectedly paused! Attempting to resume...");
                audioRef.current.play().catch(err => console.error("Resume failed:", err));
              }
            } else {
              clearInterval(checkInterval);
            }
          }, 200);
          
          // Clear interval sau 5 giây
          setTimeout(() => clearInterval(checkInterval), 5000);
          
        }).catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      }
    }
  };

  const handleMainButtonClick = () => {
    // Chỉ mở/đóng player, không điều khiển nhạc
    console.log("🎵 Main button clicked - toggling player");
    setExpanded(!expanded);
  };

  const handleBannerToggle = () => {
    console.log("🎵 Banner toggle called, current isPlaying:", isPlaying);
    
    if (isPlaying) {
      // Đang phát -> Dừng
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        console.log("Audio paused from banner");
      }
    } else {
      // Không phát -> Bắt đầu phát
      if (audioRef.current) {
        // Nếu chưa có bài nào, chọn ngẫu nhiên
        if (currentSongIndex === 0) {
          const randomIndex = getRandomSong();
          console.log("Banner - selecting random song:", songs[randomIndex].title);
          setCurrentSongIndex(randomIndex);
          return; // useEffect sẽ tự động phát
        }
        
        // Phát bài hiện tại
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          console.log("Audio resumed from banner");
        }).catch(error => {
          console.error("Error resuming audio:", error);
        });
      }
    }
  };

  return (
    <>
      <motion.button
        onClick={handleMainButtonClick}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          zIndex: 50,
          padding: '12px',
          backgroundColor: '#d32f2f',
          color: 'white',
          borderRadius: '50%',
          border: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f44336';
          e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#d32f2f';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }}
        aria-label="Toggle music player"
      >
        {isPlaying ? (
          <IoMdMusicalNotes style={{ width: '24px', height: '24px' }} />
        ) : (
          <IoMdMusicalNote style={{ width: '24px', height: '24px' }} />
        )}
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: '96px',
              right: '84px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              width: '300px',
              zIndex: 40,
              overflow: 'hidden',
            }}
          >
            <div style={{ 
              padding: '16px', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #eee',
            }}>
              <h3 style={{ margin: 0, color: '#333' }}>Nhạc nền</h3>
              <button 
                onClick={() => setExpanded(false)} 
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  borderRadius: '50%',
                }}
                aria-label="Close player"
              >
                <IoMdClose style={{ color: '#666' }} />
              </button>
            </div>

            <div style={{ padding: '16px' }}>
              <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#d32f2f' }}>
                  {songs[currentSongIndex]?.title || 'Unknown Title'}
                </h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                  {songs[currentSongIndex]?.artist || 'Unknown Artist'}
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div 
                  style={{ 
                    height: '4px', 
                    backgroundColor: '#eee',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onClick={handleProgressClick}
                >
                  <div style={{ 
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: '#d32f2f',
                    borderRadius: '2px',
                  }} />
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '4px',
                }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px',
              }}>
                <button 
                  onClick={prevSong} 
                  style={{
                    background: '#f5f5f5',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  aria-label="Previous song"
                >
                  <IoIosArrowBack style={{ color: '#666' }} />
                </button>
                <button 
                  onClick={togglePlay} 
                  style={{
                    backgroundColor: '#d32f2f',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <IoMdMusicalNotes style={{ width: '24px', height: '24px' }} />
                  ) : (
                    <IoMdMusicalNote style={{ width: '24px', height: '24px' }} />
                  )}
                </button>
                <button 
                  onClick={nextSong} 
                  style={{
                    background: '#f5f5f5',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  aria-label="Next song"
                >
                  <IoIosArrowForward style={{ color: '#666' }} />
                </button>
              </div>
            </div>

            <div style={{ 
              maxHeight: '200px', 
              overflowY: 'auto',
              borderTop: '1px solid #eee',
              padding: '8px 0'
            }}>
              {songs.map((song, index) => (
                <div 
                  key={index} 
                  onClick={() => setCurrentSongIndex(index)} 
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    backgroundColor: currentSongIndex === index ? '#f5f5f5' : 'transparent',
                    borderLeft: currentSongIndex === index ? '3px solid #d32f2f' : '3px solid transparent',
                  }}
                >
                  <p style={{ 
                    margin: '0 0 2px 0',
                    fontWeight: currentSongIndex === index ? 'bold' : 'normal',
                    color: currentSongIndex === index ? '#d32f2f' : '#333',
                  }}>
                    {song.title}
                  </p>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '12px', 
                    color: '#666' 
                  }}>
                    {song.artist}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AudioPlayer;