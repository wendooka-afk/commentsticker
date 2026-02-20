// Ready-to-use comment templates
export interface CommentTemplate {
  id: string;
  category: string;
  icon: string;
  text: string;
  description: string;
}

export const commentTemplates: CommentTemplate[] = [
  // Viral Questions
  { id: '1', category: 'Viral Questions', icon: '🔥', text: "Wait, is this really possible?!", description: "Disbelief hook" },
  { id: '2', category: 'Viral Questions', icon: '🔥', text: "How did you do that? I want to know!", description: "Tutorial request" },
  { id: '3', category: 'Viral Questions', icon: '🔥', text: "I've had the same question for years...", description: "Relatability" },
  { id: '4', category: 'Viral Questions', icon: '🔥', text: "FINALLY someone talking about this!", description: "Social validation" },
  { id: '5', category: 'Viral Questions', icon: '🔥', text: "Can you make a part 2 please?", description: "Follow-up engagement" },

  // Beginners
  { id: '6', category: 'Beginners', icon: '🌱', text: "I'm a beginner, where do I start?", description: "Starting question" },
  { id: '7', category: 'Beginners', icon: '🌱', text: "Is this suitable for beginners?", description: "Required level" },
  { id: '8', category: 'Beginners', icon: '🌱', text: "I have 0 experience, is that okay?", description: "Reassurance" },
  { id: '9', category: 'Beginners', icon: '🌱', text: "What is the first step to take?", description: "Immediate action" },
  { id: '10', category: 'Beginners', icon: '🌱', text: "Do you have advice for someone just starting?", description: "Personalized advice" },

  // Skeptics
  { id: '11', category: 'Skeptics', icon: '🤔', text: "Is this really effective or is it bs?", description: "Direct doubt" },
  { id: '12', category: 'Skeptics', icon: '🤔', text: "And does it really work? I have a hard time believing it...", description: "Polite skepticism" },
  { id: '13', category: 'Skeptics', icon: '🤔', text: "Prove it with concrete results", description: "Proof request" },
  { id: '14', category: 'Skeptics', icon: '🤔', text: "Isn't it too good to be true?", description: "Distrust" },
  { id: '15', category: 'Skeptics', icon: '🤔', text: "Isn't there a catch somewhere?", description: "Looking for a catch" },

  // Motivation
  { id: '16', category: 'Motivation', icon: '💪', text: "How do you stay motivated every day?", description: "Motivation routine" },
  { id: '17', category: 'Motivation', icon: '💪', text: "I feel like quitting, what should I do?", description: "Moment of doubt" },
  { id: '18', category: 'Motivation', icon: '💪', text: "How do you handle days without motivation?", description: "Handling low moments" },
  { id: '19', category: 'Motivation', icon: '💪', text: "What was your turning point to start?", description: "Origin story" },
  { id: '20', category: 'Motivation', icon: '💪', text: "How did you overcome failure?", description: "Resilience" },

  // Money
  { id: '21', category: 'Money', icon: '💰', text: "How much does it really cost?", description: "Real budget" },
  { id: '22', category: 'Money', icon: '💰', text: "How much do you make with this?", description: "Direct income" },
  { id: '23', category: 'Money', icon: '💰', text: "Is it possible without investing at first?", description: "$0 start" },
  { id: '24', category: 'Money', icon: '💰', text: "How did you finance the beginning?", description: "Initial funding" },
  { id: '25', category: 'Money', icon: '💰', text: "How long until it's profitable?", description: "ROI timeline" },

  // Time
  { id: '26', category: 'Time', icon: '⏰', text: "How much time does it take per day?", description: "Daily investment" },
  { id: '27', category: 'Time', icon: '⏰', text: "How long before the first results?", description: "Results timeline" },
  { id: '28', category: 'Time', icon: '⏰', text: "Is it compatible with a full-time job?", description: "Side hustle" },
  { id: '29', category: 'Time', icon: '⏰', text: "How do you manage your time?", description: "Organization" },
  { id: '30', category: 'Time', icon: '⏰', text: "Is it doable in 1h a day?", description: "Limited time" },

  // Tools
  { id: '31', category: 'Tools', icon: '🛠️', text: "What tools do you use?", description: "Tech stack" },
  { id: '32', category: 'Tools', icon: '🛠️', text: "What's your setup?", description: "Configuration" },
  { id: '33', category: 'Tools', icon: '🛠️', text: "Which app do you recommend?", description: "Recommendation" },
  { id: '34', category: 'Tools', icon: '🛠️', text: "What software do you use for this?", description: "Specific software" },
  { id: '35', category: 'Tools', icon: '🛠️', text: "Is it free or paid?", description: "Tool price" },

  // Mistakes
  { id: '36', category: 'Mistakes', icon: '❌', text: "What mistakes did you make at the beginning?", description: "Learning" },
  { id: '37', category: 'Mistakes', icon: '❌', text: "What are the traps to avoid?", description: "Red flags" },
  { id: '38', category: 'Mistakes', icon: '❌', text: "Do you regret anything?", description: "Regrets" },
  { id: '39', category: 'Mistakes', icon: '❌', text: "What would you have done differently?", description: "Hindsight" },
  { id: '40', category: 'Mistakes', icon: '❌', text: "What is the biggest mistake beginners make?", description: "Common mistake" },

  { id: '41', category: 'E-commerce', icon: '🛒', text: "What are the delivery times?", description: "Logistics" },
  { id: '42', category: 'E-commerce', icon: '🛒', text: "Is there a promo code for the first order?", description: "Promotion" },
  { id: '43', category: 'E-commerce', icon: '🛒', text: "Is it a money-back guarantee?", description: "Trust" },
  { id: '44', category: 'E-commerce', icon: '🛒', text: "Do you deliver internationally?", description: "Geography" },
  { id: '45', category: 'E-commerce', icon: '🛒', text: "I received my order, it's incredible!", description: "Customer review" },

  { id: '46', category: 'Viral', icon: '✨', text: "I tried it and it really works 🤯", description: "Validation" },
  { id: '47', category: 'Viral', icon: '✨', text: "The hack at the end is insane!", description: "Curiosity" },
  { id: '48', category: 'Viral', icon: '✨', text: "Look at this @friend", description: "Friend mention" },
];

