interface DiscordCommentProps {
  username: string;
  comment: string;
  time: string;
  avatarUrl: string;
  verified: boolean;
}

export function DiscordComment({ username, comment, time, avatarUrl, verified }: DiscordCommentProps) {
  const now = new Date();
  const formattedTime = `Aujourd'hui à ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  return (
    <div className="bg-[#313338] text-white p-4 rounded-lg w-full max-w-[520px] font-sans">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#5865F2]">
            <img src={avatarUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#f2f3f5] hover:underline cursor-pointer">{username}</span>
            {verified && (
              <span className="bg-[#5865F2] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.5 14.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z"/>
                </svg>
                BOT
              </span>
            )}
            <span className="text-xs text-[#949ba4]">{time === '2h' ? formattedTime : time}</span>
          </div>
          <p className="text-[#dbdee1] text-sm mt-0.5 leading-relaxed whitespace-pre-wrap break-words">{comment}</p>
        </div>
      </div>
      
      {/* Reaction bar */}
      <div className="mt-2 ml-14 flex gap-1">
        <button className="bg-[#2b2d31] hover:bg-[#404249] border border-[#1e1f22] rounded px-1.5 py-0.5 flex items-center gap-1 transition-colors">
          <span className="text-sm">👍</span>
          <span className="text-xs text-[#b5bac1]">3</span>
        </button>
        <button className="bg-[#2b2d31] hover:bg-[#404249] border border-[#1e1f22] rounded px-1.5 py-0.5 flex items-center gap-1 transition-colors">
          <span className="text-sm">😂</span>
          <span className="text-xs text-[#b5bac1]">1</span>
        </button>
        <button className="bg-[#2b2d31] hover:bg-[#404249] border border-[#1e1f22] rounded px-1.5 py-0.5 transition-colors">
          <svg className="w-4 h-4 text-[#b5bac1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
