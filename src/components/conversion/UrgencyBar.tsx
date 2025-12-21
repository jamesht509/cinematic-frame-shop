import { useState, useEffect } from 'react';
import { Clock, Users, TrendingUp } from 'lucide-react';

export function UrgencyBar() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [buyerCount, setBuyerCount] = useState(127);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Random buyer increment
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setBuyerCount(prev => prev + 1);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-red-900/90 via-red-800/90 to-red-900/90 text-white">
      <div className="container-wide py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm">
          {/* Countdown */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-400 animate-pulse" />
            <span className="text-white/80">Flash Sale Ends:</span>
            <span className="font-mono font-bold text-yellow-400">
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </span>
          </div>

          <span className="hidden sm:block text-white/30">|</span>

          {/* Buyers today */}
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <span className="text-white/80">
              <span className="font-bold text-green-400">{buyerCount}</span> photographers bought today
            </span>
          </div>

          <span className="hidden md:block text-white/30">|</span>

          {/* Live viewers */}
          <div className="hidden md:flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-white/80">
              <span className="font-bold text-blue-400">{Math.floor(Math.random() * 20) + 35}</span> viewing now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
