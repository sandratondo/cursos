import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

interface Lesson {
    id: number;
    title: string;
    description: string;
}

interface Course {
    id: number;
    title: string;
    lessons: Lesson[];
}

interface LessonsPageProps {
    course: Course;
}

const Lessons: React.FC = () => {
    const { course } = usePage().props as unknown as LessonsPageProps;

    return (
        <AuthenticatedLayout>
            <Head title={course.title} />
            <div>
                <h1>{course.title}</h1>
                <ul>
                    {course.lessons.map(lesson => (
                        <li key={lesson.id}>{lesson.title}: {lesson.description}</li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
};

export default Lessons;
