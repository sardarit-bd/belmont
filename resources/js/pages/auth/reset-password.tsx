import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(update.url(), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Reset Password — Belmont Dry Cleaners" />

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
                input[readonly]:hover,
                input[readonly]:focus {
                    border-color: #e5e7eb !important;
                    box-shadow: none !important;
                    cursor: not-allowed !important;
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
                        <span className="text-white/90 font-semibold text-[15px] tracking-tight">Belmont Dry Cleaners</span>
                    </div>

                    {/* Hero */}
                    <div className="relative z-10 flex flex-col flex-1 justify-center py-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 w-fit mb-7">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span className="text-purple-300 text-[11px] font-medium tracking-widest uppercase">New Password</span>
                        </div>

                        <h1 className="text-5xl font-bold text-white leading-[1.15] tracking-tight mb-5">
                            Almost there,<br />
                            <em className="italic text-purple-300">you're nearly in.</em>
                        </h1>

                        <p className="text-white/50 text-[15px] leading-relaxed max-w-sm mb-12">
                            Choose a strong new password to secure your Belmont account. Make it something memorable but hard to guess.
                        </p>

                        {/* Tips */}
                        <div className="flex flex-col gap-5">
                            {[
                                { icon: '🔐', title: 'At least 8 characters', desc: 'Longer passwords are harder to crack' },
                                { icon: '🔢', title: 'Mix letters & numbers', desc: 'Add symbols for extra strength' },
                                { icon: '🚫', title: 'Avoid personal info', desc: "Don't use your name or birthday" },
                            ].map((tip) => (
                                <div key={tip.title} className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-lg bg-white/7 border border-white/8 flex items-center justify-center shrink-0 text-sm">
                                        {tip.icon}
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[14px] font-semibold text-white/85">{tip.title}</span>
                                        <span className="text-[12px] text-white/38 leading-relaxed">{tip.desc}</span>
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
                        <a
                            href={login().url}
                            className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-400 hover:text-[#1a0a2e] transition-colors mb-10 group"
                        >
                            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 5l-7 7 7 7" />
                            </svg>
                            Back to sign in
                        </a>

                        {/* Lock icon */}
                        <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-8">
                            <svg className="w-6 h-6 text-[#9007EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>

                        {/* Header */}
                        <div className="mb-8">
                            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9007EE] mb-2">Password reset</p>
                            <h2 className="text-[26px] font-bold text-[#0f0a1a] tracking-tight leading-snug mb-2">Set a new password</h2>
                            <p className="text-[14px] text-gray-400 leading-relaxed">
                                Creating a new password for{' '}
                                <span className="text-gray-600 font-medium">{email}</span>
                            </p>
                        </div>

                        <form onSubmit={submit} className="flex flex-col">
                            <div className="flex flex-col gap-5 mb-6">

                                {/* Email — readonly, shown for context */}
                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="email" className="text-[13px] font-medium text-gray-600">Email address</Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            autoComplete="email"
                                            readOnly
                                            className="pr-10 bg-gray-50 text-gray-400"
                                        />
                                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                {/* New Password */}
                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="password" className="text-[13px] font-medium text-gray-600">New password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="new-password"
                                        autoFocus
                                        required
                                        placeholder="At least 8 characters"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                {/* Confirm Password */}
                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="password_confirmation" className="text-[13px] font-medium text-gray-600">Confirm new password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        autoComplete="new-password"
                                        required
                                        placeholder="Repeat your password"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                data-test="reset-password-button"
                                className="w-full h-11 rounded-xl bg-[#1a0a2e] text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#2d1249] hover:-translate-y-px hover:shadow-xl hover:shadow-[#1a0a2e]/25 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                            >
                                {processing && <Spinner />}
                                {processing ? 'Saving password...' : 'Reset password'}
                                {!processing && (
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                )}
                            </button>

                            <p className="text-center text-[13px] text-gray-400 mt-6">
                                Remembered it?{' '}
                                <a href={login().url} className="text-[#9007EE] font-semibold hover:opacity-70 transition-opacity">
                                    Sign in instead
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}