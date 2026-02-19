import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface YouTubeCommentProps {
  username: string;
  comment: string;
  likes: string;
  time: string;
  avatarUrl: string;
  verified: boolean;
  liked: boolean;
}

export function YouTubeComment({ username, comment, likes, time, avatarUrl, verified, liked }: YouTubeCommentProps) {
  return (
    <div className="bg-white text-black p-4 rounded-2xl w-full max-w-[420px] font-sans border border-gray-200">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img src={avatarUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className={`font-medium text-[13px] ${verified ? 'bg-gray-200 rounded-full px-2 py-0.5' : ''}`}>{username}</span>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <p className="text-sm text-gray-900 mt-1 leading-relaxed whitespace-pre-wrap break-words">{comment}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <ThumbsUp className={`w-4 h-4 ${liked ? 'text-blue-600 fill-blue-600' : 'text-gray-600'}`} />
              <span className="text-xs text-gray-600">{likes}</span>
            </div>
            <ThumbsDown className="w-4 h-4 text-gray-600" />
            <button className="text-xs text-gray-600 font-medium ml-2 hover:bg-gray-100 px-2 py-1 rounded-full">
              Répondre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
