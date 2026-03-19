import { useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function NotFound() {
    const bubblesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = bubblesRef.current;
        if (!container) return;

        const bubbles = container.querySelectorAll<HTMLElement>('.bubble');
        bubbles.forEach((b) => {
            const size  = 32 + Math.random() * 64;
            const left  = 5  + Math.random() * 90;
            const delay = Math.random() * 10;
            const dur   = 12 + Math.random() * 10;
            b.style.cssText = `
                width: ${size}px; height: ${size}px;
                left: ${left}%;
                animation-delay: -${delay}s;
                animation-duration: ${dur}s;
                opacity: ${0.03 + Math.random() * 0.06};
            `;
        });
    }, []);

    return (
        <>
            <Head title="Page Not Found" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,600;1,300;1,500&family=Jost:wght@300;400;500&display=swap');

                :root {
                    --deep:     #361b6b;
                    --purple:   #5c2baa;
                    --lavender: #b47bff;
                    --lilac:    #d9b6ff;
                    --mist:     #f3e9ff;
                    --cream:    #fcfaff;

                    --text-primary:   rgba(255,255,255,0.92);
                    --text-secondary: rgba(255,255,255,0.42);
                    --text-muted:     rgba(255,255,255,0.22);
                    --border-subtle:  rgba(180,123,255,0.16);
                    --border-mid:     rgba(180,123,255,0.28);
                }

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                body { background: var(--deep); }

                /* ── Page shell ── */
                .p404 {
                    min-height: 100vh;
                    background: var(--deep);
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem 1.5rem 5rem;
                    overflow: hidden;
                    isolation: isolate;
                }

                /* ── Background mesh ── */
                .bg {
                    position: absolute; inset: 0; z-index: 0; pointer-events: none;
                }
                .bg::before {
                    content: '';
                    position: absolute; inset: 0;
                    background:
                        radial-gradient(ellipse 75% 55% at 10%  5%,  rgba(92,43,170,0.50) 0%, transparent 65%),
                        radial-gradient(ellipse 55% 70% at 90% 90%,  rgba(92,43,170,0.40) 0%, transparent 65%),
                        radial-gradient(ellipse 45% 45% at 50% 48%,  rgba(180,123,255,0.09) 0%, transparent 60%);
                }
                .bg::after {
                    content: '';
                    position: absolute; inset: 0;
                    background-image: radial-gradient(circle, rgba(180,123,255,0.055) 1px, transparent 1px);
                    background-size: 36px 36px;
                }

                /* ── Floating orbs ── */
                .bubbles {
                    position: absolute; inset: 0;
                    pointer-events: none; z-index: 0; overflow: hidden;
                }
                .bubble {
                    position: absolute;
                    bottom: -80px;
                    border-radius: 50%;
                    background: radial-gradient(circle at 35% 35%, var(--lavender), var(--purple));
                    animation: floatUp linear infinite;
                    will-change: transform, opacity;
                }
                @keyframes floatUp {
                    0%   { transform: translateY(0)      scale(1);    opacity: inherit; }
                    85%  { opacity: inherit; }
                    100% { transform: translateY(-105vh) scale(0.75); opacity: 0; }
                }

                /* ── Bottom swatches ── */
                .swatches {
                    position: absolute; bottom: -4px; left: 50%;
                    transform: translateX(-50%);
                    display: flex; z-index: 0; pointer-events: none;
                }
                .swatch {
                    width: clamp(44px, 7vw, 80px);
                    height: clamp(56px, 9vw, 100px);
                    border-radius: 999px 999px 0 0;
                    opacity: 0.10;
                    transform-origin: bottom center;
                }
                .swatch:nth-child(1) { background: var(--lavender); transform: rotate(-18deg) translateX(14px); }
                .swatch:nth-child(2) { background: var(--purple);   transform: rotate(-6deg)  translateX(5px);  }
                .swatch:nth-child(3) { background: var(--lilac);    transform: rotate(6deg)   translateX(-5px); }
                .swatch:nth-child(4) { background: var(--lavender); transform: rotate(18deg)  translateX(-14px);}

                /* ── Content card ── */
                .card {
                    position: relative; z-index: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    max-width: 480px;
                    text-align: center;
                }

                /* ── Hanger ── */
                .hanger-wrap {
                    margin-bottom: 2.75rem;
                    animation: swayHanger 5s ease-in-out infinite;
                    transform-origin: top center;
                }
                @keyframes swayHanger {
                    0%, 100% { transform: rotate(-3.5deg); }
                    50%      { transform: rotate(3.5deg); }
                }
                .hanger-wrap svg {
                    filter: drop-shadow(0 6px 28px rgba(180,123,255,0.30));
                }

                /* ── 404 numeral ── */
                .num {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: clamp(6.5rem, 18vw, 12rem);
                    font-weight: 600;
                    line-height: 1;
                    letter-spacing: -0.03em;
                    background: linear-gradient(145deg, #ffffff 0%, var(--lilac) 45%, var(--lavender) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 0.15em;
                    animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both 0.10s;
                }

                /* ── Status pill ── */
                .pill-status {
                    display: inline-flex; align-items: center; gap: 7px;
                    background: rgba(180,123,255,0.10);
                    border: 1px solid var(--border-mid);
                    border-radius: 999px;
                    padding: 5px 15px 5px 11px;
                    margin-bottom: 1.75rem;
                    animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both 0.22s;
                }
                .pill-dot {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: var(--lavender);
                    animation: pulseDot 2.2s ease-in-out infinite;
                    flex-shrink: 0;
                }
                @keyframes pulseDot {
                    0%,100% { transform: scale(1);    opacity: 1;   }
                    50%     { transform: scale(1.45); opacity: 0.5; }
                }
                .pill-status span {
                    font-family: 'Jost', sans-serif;
                    font-size: 10.5px; font-weight: 500;
                    letter-spacing: 0.13em; text-transform: uppercase;
                    color: var(--lilac);
                }

                /* ── Headline ── */
                .headline {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: clamp(1.55rem, 4.5vw, 2.4rem);
                    font-weight: 500;
                    color: var(--text-primary);
                    line-height: 1.25;
                    letter-spacing: -0.01em;
                    margin-bottom: 1rem;
                    animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both 0.32s;
                }
                .headline em {
                    font-style: italic;
                    color: var(--lavender);
                    font-weight: 300;
                }

                /* ── Subtext ── */
                .sub {
                    font-family: 'Jost', sans-serif;
                    font-size: clamp(0.83rem, 2vw, 0.93rem);
                    font-weight: 300;
                    line-height: 1.8;
                    color: var(--text-secondary);
                    max-width: 360px;
                    margin-bottom: 2.5rem;
                    animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both 0.40s;
                }

                /* ── CTA ── */
                .cta {
                    display: flex; flex-wrap: wrap; gap: 0.7rem; justify-content: center;
                    animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both 0.48s;
                }
                .btn-home {
                    display: inline-flex; align-items: center; gap: 9px;
                    background: linear-gradient(135deg, var(--purple) 0%, #7c3fd4 100%);
                    color: #fff;
                    font-family: 'Jost', sans-serif;
                    font-size: 13.5px; font-weight: 500;
                    padding: 12px 26px;
                    border-radius: 11px; border: none; cursor: pointer;
                    text-decoration: none;
                    transition: transform 0.22s ease, box-shadow 0.22s ease;
                    box-shadow: 0 3px 18px rgba(92,43,170,0.45), inset 0 1px 0 rgba(255,255,255,0.12);
                    letter-spacing: 0.01em;
                }
                .btn-home:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 28px rgba(92,43,170,0.60), inset 0 1px 0 rgba(255,255,255,0.15);
                }
                .btn-home:active { transform: translateY(0); }

                /* ── Divider ── */
                .divider {
                    width: 100%; max-width: 400px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent 0%, var(--border-mid) 40%, var(--border-mid) 60%, transparent 100%);
                    margin: 2.75rem 0 2rem;
                    animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both 0.55s;
                }

                /* ── Explore label ── */
                .explore-label {
                    font-family: 'Jost', sans-serif;
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 0.14em; text-transform: uppercase;
                    color: var(--text-muted);
                    margin-bottom: 1.1rem;
                    animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both 0.60s;
                }

                /* ── Quick-link pills ── */
                .pills {
                    display: flex; flex-wrap: wrap; gap: 0.55rem; justify-content: center;
                    animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both 0.68s;
                }
                .pill {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: rgba(180,123,255,0.07);
                    border: 1px solid var(--border-subtle);
                    color: var(--text-secondary);
                    font-family: 'Jost', sans-serif;
                    font-size: 12.5px; font-weight: 400;
                    padding: 7px 15px;
                    border-radius: 999px;
                    text-decoration: none;
                    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
                    white-space: nowrap;
                }
                .pill:hover {
                    background: rgba(180,123,255,0.16);
                    border-color: rgba(180,123,255,0.36);
                    color: var(--text-primary);
                    transform: translateY(-1px);
                }
                .pill svg { flex-shrink: 0; opacity: 0.7; }

                /* ── Shared keyframe ── */
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* ── Responsive ── */
                @media (max-width: 480px) {
                    .p404 { padding: 3rem 1.25rem 4.5rem; }
                    .hanger-wrap { margin-bottom: 2rem; }
                    .cta { flex-direction: column; align-items: stretch; }
                    .btn-home { justify-content: center; }
                    .divider { margin: 2.25rem 0 1.75rem; }
                    .pills { gap: 0.45rem; }
                }

                @media (min-width: 768px) {
                    .p404 { padding: 5rem 2rem 6rem; }
                    .hanger-wrap { margin-bottom: 3rem; }
                }
            `}</style>

            <div className="p404">
                <div className="bg" />

                <div className="bubbles" ref={bubblesRef}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div className="bubble" key={i} />
                    ))}
                </div>

                <div className="swatches">
                    <div className="swatch" /><div className="swatch" />
                    <div className="swatch" /><div className="swatch" />
                </div>

                <div className="card">

                    {/* Hanger */}
                    <div className="hanger-wrap">
                        <svg width="88" height="70" viewBox="0 0 90 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M45 4 C45 4 45 0 49 0 C53 0 55 3 55 6 C55 10 52 13 48 14 C46 14.5 45 15 45 15"
                                  stroke="url(#hookG)" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
                            <path d="M45 15 L45 27 L8 58 Q4 62 4 66 Q4 71 9 71 L81 71 Q86 71 86 66 Q86 62 82 58 L45 27"
                                  stroke="url(#hangerG)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            <path d="M29 53 Q37 47 45 46 Q53 47 61 53"
                                  stroke="rgba(217,182,255,0.25)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                            <circle cx="22" cy="61" r="1.8" fill="rgba(180,123,255,0.45)"/>
                            <circle cx="68" cy="61" r="1.8" fill="rgba(180,123,255,0.45)"/>
                            <defs>
                                <linearGradient id="hookG" x1="45" y1="0" x2="55" y2="15" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#e8ceff"/>
                                    <stop offset="1" stopColor="#b47bff"/>
                                </linearGradient>
                                <linearGradient id="hangerG" x1="4" y1="15" x2="86" y2="71" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#e8ceff"/>
                                    <stop offset="0.45" stopColor="#b47bff"/>
                                    <stop offset="1" stopColor="#5c2baa"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* 404 */}
                    <div className="num">404</div>

                    {/* Status pill */}
                    <div className="pill-status">
                        <span className="pill-dot" />
                        <span>Page Not Found</span>
                    </div>

                    {/* Headline */}
                    <h1 className="headline">
                        The requested page was <em>not found.</em>
                    </h1>

                    {/* Subtext */}
                    <p className="sub">
                        Looks like this page was sent to the wrong rack. Let us take you somewhere fresh and clean.
                    </p>

                    {/* CTA */}
                    <div className="cta">
                        <Link href="/" className="btn-home">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
                                <path d="M9 21V12h6v9"/>
                            </svg>
                            Back to Home
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="divider" />

                    {/* Explore */}
                    <p className="explore-label">Or explore</p>
                    <div className="pills">
                        <Link href="/checkrate" className="pill">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 8v4l3 3"/>
                            </svg>
                            Check Rates
                        </Link>
                        <Link href="/luxury" className="pill">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            Luxury Care
                        </Link>
                        <Link href="/about-us" className="pill">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="8" r="4"/>
                                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                            </svg>
                            About Us
                        </Link>
                        <Link href="/faq" className="pill">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
                            </svg>
                            FAQ
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
}