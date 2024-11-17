<?php
namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str; // Importar la clase Str
use Illuminate\Support\Facades\Hash; // Importa Hash

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Encuentra al usuario por correo electrónico o crea uno nuevo
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                // Si el usuario existe, actualizar su google_id y avatar si no está configurado
                $user->update([
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                ]);
            } else {
                // Si el usuario no existe, créalo
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'password' => Hash::make(Str::random(16)) // Genera una contraseña aleatoria
                ]);
            }

            // Iniciar sesión
            Auth::login($user, true);

            return redirect()->intended('dashboard');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
}
