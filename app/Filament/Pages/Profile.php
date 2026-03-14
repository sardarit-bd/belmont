<?php

namespace App\Filament\Pages;

use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Actions;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use UnitEnum;


class Profile extends Page
{
    use InteractsWithForms;

    protected static string | BackedEnum | null $navigationIcon  = 'heroicon-o-user-circle';
    protected static ?string $navigationLabel = 'Profile';
    protected static ?string $title           = 'Profile Settings';
    protected static ?string $slug            = 'profile-settings';
    protected static ?int    $navigationSort  = 1;
    protected static string | UnitEnum | null $navigationGroup = 'Profile Settings';

    protected string $view = 'filament.pages.profile';

    public ?array $profileData  = [];
    public ?array $passwordData = [];

    public function mount(): void
    {
        $user = Auth::user();

        $this->profileForm->fill([
            'name'  => $user->name,
            'email' => $user->email,
        ]);

        $this->passwordForm->fill();
    }

    protected function getForms(): array
    {
        return [
            'profileForm',
            'passwordForm',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Profile Form
    |--------------------------------------------------------------------------
    */

    public function profileForm(Schema $form): Schema
    {
        return $form
            ->schema([
                Section::make('Personal Information')
                    ->description('Update your name and email address.')
                    ->icon('heroicon-o-user')
                    ->schema([
                        TextInput::make('name')
                            ->label('Full Name')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('email')
                            ->label('Email Address')
                            ->email()
                            ->required()
                            ->maxLength(255)
                            ->unique(
                                table: 'users',
                                column: 'email',
                                ignorable: Auth::user()
                            ),
                    ]),

                Actions::make([
                    Action::make('saveProfile')
                        ->label('Save Profile')
                        ->action('updateProfile'),
                ])->alignEnd(),
            ])
            ->statePath('profileData');
    }

    public function updateProfile(): void
    {
        $data = $this->profileForm->getState();
        $user = Auth::user();

        $user->update([
            'name'  => $data['name'],
            'email' => $data['email'],
        ]);

        Notification::make()
            ->title('Profile updated successfully.')
            ->success()
            ->send();
    }

    /*
    |--------------------------------------------------------------------------
    | Password Form
    |--------------------------------------------------------------------------
    */

    public function passwordForm(Schema $form): Schema
    {
        return $form
            ->schema([
                Section::make('Change Password')
                    ->description('Leave blank if you do not want to change your password.')
                    ->icon('heroicon-o-lock-closed')
                    ->schema([
                        TextInput::make('current_password')
                            ->label('Current Password')
                            ->password()
                            ->revealable()
                            ->required()
                            ->currentPassword(),

                        TextInput::make('password')
                            ->label('New Password')
                            ->password()
                            ->revealable()
                            ->required()
                            ->rule(Password::defaults())
                            ->autocomplete('new-password'),

                        TextInput::make('password_confirmation')
                            ->label('Confirm New Password')
                            ->password()
                            ->revealable()
                            ->required()
                            ->same('password'),
                    ]),

                Actions::make([
                    Action::make('changePassword')
                        ->label('Change Password')
                        ->color('warning')
                        ->action('updatePassword'),
                ])->alignEnd(),
            ])
            ->statePath('passwordData');
    }

    public function updatePassword(): void
    {
        $data = $this->passwordForm->getState();
        $user = Auth::user();

        $user->update([
            'password' => Hash::make($data['password']),
        ]);

        $this->passwordForm->fill();

        Notification::make()
            ->title('Password changed successfully.')
            ->success()
            ->send();
    }
}