// import { Transition } from '@headlessui/react';
// import { Form, Head } from '@inertiajs/react';
// import { useRef } from 'react';
// import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
// import Heading from '@/components/heading';
// import InputError from '@/components/input-error';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import AppLayout from '@/layouts/app-layout';
// import SettingsLayout from '@/layouts/settings/layout';
// import { edit } from '@/routes/user-password';
// import type { BreadcrumbItem } from '@/types';

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Password settings',
//         href: edit().url,
//     },
// ];

// export default function Password() {
//     const passwordInput = useRef<HTMLInputElement>(null);
//     const currentPasswordInput = useRef<HTMLInputElement>(null);

//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Password settings" />

//             <h1 className="sr-only">Password Settings</h1>

//             <SettingsLayout>
//                 <div className="space-y-6">
//                     <Heading
//                         variant="small"
//                         title="Update password"
//                         description="Ensure your account is using a long, random password to stay secure"
//                     />

//                     <Form
//                         {...PasswordController.update.form()}
//                         options={{
//                             preserveScroll: true,
//                         }}
//                         resetOnError={[
//                             'password',
//                             'password_confirmation',
//                             'current_password',
//                         ]}
//                         resetOnSuccess
//                         onError={(errors) => {
//                             if (errors.password) {
//                                 passwordInput.current?.focus();
//                             }

//                             if (errors.current_password) {
//                                 currentPasswordInput.current?.focus();
//                             }
//                         }}
//                         className="space-y-6"
//                     >
//                         {({ errors, processing, recentlySuccessful }) => (
//                             <>
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="current_password">
//                                         Current password
//                                     </Label>

//                                     <Input
//                                         id="current_password"
//                                         ref={currentPasswordInput}
//                                         name="current_password"
//                                         type="password"
//                                         className="mt-1 block w-full"
//                                         autoComplete="current-password"
//                                         placeholder="Current password"
//                                     />

//                                     <InputError
//                                         message={errors.current_password}
//                                     />
//                                 </div>

//                                 <div className="grid gap-2">
//                                     <Label htmlFor="password">
//                                         New password
//                                     </Label>

//                                     <Input
//                                         id="password"
//                                         ref={passwordInput}
//                                         name="password"
//                                         type="password"
//                                         className="mt-1 block w-full"
//                                         autoComplete="new-password"
//                                         placeholder="New password"
//                                     />

//                                     <InputError message={errors.password} />
//                                 </div>

//                                 <div className="grid gap-2">
//                                     <Label htmlFor="password_confirmation">
//                                         Confirm password
//                                     </Label>

//                                     <Input
//                                         id="password_confirmation"
//                                         name="password_confirmation"
//                                         type="password"
//                                         className="mt-1 block w-full"
//                                         autoComplete="new-password"
//                                         placeholder="Confirm password"
//                                     />

//                                     <InputError
//                                         message={errors.password_confirmation}
//                                     />
//                                 </div>

//                                 <div className="flex items-center gap-4">
//                                     <Button
//                                         disabled={processing}
//                                         data-test="update-password-button"
//                                     >
//                                         Save password
//                                     </Button>

//                                     <Transition
//                                         show={recentlySuccessful}
//                                         enter="transition ease-in-out"
//                                         enterFrom="opacity-0"
//                                         leave="transition ease-in-out"
//                                         leaveTo="opacity-0"
//                                     >
//                                         <p className="text-sm text-neutral-600">
//                                             Saved
//                                         </p>
//                                     </Transition>
//                                 </div>
//                             </>
//                         )}
//                     </Form>
//                 </div>
//             </SettingsLayout>
//         </AppLayout>
//     );
// }


import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/user-password';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: edit().url,
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, put, processing, recentlySuccessful, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(PasswordController.update.url(), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Password settings" />

            <h1 className="sr-only">Password Settings</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Update password"
                        description="Ensure your account is using a long, random password to stay secure"
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">Current password</Label>

                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                name="current_password"
                                type="password"
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="Current password"
                            />

                            <InputError message={errors.current_password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">New password</Label>

                            <Input
                                id="password"
                                ref={passwordInput}
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="New password"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>

                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                            />

                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing} data-test="update-password-button">
                                Save password
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}