interface TikTokCommentProps {
  username: string;
  comment: string;
  likes: string;
  time: string;
  avatarUrl: string;
  verified: boolean;
  liked: boolean;
}

export function TikTokComment({ username, comment, likes, time, avatarUrl, verified, liked }: TikTokCommentProps) {
  return (
    <div className="bg-white text-black px-4 py-3 w-full max-w-[420px] font-sans" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <div className="flex gap-3">
        {/* Avatar — 32px comme TikTok */}
        <div className="flex-shrink-0 pt-0.5">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <img src={avatarUrl} alt="tiktok comment generator profile icon" className="w-full h-full object-cover" crossOrigin="anonymous" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Username + badge */}
          <div className="flex items-center gap-1">
            <span className="text-[13px] font-medium text-gray-500 truncate">{username}</span>
            {verified && (
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#20D5EC" />
                <path d="M21.6 31.2L12 21.6L14.4 19.2L21.6 26.4L33.6 14.4L36 16.8L21.6 31.2Z" fill="white" />
              </svg>
            )}
          </div>

          {/* Comment text */}
          <p className="text-[15px] text-[#161823] mt-0.5 leading-[1.4] whitespace-pre-wrap break-words">{comment}</p>

          {/* Meta row */}
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-[12px] text-gray-500">{time}</span>
            <button className="text-[12px] text-gray-500 font-medium">Reply</button>
          </div>
        </div>

        {/* Like button — aligned right */}
        <div className="flex flex-col items-center gap-0.5 flex-shrink-0 pt-5">
          {liked ? (
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="#FE2C55">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="#161823" strokeOpacity="0.4" strokeWidth="1.8">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          <span className={`text-[11px] ${liked ? 'text-[#FE2C55]' : 'text-gray-500'}`}>{likes}</span>
        </div>
      </div>
    </div>
  );
}

export function TikTokReply({ username, comment, likes, time, avatarUrl, verified, liked }: TikTokCommentProps) {
  return (
    <div className="bg-white text-black px-4 pb-2 w-full max-w-[420px] font-sans" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <div className="flex gap-2.5 ml-11">
        {/* Avatar — 24px for replies */}
        <div className="flex-shrink-0 pt-0.5">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
            <img src={avatarUrl} alt="tiktok comment generator profile picture overlay" className="w-full h-full object-cover" crossOrigin="anonymous" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-[12px] font-medium text-gray-500 truncate">{username}</span>
            {verified && (
              <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#20D5EC" />
                <path d="M21.6 31.2L12 21.6L14.4 19.2L21.6 26.4L33.6 14.4L36 16.8L21.6 31.2Z" fill="white" />
              </svg>
            )}
          </div>
          <p className="text-[13px] text-[#161823] mt-0.5 leading-[1.4] whitespace-pre-wrap break-words">{comment}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[11px] text-gray-500">{time}</span>
            <button className="text-[11px] text-gray-500 font-medium">Reply</button>
          </div>
        </div>

        {/* Like */}
        <div className="flex flex-col items-center gap-0.5 flex-shrink-0 pt-4">
          {liked ? (
            <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="#FE2C55">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="#161823" strokeOpacity="0.4" strokeWidth="1.8">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          <span className={`text-[10px] ${liked ? 'text-[#FE2C55]' : 'text-gray-500'}`}>{likes}</span>
        </div>
      </div>
    </div>
  );
}
