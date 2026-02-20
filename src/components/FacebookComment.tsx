interface FacebookCommentProps {
  username: string;
  comment: string;
  likes: string;
  time: string;
  avatarUrl: string;
  verified: boolean;
  liked: boolean;
}

export function FacebookComment({ username, comment, likes, time, avatarUrl, verified, liked }: FacebookCommentProps) {
  return (
    <div className="bg-white text-black p-4 rounded-2xl w-full max-w-[420px] font-sans border border-gray-200">
      <div className="flex gap-2.5">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
            <img src={avatarUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="bg-gray-100 rounded-2xl px-3 py-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[13px]">{username}</span>
              {verified && (
                <svg className="w-3.5 h-3.5 text-[#1877f2] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.5 14.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z" />
                </svg>
              )}
            </div>
            <p className="text-[15px] text-gray-900 mt-0.5 leading-relaxed whitespace-pre-wrap break-words">{comment}</p>
          </div>
          <div className="flex items-center gap-3 mt-1 ml-3 text-xs">
            <span className="text-gray-500">{time}</span>
            <button className={`font-bold ${liked ? 'text-[#1877f2]' : 'text-gray-500'} hover:underline`}>
              Like
            </button>
            <button className="font-bold text-gray-500 hover:underline">Reply</button>
            {Number(likes.replace(/\D/g, '')) > 0 && (
              <div className="flex items-center gap-0.5 ml-auto">
                <div className="w-4 h-4 bg-[#1877f2] rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 21h4V9H2v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500">{likes}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
