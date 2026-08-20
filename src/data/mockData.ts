import { Model, Plan, Conversation, UsageStats } from '../types';

// Mock Models Data
export const mockModels: Model[] = [
  // Free Tier Models
  {
    id: 'horizon-auto',
    name: 'Horizon Auto',
    provider: 'HorizonAI',
    description: 'Intelligent model selection. Horizon analyzes your task and automatically chooses the best AI for the job.',
    capabilities: ['Smart Routing', 'Task Analysis', 'Auto-Selection'],
    speed: 'fast',
    quality: 'good',
    tier: 'free',
    contextWindow: 128000,
    isAvailable: true,
    tags: ['Recommended', 'Auto', 'Versatile'],
  },
  {
    id: 'gemini-3.6-flash',
    name: 'Gemini 3.6 Flash',
    provider: 'Google',
    description: 'Fast and efficient model for quick responses and everyday tasks.',
    capabilities: ['Fast Response', 'General Knowledge', 'Text Generation'],
    speed: 'fast',
    quality: 'good',
    tier: 'free',
    contextWindow: 128000,
    isAvailable: true,
    tags: ['Fast', 'Efficient'],
  },
  {
    id: 'gpt-oss-20b',
    name: 'GPT-OSS 20B',
    provider: 'Open Source',
    description: 'Open-source model with strong reasoning capabilities for general tasks.',
    capabilities: ['Reasoning', 'Code Generation', 'Analysis'],
    speed: 'medium',
    quality: 'good',
    tier: 'free',
    contextWindow: 32000,
    isAvailable: true,
    tags: ['Open Source', 'Balanced'],
  },
  {
    id: 'nemotron-lightning',
    name: 'Nemotron Lightning',
    provider: 'NVIDIA',
    description: 'Optimized for speed while maintaining quality for quick iterations.',
    capabilities: ['Fast Response', 'Code Review', 'Documentation'],
    speed: 'fast',
    quality: 'basic',
    tier: 'free',
    contextWindow: 64000,
    isAvailable: true,
    tags: ['Fast', 'NVIDIA'],
  },
  
  // Premium 1 Tier Models
  {
    id: 'advanced-reasoning',
    name: 'Advanced Reasoning',
    provider: 'HorizonAI',
    description: 'Enhanced reasoning capabilities for complex problem-solving and analysis.',
    capabilities: ['Deep Reasoning', 'Complex Analysis', 'Math', 'Logic'],
    speed: 'medium',
    quality: 'excellent',
    tier: 'premium1',
    contextWindow: 128000,
    isAvailable: true,
    tags: ['Premium', 'Reasoning'],
  },
  {
    id: 'coding-expert',
    name: 'Coding Expert',
    provider: 'HorizonAI',
    description: 'Specialized model for software development, debugging, and code review.',
    capabilities: ['Code Generation', 'Debugging', 'Refactoring', 'Multiple Languages'],
    speed: 'medium',
    quality: 'excellent',
    tier: 'premium1',
    contextWindow: 200000,
    isAvailable: true,
    tags: ['Premium', 'Coding'],
  },
  {
    id: 'creative-expert',
    name: 'Creative Expert',
    provider: 'HorizonAI',
    description: 'Optimized for creative writing, content creation, and brainstorming.',
    capabilities: ['Creative Writing', 'Content Creation', 'Brainstorming', 'Editing'],
    speed: 'medium',
    quality: 'excellent',
    tier: 'premium1',
    contextWindow: 128000,
    isAvailable: true,
    tags: ['Premium', 'Creative'],
  },
  
  // Premium 2 Tier Models
  {
    id: 'horizon-ultra',
    name: 'Horizon Ultra',
    provider: 'HorizonAI',
    description: 'Our most powerful model with state-of-the-art capabilities across all domains.',
    capabilities: ['Expert Level', 'Multi-Domain', 'Advanced Reasoning', 'Creative'],
    speed: 'slow',
    quality: 'premium',
    tier: 'premium2',
    contextWindow: 256000,
    isAvailable: true,
    tags: ['Ultra', 'Most Capable'],
  },
  {
    id: 'multi-ai',
    name: 'Multi-AI',
    provider: 'HorizonAI',
    description: 'Orchestrates multiple AI models simultaneously for comprehensive responses.',
    capabilities: ['Multi-Model', 'Ensemble', 'Cross-Verification', 'Comprehensive'],
    speed: 'slow',
    quality: 'premium',
    tier: 'premium2',
    contextWindow: 512000,
    isAvailable: true,
    tags: ['Ultra', 'Multi-Model'],
  },
  {
    id: 'deep-reasoning',
    name: 'Deep Reasoning Pro',
    provider: 'HorizonAI',
    description: 'Advanced chain-of-thought reasoning for the most complex problems.',
    capabilities: ['Deep Analysis', 'Chain of Thought', 'Research', 'Scientific'],
    speed: 'slow',
    quality: 'premium',
    tier: 'premium2',
    contextWindow: 256000,
    isAvailable: true,
    tags: ['Ultra', 'Research'],
  },
];

