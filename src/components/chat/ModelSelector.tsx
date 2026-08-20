import React, { useState } from 'react';
import { cn } from '../../utils/helpers';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import type { Model } from '../../types';
import { mockModels } from '../../data/mockData';
import { ChevronDown, Zap, Brain, Code, Palette, Sparkles, Lock, Check } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel?: string;
  onSelectModel: (modelId: string) => void;
  userPlan?: 'free' | 'premium1' | 'premium2';
  onUpgradeClick?: () => void;
}

const modelIcons: Record<string, React.ReactNode> = {
  'horizon-auto': <Sparkles className="w-4 h-4" />,
  'gemini': <Zap className="w-4 h-4" />,
  'gpt': <Brain className="w-4 h-4" />,
  'nemotron': <Zap className="w-4 h-4" />,
  'advanced': <Brain className="w-4 h-4" />,
  'coding': <Code className="w-4 h-4" />,
  'creative': <Palette className="w-4 h-4" />,
  'ultra': <Sparkles className="w-4 h-4" />,
  'multi': <Brain className="w-4 h-4" />,
  'deep': <Brain className="w-4 h-4" />,
};

function getModelIcon(model: Model) {
  const key = Object.keys(modelIcons).find(k => model.id.includes(k) || model.name.toLowerCase().includes(k));
  return key ? modelIcons[key] : <Brain className="w-4 h-4" />;
}

export function ModelSelector({
  selectedModel = 'horizon-auto',
  onSelectModel,
  userPlan = 'free',
  onUpgradeClick,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedModelData = mockModels.find(m => m.id === selectedModel);

  const canAccessModel = (model: Model) => {
    if (userPlan === 'premium2') return true;
    if (userPlan === 'premium1') return model.tier !== 'premium2';
    return model.tier === 'free';
  };

  const groupedModels = {
    free: mockModels.filter(m => m.tier === 'free'),
    premium1: mockModels.filter(m => m.tier === 'premium1'),
    premium2: mockModels.filter(m => m.tier === 'premium2'),
  };

  return (
    <>
      {/* Selector Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-tertiary border border-border-default hover:border-border-light transition-colors"
      >
        <span className="text-indigo-400">
          {getModelIcon(selectedModelData || mockModels[0])}
        </span>
        <span className="font-medium text-slate-200 text-sm">
          {selectedModelData?.name || 'Horizon Auto'}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>

      {/* Model Selection Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Select AI Model"
        size="lg"
      >
        <div className="space-y-6">
          {/* Horizon Auto Highlight */}
          <div
            onClick={() => {
              onSelectModel('horizon-auto');
              setIsOpen(false);
            }}
            className={cn(
              'p-4 rounded-xl border-2 cursor-pointer transition-all',
              selectedModel === 'horizon-auto'
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-border-default hover:border-border-light bg-bg-tertiary'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-100">Horizon Auto</h3>
                    <Badge variant="info" size="sm">Recommended</Badge>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    Automatically selects the best AI for your task
                  </p>
                </div>
              </div>
              {selectedModel === 'horizon-auto' && (
                <Check className="w-5 h-5 text-indigo-400" />
              )}
            </div>
            
            {/* How it works */}
            <div className="mt-4 pt-4 border-t border-border-default">
              <p className="text-xs text-slate-500 mb-2">How Horizon Auto works:</p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center">1</span>
                  You send a prompt
                </span>
                <span className="text-slate-600">→</span>
                <span className="flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center">2</span>
                  Horizon analyzes task
                </span>
                <span className="text-slate-600">→</span>
                <span className="flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center">3</span>
                  Best AI selected
                </span>
                <span className="text-slate-600">→</span>
                <span className="flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center">4</span>
                  Response returned
                </span>
              </div>
            </div>
          </div>

          {/* Free Models */}
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-3">Free Models</h4>
            <div className="space-y-2">
              {groupedModels.free
                .filter(m => m.id !== 'horizon-auto')
                .map((model) => (
                  <ModelOption
                    key={model.id}
                    model={model}
                    isSelected={selectedModel === model.id}
                    canAccess={true}
                    onSelect={() => {
                      onSelectModel(model.id);
                      setIsOpen(false);
                    }}
                  />
              ))}
            </div>
          </div>

          {/* Premium 1 Models */}
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-3">Premium Models</h4>
            <div className="space-y-2">
              {groupedModels.premium1.map((model) => (
                <ModelOption
                  key={model.id}
                  model={model}
                  isSelected={selectedModel === model.id}
                  canAccess={canAccessModel(model)}
                  onSelect={() => {
                    if (canAccessModel(model)) {
                      onSelectModel(model.id);
                      setIsOpen(false);
                    } else {
                      onUpgradeClick?.();
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Premium 2 Models */}
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-3">Ultra Models</h4>
            <div className="space-y-2">
              {groupedModels.premium2.map((model) => (
                <ModelOption
                  key={model.id}
                  model={model}
                  isSelected={selectedModel === model.id}
                  canAccess={canAccessModel(model)}
                  onSelect={() => {
                    if (canAccessModel(model)) {
                      onSelectModel(model.id);
                      setIsOpen(false);
                    } else {
                      onUpgradeClick?.();
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

interface ModelOptionProps {
  model: Model;
  isSelected: boolean;
  canAccess: boolean;
  onSelect: () => void;
}

function ModelOption({ model, isSelected, canAccess, onSelect }: ModelOptionProps) {
  return (
    <button
      onClick={onSelect}
      disabled={!canAccess}
      className={cn(
        'w-full p-3 rounded-lg border transition-all text-left',
        canAccess
          ? isSelected
            ? 'border-indigo-500 bg-indigo-500/10'
            : 'border-border-default hover:border-border-light bg-bg-tertiary hover:bg-bg-surface'
          : 'border-border-default opacity-50 cursor-not-allowed bg-bg-tertiary'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-2 rounded-lg',
            model.tier === 'premium2' ? 'bg-pink-500/20 text-pink-400' :
            model.tier === 'premium1' ? 'bg-purple-500/20 text-purple-400' :
            'bg-slate-700 text-slate-400'
          )}>
            {getModelIcon(model)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-200">{model.name}</span>
              {model.tier !== 'free' && (
                <Badge
                  variant={model.tier === 'premium2' ? 'premium2' : 'premium1'}
                  size="sm"
                >
                  {model.tier === 'premium2' ? 'Ultra' : 'Premium'}
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{model.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!canAccess && <Lock className="w-4 h-4 text-slate-500" />}
          {isSelected && <Check className="w-5 h-5 text-indigo-400" />}
        </div>
      </div>
    </button>
  );
}
