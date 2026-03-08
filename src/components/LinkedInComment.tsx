interface LinkedInProps {
    username: string;
    displayName: string;
    comment: string;
    likes: string;
    time: string;
    avatarUrl: string;
    verified: boolean;
}

export function LinkedInComment({ username, displayName, comment, likes, time, avatarUrl, verified }: LinkedInProps) {
    const likeCount = parseInt(likes.replace(/[^0-9]/g, '')) || 0;

    return (
        <div style={{
            background: '#ffffff',
            borderRadius: 8,
            padding: '12px 16px',
            maxWidth: 420,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            border: '1px solid #e0e0e0',
            boxSizing: 'border-box',
        }}>
            {/* Author row */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img
                        src={avatarUrl}
                        alt={username}
                        style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                    />
                    {/* LinkedIn connection indicator */}
                    <div style={{
                        position: 'absolute', bottom: -2, right: -2,
                        width: 14, height: 14, background: '#0A66C2',
                        borderRadius: '50%', border: '2px solid #fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <span style={{ color: '#fff', fontSize: 7, fontWeight: 900, lineHeight: 1 }}>in</span>
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontWeight: 600, fontSize: 14, color: '#000000e6', lineHeight: '1.3' }}>
                            {username}
                        </span>
                        {verified && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        )}
                        <span style={{ fontSize: 12, color: '#00000073', marginLeft: 2 }}>• 1st</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#00000099', lineHeight: '1.3', marginTop: 1 }}>
                        {displayName || 'Content Creator'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        <span style={{ fontSize: 11, color: '#00000073' }}>{time}</span>
                        <span style={{ fontSize: 11, color: '#00000073' }}>·</span>
                        {/* Globe icon */}
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#00000073">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Comment text */}
            <p style={{
                fontSize: 14,
                color: '#000000e6',
                margin: '0 0 10px',
                lineHeight: 1.5,
                wordBreak: 'break-word',
            }}>
                {comment}
            </p>

            {/* Reactions */}
            {likeCount > 0 && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    marginBottom: 8, fontSize: 12, color: '#00000073',
                }}>
                    <div style={{ display: 'flex', marginRight: 2 }}>
                        <span style={{ fontSize: 12 }}>👍</span>
                        <span style={{ fontSize: 12, marginLeft: -2 }}>❤️</span>
                    </div>
                    <span>{likes}</span>
                </div>
            )}

            {/* Action buttons */}
            <div style={{
                borderTop: '1px solid #e0e0e0',
                paddingTop: 8,
                display: 'flex',
                gap: 20,
            }}>
                {[
                    { icon: '👍', label: 'Like' },
                    { icon: '💬', label: 'Reply' },
                ].map(btn => (
                    <button
                        key={btn.label}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 4,
                            fontSize: 12, fontWeight: 600, color: '#00000073',
                            background: 'none', border: 'none', cursor: 'pointer',
                            padding: 0,
                        }}
                    >
                        <span>{btn.icon}</span>
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
