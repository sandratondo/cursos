import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateCourse from '@/Components/courses/CreateCourse';
import CreateLesson from '@/Components/courses/CreateLesson';
import CreateModules from '@/Components/courses/CreateModules';
import { User, Course, Lesson, Module } from '@/types';

interface MainPageProps {
    auth: {
        user: User;
    };
    course: Course;
    lessons: Lesson[];
    modules: Record<number, Module[]>; 
}

const MainPage: React.FC<MainPageProps> = ({ auth, course, lessons = [], modules }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                <h1 className="text-3xl font-bold mb-6">Hola desde MainPage</h1>
                <p>Este es un mensaje de prueba para verificar el renderizado.</p>
            </div>

            <CreateCourse auth={auth} />
            <section id="lessons" className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Lecciones</h2>
                <CreateLesson course={course} />
                {lessons.length > 0 ? (
                    <ul className="space-y-2">
                        {lessons.map((lesson) => (
                            <li key={lesson.id} className="p-2 bg-gray-100 rounded-md">
                                <h3 className="font-semibold">{lesson.title}</h3>
                                <p>{lesson.description || 'Sin descripción'}</p>
                                <span className="text-sm text-gray-500">Orden: {lesson.order}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay lecciones disponibles.</p>
                )}
            </section>

            {lessons.map((lesson) => (
                <div key={lesson.id} className="mb-8">
                    <h3 className="font-semibold">{lesson.title}</h3>
                    <CreateModules lessonId={lesson.id} />

                    <p>Lección ID: {lesson.id}</p>
                    <p>Módulos para esta lección:</p>
                    <pre>{JSON.stringify(modules[lesson.id], null, 2)}</pre>

                    {modules[lesson.id]?.map((module) => (
                        <div key={module.id} className="p-2 bg-gray-200 rounded-md">
                            <h4 className="font-semibold">{module.title}</h4>
                            <p>Tipo: {module.type}</p>
                            {module.description && <p>{module.description}</p>}
                        </div>
                    ))}
                </div>
            ))}


        </AuthenticatedLayout>
    );
};

export default MainPage;
