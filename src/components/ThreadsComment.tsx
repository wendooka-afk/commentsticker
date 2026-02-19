import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react';

interface ThreadsCommentProps {
  username: string;
  comment: string;
  likes: string;
  time: string;
  avatarUrl: string;
  verified: boolean;
  liked: boolean;
  replies: string;
}

export function ThreadsComment({ username, comment, likes, time, avatarUrl, verified, liked, replies }: ThreadsCommentProps) {
  return (
    <div className="bg-white text-black p-4 rounded-2xl w-full max-w-[420px] font-sans border border-gray-200">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 ring-1 ring-gray-300">
            <img src={avatarUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[15px]">{username}</span>
              {verified && (
                <svg className="w-4 h-4 text-[#0095f6] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.5 14.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z"/>
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-400">{time}</span>
          </div>
          <p className="text-[15px] text-gray-900 mt-1 leading-relaxed whitespace-pre-wrap break-words">{comment}</p>
          <div className="flex items-center gap-4 mt-3">
            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className={`w-5 h-5 ${liked ? 'text-[#ff3040] fill-[#ff3040]' : 'text-gray-900'}`} />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <MessageCircle className="w-5 h-5 text-gray-900" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <Repeat2 className="w-5 h-5 text-gray-900" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <Send className="w-5 h-5 text-gray-900" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
            <span>{replies} réponses</span>
            <span>•</span>
            <span>{likes} J'aime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
