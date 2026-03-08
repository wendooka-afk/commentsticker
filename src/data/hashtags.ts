export const NICHES = [
  { id: 'general',    label: 'General',    emoji: '✨' },
  { id: 'beauty',     label: 'Beauty',     emoji: '💄' },
  { id: 'fitness',    label: 'Fitness',    emoji: '💪' },
  { id: 'food',       label: 'Food',       emoji: '🍕' },
  { id: 'travel',     label: 'Travel',     emoji: '✈️' },
  { id: 'tech',       label: 'Tech',       emoji: '💻' },
  { id: 'fashion',    label: 'Fashion',    emoji: '👗' },
  { id: 'music',      label: 'Music',      emoji: '🎵' },
  { id: 'gaming',     label: 'Gaming',     emoji: '🎮' },
  { id: 'business',   label: 'Business',   emoji: '📈' },
  { id: 'motivation', label: 'Motivation', emoji: '🔥' },
  { id: 'parenting',  label: 'Parenting',  emoji: '👶' },
] as const;

export type NicheId = typeof NICHES[number]['id'];

export const PLATFORMS = [
  { id: 'tiktok',     label: 'TikTok' },
  { id: 'instagram',  label: 'Instagram' },
  { id: 'youtube',    label: 'YouTube' },
] as const;

export type PlatformId = typeof PLATFORMS[number]['id'];

const PLATFORM_TAGS: Record<PlatformId, string[]> = {
  tiktok:    ['#fyp', '#foryoupage', '#foryou', '#tiktokviral', '#tiktok', '#trending'],
  instagram: ['#reels', '#reelsinstagram', '#instareels', '#explore', '#instagood', '#instagram'],
  youtube:   ['#youtubeShorts', '#shorts', '#youtube', '#youtubecreator', '#subscribe', '#trending'],
};

interface HashtagSet { viral: string[]; medium: string[]; niche: string[] }

const HASHTAG_DB: Record<NicheId, HashtagSet> = {
  general: {
    viral:  ['#viral', '#trending', '#explore', '#share', '#video'],
    medium: ['#creator', '#content', '#follow', '#like', '#comment'],
    niche:  ['#contentcreator', '#smallcreator', '#creatorlife', '#ugccreator', '#viralvideo'],
  },
  beauty: {
    viral:  ['#beauty', '#makeup', '#skincare', '#glam', '#grwm'],
    medium: ['#makeuptutorial', '#skincareroutine', '#beautyproducts', '#makeuplook', '#beautyinfluencer'],
    niche:  ['#cleanbeauty', '#skintok', '#glassskin', '#naturalmakeup', '#drugstorebeauty'],
  },
  fitness: {
    viral:  ['#fitness', '#workout', '#gym', '#fit', '#health'],
    medium: ['#workoutmotivation', '#gymlife', '#fitnessmotivation', '#exercise', '#gains'],
    niche:  ['#homeworkout', '#fitfam', '#strengthtraining', '#hiitworkout', '#noexcuses'],
  },
  food: {
    viral:  ['#food', '#foodie', '#yummy', '#recipe', '#cooking'],
    medium: ['#foodporn', '#homecooking', '#easyrecipe', '#foodlover', '#mealprep'],
    niche:  ['#foodblogger', '#cleaneating', '#veganrecipes', '#plantbased', '#recipeoftheday'],
  },
  travel: {
    viral:  ['#travel', '#wanderlust', '#explore', '#adventure', '#vacation'],
    medium: ['#travelphotography', '#travelgram', '#travelblogger', '#worldtravel', '#trip'],
    niche:  ['#solotravel', '#budgettravel', '#backpacking', '#digitalnomad', '#traveladdict'],
  },
  tech: {
    viral:  ['#tech', '#technology', '#ai', '#coding', '#programming'],
    medium: ['#developer', '#startup', '#innovation', '#machinelearning', '#cybersecurity'],
    niche:  ['#techhacks', '#devlife', '#github', '#promptengineering', '#openai'],
  },
  fashion: {
    viral:  ['#fashion', '#style', '#ootd', '#outfit', '#streetstyle'],
    medium: ['#outfitoftheday', '#styleinspo', '#fashionblogger', '#lookbook', '#trendy'],
    niche:  ['#slowfashion', '#thriftflip', '#vintage', '#capsulewardrobe', '#streetwear'],
  },
  music: {
    viral:  ['#music', '#newmusic', '#song', '#musician', '#artist'],
    medium: ['#musicproduction', '#beats', '#singer', '#songwriting', '#hiphop'],
    niche:  ['#indiemusic', '#musicstudio', '#lofi', '#beatmaker', '#newartist'],
  },
  gaming: {
    viral:  ['#gaming', '#gamer', '#games', '#gameplay', '#twitch'],
    medium: ['#gamingcommunity', '#esports', '#videogames', '#gaminglife', '#pcgaming'],
    niche:  ['#streamer', '#indiegame', '#gameclips', '#retrogaming', '#fps'],
  },
  business: {
    viral:  ['#business', '#entrepreneur', '#success', '#money', '#mindset'],
    medium: ['#entrepreneurship', '#startup', '#marketing', '#branding', '#hustle'],
    niche:  ['#businesstips', '#growthhacking', '#ecommerce', '#ugcmarketing', '#salestips'],
  },
  motivation: {
    viral:  ['#motivation', '#inspiration', '#success', '#goals', '#positivity'],
    medium: ['#dailymotivation', '#selfimprovement', '#personaldevelopment', '#hardwork', '#grindset'],
    niche:  ['#motivationalquotes', '#selfgrowth', '#growthmindset', '#accountability', '#levelup'],
  },
  parenting: {
    viral:  ['#parenting', '#mom', '#dad', '#kids', '#baby'],
    medium: ['#momlife', '#dadlife', '#toddler', '#newborn', '#parenthood'],
    niche:  ['#gentleparenting', '#momsoftiktok', '#momtok', '#firsttimemom', '#babytips'],
  },
};

export function getHashtags(niche: NicheId, platform: PlatformId, keyword?: string): HashtagSet {
  const base = HASHTAG_DB[niche];
  const platformTags = PLATFORM_TAGS[platform];
  const viral = [...new Set([...base.viral, ...platformTags])];
  const medium = [...base.medium];
  const extra = keyword
    ? [`#${keyword.toLowerCase().replace(/\s+/g, '')}`, `#${keyword.toLowerCase().replace(/\s+/g, '')}tips`]
    : [];
  return { viral, medium, niche: [...extra, ...base.niche] };
}
