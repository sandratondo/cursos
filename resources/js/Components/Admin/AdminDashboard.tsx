// resources/js/Components/Admin/AdminDashboard.tsx
import React from 'react';
import { Course, User } from '@/types';

interface AdminDashboardProps {
    courses: Course[];
    users: User[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ courses, users }) => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Courses</h2>
                {/* Muestra la lista de cursos */}
            </div>
            <div>
                <h2>Users</h2>
                {/* Muestra la lista de usuarios */}
            </div>
        </div>
    );
};

export default AdminDashboard;
