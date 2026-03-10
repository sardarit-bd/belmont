import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Create Account — Belmont Dry Cleaners" />

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
                <div className="relative hidden lg:flex flex-col justify-between p-12 bg-[#0f1a0a] overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(34,139,34,0.25) 0%, transparent 60%)' }} />
                        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 70%, rgba(144,7,238,0.2) 0%, transparent 60%)' }} />
                        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/5" />
                        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-white/5" />
                    </div>

                    {/* Brand */}
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/12 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46L5.5 8A2.5 2.5 0 0 1 8 5.5h1.5" />
                                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46L18.5 8A2.5 2.5 0 0 0 16 5.5h-1.5" />
                            </svg>
                        </div>
                        <span className="text-white/90 font-semibold text-[15px] tracking-tight">Belmont Dry Cleaners</span>
                    </div>

                    {/* Hero */}
                    <div className="relative z-10 flex flex-col flex-1 justify-center py-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/25 w-fit mb-7">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            <span className="text-green-300 text-[11px] font-medium tracking-widest uppercase">Join Us Today</span>
                        </div>

                        <h1 className="text-5xl font-bold text-white leading-[1.15] tracking-tight mb-5">
                            Start your<br />
                            <em className="italic text-green-300">premium experience.</em>
                        </h1>

                        <p className="text-white/50 text-[15px] leading-relaxed max-w-sm mb-12">
                            Create your account and enjoy seamless scheduling, real-time order tracking, and doorstep pickup & delivery.
                        </p>

                        {/* Features */}
                        <div className="flex flex-col gap-5">
                            {[
                                { icon: '📦', title: 'Free Pickup & Delivery', desc: 'We come to you — no extra charge' },
                                { icon: '⚡', title: '24-Hour Turnaround', desc: 'Fast service without compromise' },
                                { icon: '🛡️', title: 'Satisfaction Guaranteed', desc: '100% quality or your money back' },
                            ].map((f) => (
                                <div key={f.title} className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-lg bg-white/7 border border-white/8 flex items-center justify-center shrink-0 text-sm">
                                        {f.icon}
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[14px] font-semibold text-white/85">{f.title}</span>
                                        <span className="text-[12px] text-white/38 leading-relaxed">{f.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
                    <div className="w-full max-w-[420px] py-4">

                        {/* Back to home */}
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-400 hover:text-[#1a0a2e] transition-colors mb-8 group"
                        >
                            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 5l-7 7 7 7" />
                            </svg>
                            Back to home
                        </a>

                        {/* Step dots */}
                        <div className="flex items-center gap-1.5 mb-8">
                            <div className="w-5 h-1.5 rounded-full bg-[#9007EE]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                        </div>

                        {/* Header */}
                        <div className="mb-8">
                            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9007EE] mb-2">Get started</p>
                            <h2 className="text-[26px] font-bold text-[#0f0a1a] tracking-tight leading-snug mb-2">Create your account</h2>
                            <p className="text-[14px] text-gray-400 leading-relaxed">Fill in your details to get started in seconds</p>
                        </div>

                        <Form {...store.form()} className="flex flex-col">
                            {({ processing, errors }) => (
                                <>
                                    <div className="flex flex-col gap-5 mb-6">
                                        {/* Name */}
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="name" className="text-[13px] font-medium text-gray-600">Full name</Label>
                                            <Input id="name" type="text" name="name" required autoFocus tabIndex={1} autoComplete="name" placeholder="John Doe" />
                                            <InputError message={errors.name} />
                                        </div>

                                        {/* Email */}
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="email" className="text-[13px] font-medium text-gray-600">Email address</Label>
                                            <Input id="email" type="email" name="email" required tabIndex={2} autoComplete="email" placeholder="you@example.com" />
                                            <InputError message={errors.email} />
                                        </div>

                                        {/* Password */}
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="password" className="text-[13px] font-medium text-gray-600">Password</Label>
                                            <Input id="password" type="password" name="password" required tabIndex={3} autoComplete="new-password" placeholder="At least 8 characters" />
                                            <p className="text-[11px] text-gray-400 mt-1">Use 8+ characters with a mix of letters and numbers</p>
                                            <InputError message={errors.password} />
                                        </div>

                                        {/* Confirm password */}
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="password_confirmation" className="text-[13px] font-medium text-gray-600">Confirm password</Label>
                                            <Input id="password_confirmation" type="password" name="password_confirmation" required tabIndex={4} autoComplete="new-password" placeholder="Repeat your password" />
                                            <InputError message={errors.password_confirmation} />
                                        </div>
                                    </div>

                                    {/* Terms */}
                                    <p className="text-[12px] text-gray-400 leading-relaxed text-center mb-5">
                                        By creating an account, you agree to our{' '}
                                        <a href="/terms" className="text-[#9007EE] font-medium hover:opacity-70 transition-opacity">Terms of Service</a>
                                        {' '}and{' '}
                                        <a href="/privacy-policy" className="text-[#9007EE] font-medium hover:opacity-70 transition-opacity">Privacy Policy</a>.
                                    </p>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        tabIndex={5}
                                        disabled={processing}
                                        className="w-full h-11 rounded-xl bg-[#1a0a2e] text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#2d1249] hover:-translate-y-px hover:shadow-xl hover:shadow-[#1a0a2e]/25 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mb-5 cursor-pointer"
                                    >
                                        {processing && <Spinner />}
                                        {processing ? 'Creating account...' : 'Create account'}
                                        {!processing && (
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>

                                    <p className="text-center text-[13px] text-gray-400">
                                        Already have an account?{' '}
                                        <TextLink href={login()} className="text-[#9007EE] font-semibold hover:opacity-70 transition-opacity" tabIndex={6}>
                                            Sign in
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