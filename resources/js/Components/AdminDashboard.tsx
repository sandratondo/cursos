// resources/js/Components/AdminDashboard.tsx
import React from 'react';
import { Course } from '@/types';

interface AdminDashboardProps {
    courses: Course[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ courses }) => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>{course.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
