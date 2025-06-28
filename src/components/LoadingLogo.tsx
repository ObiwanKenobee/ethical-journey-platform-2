
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Globe, Network } from 'lucide-react';

const LoadingLogo: React.FC = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 50);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <Globe 
            className="h-16 w-16 text-primary animate-pulse" 
            strokeWidth={1.5} 
          />
          <Network 
            className={cn(
              "absolute h-12 w-12 text-primary/90 transition-opacity duration-700",
              progress === 100 ? "opacity-100" : "opacity-0"
            )} 
          />
        </div>
        
        <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-lg font-medium">
          <span className="text-gradient">Atlas</span>
          <span className="text-xs ml-1 text-muted-foreground">Building Tomorrow</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingLogo;
