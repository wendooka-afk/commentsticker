import { useEffect } from 'react';

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

/**
 * Composant Google AdSense
 * @param adSlot - L'identifiant de l'emplacement publicitaire (Slot ID)
 */
export function AdSense({ adClient = "ca-pub-4434058814138910", adSlot, format = "auto", className = "" }: AdSenseProps) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <div className={`ad-container my-8 flex justify-center overflow-hidden min-h-[100px] ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}
