export default function WelcomeBanner() {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-[#0d1b2a] px-8 py-7 flex items-center justify-between">
            <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.15)_0%,transparent_70%)]" />
            <div>
                <h2 className="font-serif text-2xl text-white mb-1">Your garments are in good hands</h2>
                <p className="text-sm text-[#8a9bb0]">You have 3 active orders · Next delivery: Tomorrow, 2–5 PM</p>
            </div>
            <div className="z-10 min-w-[160px] rounded-xl border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.12)] px-6 py-4 text-center">
                <div className="font-serif text-3xl leading-none text-[#c9a84c]">1,240</div>
                <div className="mt-1 text-[10px] uppercase tracking-[1.5px] text-[#8a9bb0]">Reward Points</div>
                <div className="mt-1.5 text-xs text-[#e8c96a]">✦ Gold — 260 pts to Platinum</div>
            </div>
        </div>
    );
}