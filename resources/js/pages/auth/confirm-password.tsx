import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm Password — Belmont Dry Cleaners" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Platypi:ital,wght@0,300..800;1,300..800&display=swap');
                * { font-family: 'Platypi', Georgia, serif; }
                input[type="email"], input[type="password"], input[type="text"] {
                    padding-left: 16px !important;
                    padding-right: 16px !important;
                    height: 44px !important;
                    font-family: 'Platypi', Georgia, serif !important;
                    font-size: 14px !important;
                    border: 1.5px solid #e5e7eb !important;
                    border-radius: 10px !important;
                    background: #ffffff !important;
                    transition: border-color 0.2s, box-shadow 0.2s !important;
                    outline: none !important;
                    width: 100% !important;
                }
                input:hover {
                    border-color: #c084fc !important;
                    box-shadow: 0 0 0 3px rgba(144,7,238,0.06) !important;
                }
                input:focus {
                    border-color: #9007EE !important;
                    box-shadow: 0 0 0 3px rgba(144,7,238,0.12) !important;
                }
            `}</style>

            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#faf9f7]">

                {/* ── LEFT PANEL ── */}
                <div className="relative hidden lg:flex flex-col justify-between p-12 bg-[#0a0a1a] overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(59,130,246,0.2) 0%, transparent 60%)' }} />
                        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 80%, rgba(144,7,238,0.25) 0%, transparent 60%)' }} />
                        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/5" />
                        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-white/5" />
                    </div>

                    {/* Brand */}
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46L5.5 8A2.5 2.5 0 0 1 8 5.5h1.5" />
                                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46L18.5 8A2.5 2.5 0 0 0 16 5.5h-1.5" />
                            </svg>
                        </div>
                        <span className="text-white/90 font-semibold text-[15px] tracking-tight">Belmont Dry Cleaners</span>
                    </div>

                    {/* Hero */}
                    <div className="relative z-10 flex flex-col flex-1 justify-center py-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 w-fit mb-7">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            <span className="text-blue-300 text-[11px] font-medium tracking-widest uppercase">Secure Area</span>
                        </div>

                        <h1 className="text-5xl font-bold text-white leading-[1.15] tracking-tight mb-5">
                            Verify it's<br />
                            <em className="italic text-blue-300">really you.</em>
                        </h1>

                        <p className="text-white/50 text-[15px] leading-relaxed max-w-sm mb-12">
                            You're accessing a protected area. Please confirm your password to continue securely.
                        </p>

                        {/* Security badges */}
                        <div className="flex flex-col gap-4">
                            {[
                                { icon: '🔒', title: 'End-to-end encrypted', desc: 'Your data is always protected' },
                                { icon: '🛡️', title: 'Secure session', desc: 'Activity monitored for your safety' },
                                { icon: '✅', title: 'Identity verified', desc: 'Confirms it\'s you before proceeding' },
                            ].map((item) => (
                                <div key={item.title} className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-lg bg-white/7 border border-white/8 flex items-center justify-center shrink-0 text-sm">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[14px] font-semibold text-white/85">{item.title}</span>
                                        <span className="text-[12px] text-white/38 leading-relaxed">{item.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 h-px bg-white/[0.07]" />
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="flex items-center justify-center p-8 lg:p-12">
                    <div className="w-full max-w-[400px]">

                        {/* Security icon */}
                        <div className="w-14 h-14 rounded-2xl bg-[#1a0a2e]/8 border border-[#1a0a2e]/10 flex items-center justify-center mb-8">
                            <svg className="w-6 h-6 text-[#9007EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>

                        {/* Header */}
                        <div className="mb-8">
                            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9007EE] mb-2">Security check</p>
                            <h2 className="text-[26px] font-bold text-[#0f0a1a] tracking-tight leading-snug mb-2">Confirm your password</h2>
                            <p className="text-[14px] text-gray-400 leading-relaxed">
                                This is a secure area. Please confirm your password before continuing.
                            </p>
                        </div>

                        <Form {...store.form()} resetOnSuccess={['password']} className="flex flex-col">
                            {({ processing, errors }) => (
                                <>
                                    <div className="flex flex-col gap-1.5 mb-6">
                                        <Label htmlFor="password" className="text-[13px] font-medium text-gray-600">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            autoFocus
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        data-test="confirm-password-button"
                                        className="w-full h-11 rounded-xl bg-[#1a0a2e] text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#2d1249] hover:-translate-y-px hover:shadow-xl hover:shadow-[#1a0a2e]/25 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                                    >
                                        {processing && <Spinner />}
                                        {processing ? 'Confirming...' : 'Confirm password'}
                                        {!processing && (
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}