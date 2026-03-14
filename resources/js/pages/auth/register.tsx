import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { useI18n, I18nProvider } from '@/contexts/I18nContext';

export default function Register() {
    return (
        <I18nProvider>
            <RegisterInner />
        </I18nProvider>
    );
}

function RegisterInner() {
    const { t } = useI18n();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

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
                        <span className="text-white/90 font-semibold text-[15px] tracking-tight">Belmont Dry Cleaners</span>
                    </div>

                    {/* Hero */}
                    <div className="relative z-10 flex flex-col flex-1 justify-center py-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/25 w-fit mb-7">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            <span className="text-green-300 text-[11px] font-medium tracking-widest uppercase">
                                {t('auth.register_badge')}
                            </span>
                        </div>

                        <h1 className="text-5xl font-bold text-white leading-[1.15] tracking-tight mb-5">
                            {t('auth.register_tagline')}<br />
                            <em className="italic text-green-300">{t('auth.register_tagline_em')}</em>
                        </h1>

                        <p className="text-white/50 text-[15px] leading-relaxed max-w-sm mb-12">
                            {t('auth.register_body')}
                        </p>
                    </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
                    <div className="w-full max-w-[420px] py-4">

                        {/* Back to home */}
                        <a href="/" className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-400 hover:text-[#1a0a2e] transition-colors mb-8 group">
                            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 5l-7 7 7 7" />
                            </svg>
                            {t('auth.back_home')}
                        </a>

                        {/* Header */}
                        <div className="mb-8">
                            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9007EE] mb-2">
                                {t('auth.get_started')}
                            </p>
                            <h2 className="text-[26px] font-bold text-[#0f0a1a] tracking-tight leading-snug mb-2">
                                {t('auth.register_title')}
                            </h2>
                            <p className="text-[14px] text-gray-400 leading-relaxed">
                                {t('auth.register_subtitle')}
                            </p>
                        </div>

                        <form onSubmit={submit} className="flex flex-col">
                            <div className="flex flex-col gap-5 mb-6">

                                {/* Name */}
                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="name" className="text-[13px] font-medium text-gray-600">
                                        {t('auth.full_name')}
                                    </Label>
                                    <Input
                                        id="name" type="text" name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required autoFocus tabIndex={1}
                                        autoComplete="name"
                                        placeholder={t('auth.full_name_placeholder')}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="email" className="text-[13px] font-medium text-gray-600">
                                        {t('auth.email')}
                                    </Label>
                                    <Input
                                        id="email" type="email" name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required tabIndex={2}
                                        autoComplete="email"
                                        placeholder={t('auth.email_placeholder')}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password */}
                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="password" className="text-[13px] font-medium text-gray-600">
                                        {t('auth.password')}
                                    </Label>
                                    <Input
                                        id="password" type="password" name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required tabIndex={3}
                                        autoComplete="new-password"
                                        placeholder={t('auth.password_placeholder')}
                                    />
                                    <p className="text-[11px] text-gray-400 mt-1">{t('auth.password_hint')}</p>
                                    <InputError message={errors.password} />
                                </div>

                                {/* Confirm Password */}
                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="password_confirmation" className="text-[13px] font-medium text-gray-600">
                                        {t('auth.confirm_password')}
                                    </Label>
                                    <Input
                                        id="password_confirmation" type="password" name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required tabIndex={4}
                                        autoComplete="new-password"
                                        placeholder={t('auth.confirm_placeholder')}
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>

                            {/* Terms */}
                            <p className="text-[12px] text-gray-400 leading-relaxed text-center mb-5">
                                {t('auth.terms_agree')}{' '}
                                <a href="/terms" className="text-[#9007EE] font-medium hover:opacity-70 transition-opacity">
                                    {t('auth.terms_link')}
                                </a>
                                {' '}{t('auth.terms_and')}{' '}
                                <a href="/privacy-policy" className="text-[#9007EE] font-medium hover:opacity-70 transition-opacity">
                                    {t('auth.privacy_link')}
                                </a>.
                            </p>

                            {/* Submit */}
                            <button
                                type="submit" tabIndex={5} disabled={processing}
                                className="w-full h-11 rounded-xl bg-[#1a0a2e] text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#2d1249] hover:-translate-y-px hover:shadow-xl hover:shadow-[#1a0a2e]/25 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mb-5 cursor-pointer"
                            >
                                {processing && <Spinner />}
                                {processing ? t('auth.creating_account') : t('auth.create_account')}
                                {!processing && (
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                )}
                            </button>

                            <p className="text-center text-[13px] text-gray-400">
                                {t('auth.have_account')}{' '}
                                <TextLink href={login()} className="text-[#9007EE] font-semibold hover:opacity-70 transition-opacity" tabIndex={6}>
                                    {t('auth.sign_in')}
                                </TextLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}