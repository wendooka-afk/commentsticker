import { useEffect, useRef } from 'react';

interface AdSenseProps {
    adClient?: string;
    adSlot: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    className?: string;
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

// Module-level guard: tracks which <ins> elements have already been push()'d.
// Survives React StrictMode double-invocation and HMR remounts (module stays
// in memory). AdSense itself rejects duplicate pushes with a TagError, so
// this preempts the error before it hits the AdSense script.
const pushedElements = new WeakSet<HTMLElement>();

/**
 * Google AdSense Component
 * @param adSlot - The advertisement slot ID
 */
export function AdSense({ adClient = "ca-pub-4434058814138910", adSlot, format = "auto", className = "" }: AdSenseProps) {
    const insRef = useRef<HTMLModElement | null>(null);

    useEffect(() => {
        const el = insRef.current;
        if (!el) return;

        // Already filled by AdSense, or already pushed by us (StrictMode/HMR).
        if (el.getAttribute('data-ad-status') || pushedElements.has(el)) return;

        const push = () => {
            if (!el.isConnected) return;
            if (el.getAttribute('data-ad-status')) return;
            if (pushedElements.has(el)) return;
            if (el.offsetWidth === 0) return; // container not laid out yet
            // Claim the element BEFORE pushing so concurrent observers don't race.
            pushedElements.add(el);
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                // If push fails, unclaim so a future retry can succeed.
                pushedElements.delete(el);
                console.error('AdSense error:', e);
            }
        };

        // Attempt once the container has been laid out. RAF ensures first-paint
        // measurement; ResizeObserver handles the case where width becomes
        // available later (lazy-mounted sections, responsive breakpoints).
        const raf = requestAnimationFrame(push);
        const ro = new ResizeObserver(() => push());
        ro.observe(el);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, []);

    return (
        <div className={`ad-container my-8 w-full flex justify-center overflow-hidden min-h-[100px] ${className}`}>
            <ins
                ref={insRef}
                className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}
