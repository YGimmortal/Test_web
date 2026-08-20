import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/helpers';
import { Button } from '../ui/Button';
import { Paperclip, Send, Mic, X } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  onStop?: () => void;
  isGenerating?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  isLoading = false,
  onStop,
  isGenerating = false,
  placeholder = 'Ask HorizonAI anything...',
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled && !isLoading) {
      onSend(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const hasValue = value.trim().length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className={cn(
          'relative flex items-end gap-2 p-2 rounded-2xl border transition-all duration-200',
          'bg-bg-card border-border-default',
          isFocused && 'border-indigo-500/50 shadow-lg shadow-indigo-500/10',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {/* Attachment Button */}
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors flex-shrink-0"
          disabled={disabled}
          aria-label="Attach file"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          rows={1}
          className={cn(
            'flex-1 bg-transparent border-0 outline-none resize-none',
            'text-slate-100 placeholder-slate-500',
            'py-2.5 px-2',
            'max-h-[200px]',
            'disabled:cursor-not-allowed'
          )}
          style={{ minHeight: '44px' }}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Voice Button (placeholder) */}
          {!isGenerating && (
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              disabled={disabled}
              aria-label="Voice input"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}

          {/* Send/Stop Button */}
          {isGenerating ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onStop}
              className="h-10 px-4 border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <X className="w-4 h-4 mr-1" />
              Stop
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!hasValue || disabled || isLoading}
              className="h-10 px-4"
            >
              <Send className="w-4 h-4 mr-1" />
              Send
            </Button>
          )}
        </div>
      </form>

      {/* Disclaimer */}
      <p className="text-xs text-slate-500 text-center mt-3">
        HorizonAI can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}
