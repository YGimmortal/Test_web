import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { mockModels } from '../data/mockData';
import { Search, Zap, Brain, Code, Palette, Sparkles, Lock, Check } from 'lucide-react';

interface ModelsPageProps {
  onNavigate: (path: string) => void;
}

export function ModelsPage({ onNavigate }: ModelsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<'all' | 'free' | 'premium1' | 'premium2'>('all');
  const [userPlan] = useState<'free' | 'premium1' | 'premium2'>('free');

  const filteredModels = mockModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === 'all' || model.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const getModelIcon = (model: typeof mockModels[0]) => {
    if (model.id.includes('auto')) return <Sparkles className="w-5 h-5" />;
    if (model.id.includes('gemini') || model.id.includes('flash')) return <Zap className="w-5 h-5" />;
    if (model.id.includes('gpt') || model.id.includes('reasoning')) return <Brain className="w-5 h-5" />;
    if (model.id.includes('coding')) return <Code className="w-5 h-5" />;
    if (model.id.includes('creative')) return <Palette className="w-5 h-5" />;
    return <Brain className="w-5 h-5" />;
  };

  const canAccessModel = (model: typeof mockModels[0]) => {
    if (userPlan === 'premium2') return true;
    if (userPlan === 'premium1') return model.tier !== 'premium2';
    return model.tier === 'free';
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar isLoggedIn={true} onNavigate={onNavigate} />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-100 mb-4">
              AI Models
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Choose from our collection of powerful AI models, each optimized for different tasks.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'free', 'premium1', 'premium2'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTier === tier
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tier === 'all' ? 'All Models' : tier === 'free' ? 'Free' : tier === 'premium1' ? 'Premium' : 'Ultra'}
                </button>
              ))}
            </div>
          </div>

          {/* Models Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => {
              const hasAccess = canAccessModel(model);
              
              return (
                <Card key={model.id} hover className="bg-bg-card relative overflow-hidden">
                  {!hasAccess && (
                    <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm z-10 flex items-center justify-center">
                      <div className="text-center p-6">
                        <Lock className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                        <p className="font-medium text-slate-300 mb-2">
                          {model.tier === 'premium2' ? 'Ultra Plan' : 'Premium Plan'} Required
                        </p>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onNavigate('/pricing')}
                        >
                          Upgrade
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${
                          model.tier === 'premium2' ? 'bg-pink-500/20 text-pink-400' :
                          model.tier === 'premium1' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-slate-700 text-slate-400'
                        }`}>
                          {getModelIcon(model)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-100">{model.name}</h3>
                          <p className="text-sm text-slate-500">{model.provider}</p>
                        </div>
                      </div>
                      <Badge
                        variant={model.tier === 'premium2' ? 'premium2' : model.tier === 'premium1' ? 'premium1' : 'default'}
                        size="sm"
                      >
                        {model.tier === 'premium2' ? 'Ultra' : model.tier === 'premium1' ? 'Premium' : 'Free'}
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-400 mb-4">{model.description}</p>

                    {/* Capabilities */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-2">Capabilities</p>
                      <div className="flex flex-wrap gap-1.5">
                        {model.capabilities.slice(0, 3).map((cap) => (
                          <span
                            key={cap}
                            className="px-2 py-1 text-xs bg-slate-800 text-slate-400 rounded"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border-default">
                      <div>
                        <p className="text-xs text-slate-500">Speed</p>
                        <div className="flex items-center gap-1">
                          <Zap className={`w-3.5 h-3.5 ${
                            model.speed === 'fast' ? 'text-green-400' :
                            model.speed === 'medium' ? 'text-yellow-400' : 'text-red-400'
                          }`} />
                          <span className="text-sm text-slate-300 capitalize">{model.speed}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Quality</p>
                        <div className="flex items-center gap-1">
                          <Brain className={`w-3.5 h-3.5 ${
                            model.quality === 'premium' ? 'text-pink-400' :
                            model.quality === 'excellent' ? 'text-purple-400' :
                            model.quality === 'good' ? 'text-blue-400' : 'text-slate-400'
                          }`} />
                          <span className="text-sm text-slate-300 capitalize">{model.quality}</span>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <p className="text-xs text-slate-500">Context</p>
                        <span className="text-sm text-slate-300">
                          {(model.contextWindow / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>

                    {hasAccess && (
                      <Button
                        variant="outline"
                        fullWidth
                        className="mt-4"
                        onClick={() => onNavigate('/chat')}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Use this model
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredModels.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No models found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