// Mock Plans Data
export const mockPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with HorizonAI and explore the basics.',
    features: [
      'Access to free models',
      'Horizon Auto smart routing',
      'Basic conversation history',
      'Standard response speed',
      'Community support',
    ],
    limitations: [
      'Limited daily requests',
      'Standard context window',
      'No premium models',
    ],
    color: '#6366f1',
  },
  {
    id: 'premium1',
    name: 'Premium',
    price: '$19',
    period: 'per month',
    description: 'Unlock advanced AI capabilities for power users.',
    features: [
      'All free features',
      'Access to Premium 1 models',
      '5x higher usage limits',
      'Advanced reasoning models',
      'Coding expert model',
      'Creative expert model',
      'Priority support',
      'Faster response times',
    ],
    limitations: [
      'No access to Ultra models',
    ],
    isPopular: true,
    color: '#8b5cf6',
  },
  {
    id: 'premium2',
    name: 'Ultra',
    price: '$49',
    period: 'per month',
    description: 'Maximum power for professionals and teams.',
    features: [
      'All Premium features',
      'Access to Horizon Ultra',
      'Multi-AI orchestration',
      'Deep Reasoning Pro',
      'Maximum usage limits',
      'Largest context windows',
      'Priority processing',
      'Dedicated support',
      'API access',
      'Team collaboration',
    ],
    limitations: [],
    color: '#ec4899',
  },
];

// Mock Conversations Data
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Create Minecraft plugin',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Help me create a Minecraft plugin that adds custom items',
        timestamp: new Date('2024-01-15T10:30:00'),
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: "I'll help you create a Minecraft plugin with custom items. Let me break this down into steps...\n\n## Step 1: Project Setup\n\nFirst, you'll need to set up your plugin structure:\n\n```java\n// Main plugin class\npublic class CustomItemsPlugin extends JavaPlugin {\n    @Override\n    public void onEnable() {\n        getLogger().info(\"Custom Items Plugin enabled!\");\n        registerCustomItems();\n    }\n}\n```\n\n## Step 2: Custom Item Registration\n\nWould you like me to continue with the item registration code?",
        timestamp: new Date('2024-01-15T10:30:15'),
        model: 'coding-expert',
      },
    ],
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:15'),
    isFavorite: true,
  },
  {
    id: 'conv-2',
    title: 'Build Python calculator',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Create a Python calculator with GUI',
        timestamp: new Date('2024-01-14T14:20:00'),
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: "Here's a complete Python calculator with a tkinter GUI:\n\n```python\nimport tkinter as tk\nfrom tkinter import messagebox\n\nclass Calculator:\n    def __init__(self, root):\n        self.root = root\n        self.root.title(\"Calculator\")\n        self.expression = \"\"\n        \n    def press(self, num):\n        self.expression = self.expression + str(num)\n        equation.set(self.expression)\n```\n\nThis creates a functional calculator with all basic operations.",
        timestamp: new Date('2024-01-14T14:20:30'),
        model: 'gpt-oss-20b',
      },
    ],
    createdAt: new Date('2024-01-14T14:20:00'),
    updatedAt: new Date('2024-01-14T14:20:30'),
  },
  {
    id: 'conv-3',
    title: 'Explain quantum physics',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Explain quantum entanglement in simple terms',
        timestamp: new Date('2024-01-13T09:15:00'),
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: "# Quantum Entanglement Explained Simply\n\nImagine you have two magic coins that are **entangled**:\n\n1. **Connected Mystery**: No matter how far apart these coins are—even on opposite sides of the universe—they remain connected in a mysterious way.\n\n2. **Instant Correlation**: When you flip one coin and it lands on heads, the other coin will *instantly* land on tails (or heads, depending on how they're entangled).\n\n3. **No Hidden Plan**: Before you look at them, neither coin has a definite state. They exist in a **superposition** of both heads and tails simultaneously.\n\n## The Mind-Blowing Part\n\nEinstein called this \"spooky action at a distance\" because the correlation happens faster than light could travel between them. But here's the catch: **you can't use this to send information faster than light**.\n\n## Real-World Applications\n\n- **Quantum Computing**: Entangled qubits process information in parallel\n- **Quantum Cryptography**: Ultra-secure communication\n- **Quantum Teleportation**: Transferring quantum states\n\nWould you like me to dive deeper into any aspect?",
        timestamp: new Date('2024-01-13T09:16:00'),
        model: 'advanced-reasoning',
      },
    ],
    createdAt: new Date('2024-01-13T09:15:00'),
    updatedAt: new Date('2024-01-13T09:16:00'),
    isFavorite: true,
  },
  {
    id: 'conv-4',
    title: 'Website design ideas',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Give me ideas for a modern portfolio website',
        timestamp: new Date('2024-01-12T16:45:00'),
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: "# Modern Portfolio Website Ideas\n\n## Design Concepts\n\n### 1. **Minimalist Dark Mode**\n- Deep charcoal background (#1a1a2e)\n- Neon accent colors (purple, cyan)\n- Large typography for impact\n- Smooth scroll animations\n\n### 2. **Glassmorphism Style**\n- Frosted glass cards\n- Gradient backgrounds\n- Floating elements\n- Subtle shadows and blur effects\n\n### 3. **Interactive 3D**\n- Three.js hero section\n- Mouse-following effects\n- Particle animations\n- WebGL experiences\n\n## Key Sections\n\n1. **Hero**: Bold intro with your name and role\n2. **About**: Brief bio with personality\n3. **Projects**: Case studies with visuals\n4. **Skills**: Visual skill representation\n5. **Contact**: Easy ways to reach you\n\n## Tech Stack Recommendations\n\n- **Framework**: React, Vue, or Svelte\n- **Styling**: Tailwind CSS\n- **Animations**: Framer Motion\n- **Deployment**: Vercel or Netlify\n\nWant me to elaborate on any of these?",
        timestamp: new Date('2024-01-12T16:46:00'),
        model: 'creative-expert',
      },
    ],
    createdAt: new Date('2024-01-12T16:45:00'),
    updatedAt: new Date('2024-01-12T16:46:00'),
  },
  {
    id: 'conv-5',
    title: 'Data analysis help',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Help me analyze this sales data',
        timestamp: new Date('2024-01-11T11:00:00'),
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: "I'd be happy to help you analyze your sales data! To provide the most useful analysis, could you share:\n\n1. **Data Format**: CSV, Excel, database?\n2. **Time Period**: What date range?\n3. **Key Metrics**: Revenue, units sold, customers?\n4. **Goals**: What insights are you looking for?\n\n## Common Sales Analyses\n\nHere are some analyses I can help with:\n\n- **Trend Analysis**: Identify growth patterns\n- **Segmentation**: Customer/product categories\n- **Forecasting**: Predict future sales\n- **Cohort Analysis**: Customer retention\n- **A/B Test Results**: Campaign effectiveness\n\nShare your data or describe what you need, and I'll provide detailed analysis!",
        timestamp: new Date('2024-01-11T11:01:00'),
        model: 'horizon-auto',
      },
    ],
    createdAt: new Date('2024-01-11T11:00:00'),
    updatedAt: new Date('2024-01-11T11:01:00'),
  },
];

