import { useState } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';
import roseArchImage from '@/assets/gallery/rose-arch-maternity.webp';

interface VideoPlayerProps {
  videoId: string;
  soundText?: string;
  watchText?: string;
}

export function VideoPlayer({ 
  videoId, 
  soundText = "🔊 CLICK TO ENABLE SOUND 🔊",
  watchText = "Watch the Magic"
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleEnableSound = () => {
    setIsMuted(false);
  };

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.3)] border-2 border-gold/40">
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-amber-500/20 pointer-events-none z-10 rounded-2xl" />
      
      {!isPlaying ? (
        /* Overlay state - before playing */
        <div className="relative w-full h-full">
          {/* Background image */}
          <img 
            src={roseArchImage} 
            alt="Preview" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
          
          {/* Play button */}
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 group"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gold/90 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_40px_rgba(212,175,55,0.5)]">
              <Play className="h-12 w-12 md:h-16 md:w-16 text-charcoal ml-2" fill="currentColor" />
            </div>
            <span className="text-white text-xl md:text-2xl font-semibold tracking-wide">
              {watchText}
            </span>
            <span className="text-white/60 text-sm mt-2">
              Click to play
            </span>
          </button>
        </div>
      ) : (
        /* Video playing state */
        <div className="relative w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Sound enable overlay - only show when muted */}
          {isMuted && (
            <button
              onClick={handleEnableSound}
              className="absolute inset-0 flex items-center justify-center z-20 bg-black/30 backdrop-blur-[2px] transition-all duration-300 hover:bg-black/40"
            >
              <div className="flex flex-col items-center gap-4">
                {/* Pulsing sound button */}
                <div className="relative">
                  {/* Pulse rings */}
                  <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 bg-gold/30 rounded-full animate-ping" />
                  <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 bg-gold/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  
                  {/* Main button */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gold to-amber-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-110 transition-transform">
                    <VolumeX className="h-8 w-8 md:h-10 md:w-10 text-charcoal" />
                  </div>
                </div>
                
                {/* Text banner */}
                <div className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-gold to-amber-500 rounded-full shadow-lg animate-pulse">
                  <span className="text-charcoal font-bold text-sm md:text-lg tracking-wide flex items-center gap-2">
                    <Volume2 className="h-5 w-5" />
                    {soundText}
                    <Volume2 className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </button>
          )}
          
          {/* Sound indicator when unmuted */}
          {!isMuted && (
            <div className="absolute bottom-4 right-4 z-20 px-4 py-2 bg-green-500/90 rounded-full flex items-center gap-2 animate-fade-in">
              <Volume2 className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">Sound ON</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
