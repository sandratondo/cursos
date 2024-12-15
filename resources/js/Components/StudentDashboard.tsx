// resources/js/Components/StudentDashboard.tsx
import React from 'react';
import { Course } from '@/types';

interface StudentDashboardProps {
    courses: Course[];
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ courses }) => {
    return (
        <div>
            <h2>Student Dashboard</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>{course.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentDashboard;
