interface SnapchatCommentProps {
  username: string;
  comment: string;
  time: string;
  avatarUrl: string;
  verified: boolean;
}

export function SnapchatComment({ username, comment, time, avatarUrl, verified }: SnapchatCommentProps) {
  return (
    <div className="bg-[#FFFC00] p-4 rounded-2xl w-full max-w-[420px] font-sans">
      <div className="bg-white rounded-2xl p-3 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 ring-2 ring-[#FFFC00]">
              <img src={avatarUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-gray-900">{username}</span>
              {verified && (
                <svg className="w-4 h-4 text-[#FFFC00] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fill="#FFFC00" stroke="#000" strokeWidth="2"/>
                  <path d="M9 12l2 2 4-4" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              <span className="text-xs text-gray-500">• {time}</span>
            </div>
            <div className="mt-1.5 bg-gray-100 rounded-xl px-3 py-2">
              <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">{comment}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <div className="bg-white/80 rounded-full px-4 py-2 flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700">Envoyer un chat</span>
        </div>
        <div className="bg-white/80 rounded-full p-2">
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
