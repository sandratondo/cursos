// resources/js/Components/InstructorDashboard.tsx
import React from 'react';
import { Course } from '@/types';

interface InstructorDashboardProps {
    courses: Course[];
}

const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ courses }) => {
    return (
        <div>
            <h2>Instructor Dashboard</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>{course.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default InstructorDashboard;
