// resources/js/Pages/Instructor/DashboardInstructor.tsx
import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InstructorDashboard from '@/Components/InstructorDashboard';
import { User, Course } from '@/types';

interface DashboardInstructorProps {
    auth: {
        user: User;
    };
    courses: Course[];
}

const DashboardInstructor: React.FC<DashboardInstructorProps> = ({ auth, courses }) => {
    const user = auth.user;

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Instructor Dashboard pages" />
            <InstructorDashboard courses={courses} />
        </AuthenticatedLayout>
    );
};

export default DashboardInstructor;
