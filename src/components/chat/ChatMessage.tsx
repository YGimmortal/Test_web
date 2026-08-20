import { useState } from 'react';
import { cn, copyToClipboard, formatRelativeTime } from '../../utils/helpers';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { Message } from '../../types';
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, MoreHorizontal, Check, Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onRegenerate?: () => void;
  onFeedback?: (feedback: 'up' | 'down') => void;
}

export function ChatMessage({ message, onRegenerate, onFeedback }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
    onFeedback?.(type);
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold text-slate-100 mt-6 mb-3">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-semibold text-slate-100 mt-4 mb-2">{line.slice(4)}</h3>;
      }
      // Code blocks
      if (line.startsWith('```')) {
        return null; // Handled separately
      }
      // Bold
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Inline code
      line = line.replace(/`([^`]+)`/g, '<code class="bg-bg-tertiary px-1.5 py-0.5 rounded text-indigo-400">$1</code>');
      
      return (
        <p
          key={index}
          className="mb-2 text-slate-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: line || '<br />' }}
        />
      );
    });
  };

  // Extract code blocks
  const extractCodeBlocks = (content: string) => {
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
    const parts: { type: 'text' | 'code'; content: string; language?: string }[] = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
      }
      parts.push({ type: 'code', content: match[2], language: match[1] || 'text' });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({ type: 'text', content: content.slice(lastIndex) });
    }

    return parts;
  };

  const contentParts = extractCodeBlocks(message.content);

  return (
    <div
      className={cn(
        'group flex gap-4 py-4',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
            <User className="w-5 h-5 text-slate-400" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className={cn('flex-1 max-w-3xl', isUser ? 'text-right' : 'text-left')}>
        {/* Header */}
        <div className={cn('flex items-center gap-2 mb-2', isUser ? 'justify-end' : 'justify-start')}>
          <span className="font-medium text-slate-200">
            {isUser ? 'You' : message.model || 'HorizonAI'}
          </span>
          {isAssistant && message.model && (
            <Badge variant="default" size="sm">
              {message.model.replace(/-/g, ' ')}
            </Badge>
          )}
          <span className="text-xs text-slate-500">
            {formatRelativeTime(message.timestamp)}
          </span>
        </div>

        {/* Message Bubble */}
        <div
          className={cn(
            'inline-block rounded-2xl px-4 py-3',
            isUser
              ? 'bg-indigo-600 text-white'
              : 'bg-bg-card border border-border-default'
          )}
        >
          {message.isStreaming ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          ) : (
            <div className="text-left">
              {contentParts.map((part, index) => {
                if (part.type === 'code') {
                  return (
                    <div key={index} className="my-3">
                      <CodeBlock code={part.content} language={part.language || 'text'} />
                    </div>
                  );
                }
                return <div key={index}>{renderContent(part.content)}</div>;
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        {isAssistant && !message.isStreaming && (
          <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              title="Copy message"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleFeedback('up')}
              className={cn(
                'p-1.5 rounded-lg hover:bg-slate-800 transition-colors',
                feedback === 'up' ? 'text-green-400' : 'text-slate-400 hover:text-slate-200'
              )}
              title="Helpful"
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleFeedback('down')}
              className={cn(
                'p-1.5 rounded-lg hover:bg-slate-800 transition-colors',
                feedback === 'down' ? 'text-red-400' : 'text-slate-400 hover:text-slate-200'
              )}
              title="Not helpful"
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                title="Regenerate response"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              title="More options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface CodeBlockProps {
  code: string;
  language: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between px-4 py-2 bg-bg-tertiary border-b border-border-default rounded-t-lg">
        <span className="text-xs text-slate-400 font-mono">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="bg-bg-primary p-4 rounded-b-lg overflow-x-auto">
        <code className="text-sm text-slate-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}
