import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { User, Course } from '@/types';
import AdminDashboard from '../Components/AdminDashboard';
import InstructorDashboard from '@/Components/Instructor/InstructorDashboard';
import StudentDashboard from '../Components/StudentDashboard';
import CourseList from '@/Components/CourseList';

interface DashboardProps {
    auth: {
        user: User;
    };
    courses: Course[];
}

const Dashboard: React.FC<DashboardProps> = ({ auth, courses }) => {
    const user = auth.user;

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Dashboard" />
            <div>
                {user.role === 'admin' && <AdminDashboard courses={courses} />}
                {user.role === 'instructor' && <InstructorDashboard courses={courses} />}
                {user.role === 'student' && <CourseList courses={courses} />}
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
