// resources/js/Pages/Student/DashboardStudent.tsx
import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourseList from '@/Components/CourseList';
import { User, Course } from '@/types';

interface DashboardStudentProps {
    auth: {
        user: User;
    };
    courses: Course[];
}

const DashboardStudent: React.FC<DashboardStudentProps> = ({ auth, courses }) => {
    const user = auth.user;

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Student Dashboard" />
            <CourseList courses={courses} />
        </AuthenticatedLayout>
    );
};

export default DashboardStudent;
