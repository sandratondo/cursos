<?php
// database/seeders/RoleSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RoleSeeder extends Seeder
{
    public function run()
    {
        // Crear roles si no existen
        $roles = ['admin', 'instructor', 'student'];
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // Crear permisos si no existen
        $permissions = ['create course', 'edit course', 'delete course', 'view course'];
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Asignar permisos a roles
        $roleAdmin = Role::where('name', 'admin')->first();
        $roleInstructor = Role::where('name', 'instructor')->first();
        $roleStudent = Role::where('name', 'student')->first();

        $roleAdmin->syncPermissions(Permission::all());
        $roleInstructor->syncPermissions(['create course', 'edit course', 'delete course', 'view course']);
        $roleStudent->syncPermissions(['view course']);

        // Asignar rol de instructor a un usuario específico (ID 6)
        $user = User::find(6);
        if ($user && !$user->hasRole('instructor')) {
            $user->assignRole('instructor');
        }
    }
}
