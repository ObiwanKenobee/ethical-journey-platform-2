
import React from 'react';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { cn } from '@/lib/utils';
import { WifiOff } from 'lucide-react';

export default function OfflineIndicator() {
  const isOffline = useOfflineStatus();

  if (!isOffline) return null;

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg py-2 px-3",
      "bg-background/90 backdrop-blur-sm border border-border shadow-lg"
    )}>
      <WifiOff className="h-4 w-4 text-destructive" />
      <span className="text-sm font-medium">You're offline</span>
    </div>
  );
}
