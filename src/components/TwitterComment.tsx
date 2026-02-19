import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';

interface TwitterCommentProps {
  username: string;
  displayName: string;
  comment: string;
  likes: string;
  time: string;
  avatarUrl: string;
  verified: boolean;
  liked: boolean;
  retweets: string;
  replies: string;
}

export function TwitterComment({ username, displayName, comment, likes, time, avatarUrl, verified, liked, retweets, replies }: TwitterCommentProps) {
  return (
    <div className="bg-white text-black p-4 rounded-2xl w-full max-w-[420px] font-sans border border-gray-200">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img src={avatarUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm truncate">{displayName}</span>
            {verified && (
              <svg className="w-4 h-4 text-[#1d9bf0] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/>
              </svg>
            )}
            <span className="text-sm text-gray-500 truncate">@{username}</span>
            <span className="text-sm text-gray-500">·</span>
            <span className="text-sm text-gray-500">{time}</span>
          </div>
          <p className="text-[15px] text-gray-900 mt-0.5 leading-relaxed whitespace-pre-wrap break-words">{comment}</p>
          <div className="flex items-center justify-between mt-3 max-w-[300px]">
            <div className="flex items-center gap-1 text-gray-500 hover:text-blue-500 cursor-pointer group">
              <div className="p-1.5 rounded-full group-hover:bg-blue-50">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs">{replies}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 hover:text-green-500 cursor-pointer group">
              <div className="p-1.5 rounded-full group-hover:bg-green-50">
                <Repeat2 className="w-4 h-4" />
              </div>
              <span className="text-xs">{retweets}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 hover:text-pink-500 cursor-pointer group">
              <div className="p-1.5 rounded-full group-hover:bg-pink-50">
                <Heart className={`w-4 h-4 ${liked ? 'text-pink-500 fill-pink-500' : ''}`} />
              </div>
              <span className="text-xs">{likes}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 hover:text-blue-500 cursor-pointer group">
              <div className="p-1.5 rounded-full group-hover:bg-blue-50">
                <Share className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
