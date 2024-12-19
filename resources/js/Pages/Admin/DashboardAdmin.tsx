// resources/js/Pages/Admin/DashboardAdmin.tsx
import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminDashboard from '@/Components/Admin/AdminDashboard';
import { User, Course } from '@/types';  // Importa Course desde '@/types'

interface DashboardAdminProps {
    auth: {
        user: User;
    };
    courses: Course[];
    users: User[];
}

const DashboardAdmin: React.FC<DashboardAdminProps> = ({ auth, courses, users }) => {
    const user = auth.user;

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Admin Dashboard" />
            <AdminDashboard courses={courses} users={users} />
        </AuthenticatedLayout>
    );
};

export default DashboardAdmin;
