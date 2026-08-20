import React, { useState } from 'react';
import { cn, truncateText } from '../../utils/helpers';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Avatar } from '../ui/Avatar';
import type { Conversation } from '../../types';
import {
  Plus,
  MessageSquare,
  Search,
  Star,
  Trash2,
  MoreHorizontal,
  Settings,
  LogOut,
  Home,
  Grid3X3,
  CreditCard,
  X,
} from 'lucide-react';

interface SidebarProps {
  conversations: Conversation[];
  activeConversation?: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  userPlan?: 'free' | 'premium1' | 'premium2';
  onNavigate: (path: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  conversations,
  activeConversation,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onToggleFavorite,
  userPlan = 'free',
  onNavigate,
  isOpen = true,
  onClose,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState<string | null>(null);

  const filteredConversations = conversations.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteConversations = filteredConversations.filter(c => c.isFavorite);
  const otherConversations = filteredConversations.filter(c => !c.isFavorite);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50',
          'flex flex-col bg-bg-secondary border-r border-border-default',
          'transition-all duration-300',
          isOpen ? 'w-72' : 'w-0 lg:w-0 overflow-hidden',
          'lg:translate-x-0',
          !isOpen && 'lg:hidden'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border-default">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-semibold text-slate-100 group-hover:text-white transition-colors">
                HorizonAI
              </span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <Button
            onClick={onNewChat}
            variant="primary"
            fullWidth
            leftIcon={<Plus className="w-4 h-4" />}
          >
            New Chat
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 pb-2">
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="h-9"
          />
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {/* Favorites */}
          {favoriteConversations.length > 0 && (
            <div>
              <h3 className="px-2 mb-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Favorites
              </h3>
              <div className="space-y-1">
                {favoriteConversations.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isActive={activeConversation === conv.id}
                    onSelect={() => onSelectConversation(conv.id)}
                    onDelete={() => onDeleteConversation(conv.id)}
                    onToggleFavorite={() => onToggleFavorite(conv.id)}
                    showMenu={showMenu === conv.id}
                    onShowMenu={() => setShowMenu(showMenu === conv.id ? null : conv.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recent */}
          <div>
            <h3 className="px-2 mb-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
              Recent
            </h3>
            <div className="space-y-1">
              {otherConversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isActive={activeConversation === conv.id}
                  onSelect={() => onSelectConversation(conv.id)}
                  onDelete={() => onDeleteConversation(conv.id)}
                  onToggleFavorite={() => onToggleFavorite(conv.id)}
                  showMenu={showMenu === conv.id}
                  onShowMenu={() => setShowMenu(showMenu === conv.id ? null : conv.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-border-default">
          <div className="flex items-center gap-3 mb-3">
            <Avatar name="Demo User" size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">Demo User</p>
              <p className="text-xs text-slate-500 capitalize">{userPlan} plan</p>
            </div>
            <button
              onClick={() => setShowMenu(showMenu === 'user' ? null : 'user')}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* User Menu */}
          {showMenu === 'user' && (
            <div className="absolute bottom-20 left-4 right-4 bg-bg-card border border-border-default rounded-lg shadow-xl py-1">
              <button
                onClick={() => { onNavigate('/settings'); setShowMenu(null); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-1">
            <NavItem
              icon={<Home className="w-4 h-4" />}
              label="Home"
              onClick={() => onNavigate('/')}
            />
            <NavItem
              icon={<MessageSquare className="w-4 h-4" />}
              label="Chat"
              onClick={() => onNavigate('/chat')}
              active
            />
            <NavItem
              icon={<Grid3X3 className="w-4 h-4" />}
              label="Models"
              onClick={() => onNavigate('/models')}
            />
            <NavItem
              icon={<CreditCard className="w-4 h-4" />}
              label="Pricing"
              onClick={() => onNavigate('/pricing')}
              badge={userPlan === 'free' ? 'Upgrade' : undefined}
            />
          </nav>
        </div>
      </aside>
    </>
  );
}

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
  showMenu: boolean;
  onShowMenu: () => void;
}

function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
  onToggleFavorite,
  showMenu,
  onShowMenu,
}: ConversationItemProps) {
  return (
    <div className="group relative">
      <button
        onClick={onSelect}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors',
          isActive
            ? 'bg-indigo-500/20 text-indigo-300'
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        )}
      >
        <MessageSquare className="w-4 h-4 flex-shrink-0" />
        <span className="flex-1 min-w-0 truncate text-sm">
          {truncateText(conversation.title, 25)}
        </span>
        {conversation.isFavorite && (
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
        )}
      </button>

      {/* Hover Actions */}
      <div className={cn(
        'absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1',
        'opacity-0 group-hover:opacity-100 transition-opacity',
        showMenu && 'opacity-100'
      )}>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className={cn(
            'p-1 rounded hover:bg-slate-700',
            conversation.isFavorite ? 'text-yellow-500' : 'text-slate-400'
          )}
        >
          <Star className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onShowMenu(); }}
          className="p-1 rounded hover:bg-slate-700 text-slate-400"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Context Menu */}
      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={onShowMenu} />
          <div className="absolute right-12 top-0 bg-bg-card border border-border-default rounded-lg shadow-xl py-1 z-50 min-w-[150px]">
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(); onShowMenu(); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              <Star className="w-3.5 h-3.5" />
              {conversation.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); onShowMenu(); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-slate-800"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete conversation
            </button>
          </div>
        </>
      )}
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  badge?: string;
}

function NavItem({ icon, label, onClick, active, badge }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
        active
          ? 'bg-indigo-500/20 text-indigo-300'
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      {badge && (
        <span className="px-1.5 py-0.5 text-xs bg-indigo-500/20 text-indigo-400 rounded">
          {badge}
        </span>
      )}
    </button>
  );
}