// Mock Usage Stats
export const mockUsageStats: UsageStats = {
  tokensUsed: 72000,
  tokensLimit: 100000,
  requestsToday: 45,
  requestsLimit: 100,
  resetTime: new Date('2024-01-16T00:00:00'),
  percentageUsed: 72,
};

// Suggested Prompts for Empty Chat
export const suggestedPrompts = [
  {
    icon: '🎮',
    title: 'Build a game',
    prompt: 'Help me create a simple browser game using JavaScript',
  },
  {
    icon: '💻',
    title: 'Write code',
    prompt: 'Create a Python script to automate file organization',
  },
  {
    icon: '📝',
    title: 'Write content',
    prompt: 'Help me write a blog post about artificial intelligence trends',
  },
  {
    icon: '🎨',
    title: 'Design help',
    prompt: 'Give me ideas for a modern mobile app interface',
  },
  {
    icon: '📊',
    title: 'Analyze data',
    prompt: 'Explain how to analyze customer behavior data',
  },
  {
    icon: '🔬',
    title: 'Learn something',
    prompt: 'Explain machine learning in simple terms',
  },
];

// FAQ Data
export const faqData = [
  {
    question: 'What is HorizonAI?',
    answer: 'HorizonAI is a unified AI platform that gives you access to multiple AI models through a single interface. Instead of managing multiple subscriptions and accounts, you can use various AI models seamlessly from one place.',
  },
  {
    question: 'How does Horizon Auto work?',
    answer: 'Horizon Auto is our intelligent routing system. When you send a message, it analyzes your request and automatically selects the most suitable AI model for the task. This ensures you get the best response without needing to manually choose a model each time.',
  },
  {
    question: 'What\'s the difference between Free, Premium, and Ultra?',
    answer: 'Free tier gives you access to our basic models with standard usage limits. Premium unlocks advanced models like Coding Expert and Creative Expert with 5x higher limits. Ultra provides access to our most powerful models including Horizon Ultra and Multi-AI with maximum limits and priority processing.',
  },
  {
    question: 'Can I switch between models during a conversation?',
    answer: 'Yes! You can change the model at any time during a conversation. Each message will be processed by the currently selected model. Premium tiers also allow multi-model conversations where different models can collaborate.',
  },
  {
    question: 'Is my data private?',
    answer: 'Absolutely. Your conversations are encrypted and stored securely. We never use your data to train our models without explicit consent. Premium and Ultra users get additional privacy features and data retention controls.',
  },
  {
    question: 'Do you offer team plans?',
    answer: 'Yes! Ultra tier includes team collaboration features. For larger teams, contact us for enterprise plans with custom limits, dedicated support, and advanced admin controls.',
  },
];
