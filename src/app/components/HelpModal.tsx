import React from 'react';
import { X, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export function HelpModal({ isOpen, onClose, title, description }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-950 rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 font-semibold">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span>{title}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-6">
          <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {description}
          </div>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
