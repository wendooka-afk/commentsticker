import { Heart } from 'lucide-react';

interface InstagramCommentProps {
  username: string;
  comment: string;
  likes: string;
  time: string;
  avatarUrl: string;
  verified: boolean;
  liked: boolean;
}

export function InstagramComment({ username, comment, likes, time, avatarUrl, verified, liked }: InstagramCommentProps) {
  return (
    <div className="bg-white text-black p-4 rounded-2xl w-full max-w-[420px] font-sans border border-gray-200">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 ring-2 ring-pink-500 ring-offset-2">
            <img src={avatarUrl} alt="fake instagram comment sticker profile picture" className="w-full h-full object-cover" crossOrigin="anonymous" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <span className="inline">
                <span className="font-semibold text-sm">{username}</span>
                {verified && (
                  <svg className="w-3.5 h-3.5 text-[#3897f0] inline ml-1 align-middle" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.5 14.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z" />
                  </svg>
                )}
                <span className="text-sm text-gray-900 ml-1.5 whitespace-pre-wrap break-words">{comment}</span>
              </span>
            </div>
            <div className="flex flex-col items-center gap-0.5 flex-shrink-0 ml-3">
              <Heart className={`w-3.5 h-3.5 ${liked ? 'text-[#ed4956] fill-[#ed4956]' : 'text-gray-400'}`} />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
            <span>{time}</span>
            <span className="font-semibold">{likes} likes</span>
            <button className="font-semibold hover:text-gray-700">Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