export const templateCategories = [
  { name: 'Viral Questions', icon: '🔥', color: 'from-orange-500 to-red-500' },
  { name: 'Beginners', icon: '🌱', color: 'from-green-500 to-emerald-500' },
  { name: 'Skeptics', icon: '🤔', color: 'from-yellow-500 to-amber-500' },
  { name: 'Motivation', icon: '💪', color: 'from-blue-500 to-indigo-500' },
  { name: 'Money', icon: '💰', color: 'from-yellow-400 to-yellow-600' },
  { name: 'Time', icon: '⏰', color: 'from-purple-500 to-violet-500' },
  { name: 'Tools', icon: '🛠️', color: 'from-gray-500 to-gray-700' },
  { name: 'Mistakes', icon: '❌', color: 'from-red-500 to-rose-500' },
  { name: 'E-commerce', icon: '🛒', color: 'from-blue-400 to-cyan-500' },
  { name: 'Viral', icon: '✨', color: 'from-purple-400 to-pink-500' },
];

// Ready-to-use video scripts
export interface VideoScript {
  id: string;
  type: string;
  icon: string;
  name: string;
  duration: string;
  structure: {
    section: string;
    content: string;
    duration: string;
  }[];
}

export const videoScriptTemplates: VideoScript[] = [
  {
    id: 'reply-basic',
    type: 'Simple Response',
    icon: '💬',
    name: 'I reply to a subscriber',
    duration: '30-60s',
    structure: [
      { section: 'Hook', content: '[Show comment] "Someone asked me this question..."', duration: '3s' },
      { section: 'Transition', content: 'And it\'s a great question because..."', duration: '5s' },
      { section: 'Main answer', content: '[Your answer in max 3 points]', duration: '30-40s' },
      { section: 'CTA', content: '"What about you, do you have any other questions? Let me know in the comments"', duration: '5s' },
    ]
  },
  {
    id: 'reply-story',
    type: 'Storytelling',
    icon: '📖',
    name: 'My personal story',
    duration: '60-90s',
    structure: [
      { section: 'Hook', content: '[Comment] "You want to know how I did it?"', duration: '3s' },
      { section: 'The problem', content: '"[Time] ago, I was exactly like you..."', duration: '15s' },
      { section: 'The turning point', content: '"And then one day, I realized that..."', duration: '15s' },
      { section: 'The solution', content: '"Here is what I did..."', duration: '20s' },
      { section: 'The result', content: '"Today, [concrete result]..."', duration: '10s' },
      { section: 'CTA', content: '"If you want me to explain in detail, like this video"', duration: '5s' },
    ]
  },
  {
    id: 'reply-myth',
    type: 'Myth Buster',
    icon: '🧨',
    name: 'I bust a myth',
    duration: '30-45s',
    structure: [
      { section: 'Hook', content: '[Skeptical comment] "Many think this..."', duration: '3s' },
      { section: 'The myth', content: '"We often hear that [common belief]..."', duration: '5s' },
      { section: 'The truth', content: '"But in reality, it\'s false because..."', duration: '15s' },
      { section: 'The proof', content: '"The proof: [fact/stat/experience]..."', duration: '10s' },
      { section: 'CTA', content: '"Share if you didn\'t know this!"', duration: '3s' },
    ]
  },
  {
    id: 'reply-tutorial',
    type: 'Mini-tutorial',
    icon: '🎓',
    name: 'Quick step-by-step tutorial',
    duration: '45-60s',
    structure: [
      { section: 'Hook', content: '[Comment] "You want to know how to do it?"', duration: '3s' },
      { section: 'Step 1', content: '"First thing: [action 1]..."', duration: '10s' },
      { section: 'Step 2', content: '"Then: [action 2]..."', duration: '10s' },
      { section: 'Step 3', content: '"And finally: [action 3]..."', duration: '10s' },
      { section: 'Result', content: '"And there is the result!"', duration: '5s' },
      { section: 'CTA', content: '"Save this video for later"', duration: '3s' },
    ]
  },
  {
    id: 'reply-controversial',
    type: 'Strong opinion',
    icon: '🔥',
    name: 'My unpopular opinion',
    duration: '30-45s',
    structure: [
      { section: 'Hook', content: '[Comment] "Warning, this won\'t please everyone..."', duration: '3s' },
      { section: 'Opinion', content: '"I think that [strong opinion]..."', duration: '10s' },
      { section: 'Argument 1', content: '"And here\'s why: [reason 1]..."', duration: '10s' },
      { section: 'Argument 2', content: '"In addition: [reason 2]..."', duration: '10s' },
      { section: 'CTA', content: '"Do you agree? Let me know in the comments"', duration: '5s' },
    ]
  },
];

// Popular Hooks
export const popularHooks = [
  "No one will tell you this but...",
  "I wish I knew this earlier...",
  "Stop making this mistake!",
  "What 99% of people don't know...",
  "The truth they hide from you about...",
  "How I [result] in [time]...",
  "3 things I wish I knew before...",
  "The secret no one wants to tell you...",
  "Why you can't seem to [goal]...",
  "The method I use to...",
  "What took me [x years] to understand...",
  "The #1 mistake beginners make...",
];

// Effective Call-to-actions
export const effectiveCTAs = [
  "Like if you learned something!",
  "Save this video for later",
  "Share with someone who needs it",
  "Comment '🔥' if you want part 2",
  "Subscribe for more tips like this",
  "Drop your question in the comments",
  "Tag someone who needs to see this",
  "Follow to not miss anything",
  "Which point stood out to you the most?",
  "Do you agree? Tell me in the comments",
];
