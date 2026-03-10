import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot Password — Belmont Dry Cleaners" />

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
                <div className="relative hidden lg:flex flex-col justify-between p-12 bg-[#1a0a2e] overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(144,7,238,0.35) 0%, transparent 60%)' }} />
                        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 80%, rgba(89,4,148,0.4) 0%, transparent 60%)' }} />
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
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 w-fit mb-7">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span className="text-purple-300 text-[11px] font-medium tracking-widest uppercase">Account Recovery</span>
                        </div>

                        <h1 className="text-5xl font-bold text-white leading-[1.15] tracking-tight mb-5">
                            Regain access<br />
                            <em className="italic text-purple-300">to your account.</em>
                        </h1>

                        <p className="text-white/50 text-[15px] leading-relaxed max-w-sm mb-12">
                            We'll send a secure reset link to your email address. It only takes a moment to get back in.
                        </p>

                        {/* Steps */}
                        <div className="flex flex-col gap-5">
                            {[
                                { step: '01', title: 'Enter your email', desc: 'Provide the email linked to your account' },
                                { step: '02', title: 'Check your inbox', desc: "We'll send a secure reset link" },
                                { step: '03', title: 'Reset your password', desc: 'Follow the link to set a new password' },
                            ].map((s) => (
                                <div key={s.step} className="flex items-start gap-4">
                                    <span className="text-[11px] font-bold text-purple-400/60 tracking-widest pt-0.5 w-6 shrink-0">{s.step}</span>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[14px] font-semibold text-white/85">{s.title}</span>
                                        <span className="text-[12px] text-white/38 leading-relaxed">{s.desc}</span>
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

                        {/* Back to login */}
                        <Link
                            href={login()}
                            className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-400 hover:text-[#1a0a2e] transition-colors mb-10 group"
                        >
                            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 5l-7 7 7 7" />
                            </svg>
                            Back to sign in
                        </Link>

                        {/* Header */}
                        <div className="mb-8">
                            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9007EE] mb-2">Password reset</p>
                            <h2 className="text-[26px] font-bold text-[#0f0a1a] tracking-tight leading-snug mb-2">Forgot your password?</h2>
                            <p className="text-[14px] text-gray-400 leading-relaxed">
                                Enter your email and we'll send you a link to reset your password.
                            </p>
                        </div>

                        {/* Status */}
                        {status && (
                            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6 text-[13px] text-green-700">
                                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                {status}
                            </div>
                        )}

                        <Form {...email.form()} className="flex flex-col">
                            {({ processing, errors }) => (
                                <>
                                    <div className="flex flex-col gap-1.5 mb-6">
                                        <Label htmlFor="email" className="text-[13px] font-medium text-gray-600">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            autoComplete="off"
                                            placeholder="you@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full h-11 rounded-xl bg-[#1a0a2e] text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#2d1249] hover:-translate-y-px hover:shadow-xl hover:shadow-[#1a0a2e]/25 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mb-6 cursor-pointer"
                                    >
                                        {processing && <Spinner />}
                                        {processing ? 'Sending link...' : 'Send reset link'}
                                        {!processing && (
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>

                                    <p className="text-center text-[13px] text-gray-400">
                                        Remembered it?{' '}
                                        <TextLink href={login()} className="text-[#9007EE] font-semibold hover:opacity-70 transition-opacity">
                                            Sign in instead
                                        </TextLink>
                                    </p>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}