import React, { useState } from 'react';
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
    const [currentStep, setCurrentStep] = useState(1);

    // Función para cambiar de paso
    const handleStepChange = (step: number) => {
        setCurrentStep(step);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <h1 className="text-3xl font-bold mb-6">Gestión de Cursos</h1>

            {/* Barra de navegación por pasos */}
            <div className="flex justify-between items-center mb-8">
                {['Crear Curso', 'Crear Lecciones', 'Crear Módulos'].map((label, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    return (
                        <div
                            key={stepNumber}
                            onClick={() => handleStepChange(stepNumber)}
                            className={`cursor-pointer text-center w-1/3 p-2 border rounded-full ${
                                isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                        >
                            <span>{label}</span>
                        </div>
                    );
                })}
            </div>

            {/* Contenido de cada paso */}
            {currentStep === 1 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Paso 1: Crear Curso</h2>
                    <CreateCourse auth={auth} />
                </div>
            )}
            {currentStep === 2 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Paso 2: Crear Lecciones</h2>
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
                </div>
            )}
            {currentStep === 3 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Paso 3: Crear Módulos</h2>
                    {lessons.length > 0 ? (
                        lessons.map((lesson) => (
                            <div key={lesson.id} className="mb-8">
                                <h3 className="font-semibold">{lesson.title}</h3>
                                <CreateModules lessonId={lesson.id} />
                                {modules[lesson.id]?.length > 0 ? (
                                    <ul className="space-y-2">
                                        {modules[lesson.id].map((module) => (
                                            <li key={module.id} className="p-2 bg-gray-200 rounded-md">
                                                <h4 className="font-semibold">{module.title}</h4>
                                                <p>Tipo: {module.type}</p>
                                                {module.description && <p>{module.description}</p>}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No hay módulos disponibles.</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>
                            <p className="mb-4 text-gray-600">Primero necesitas crear una lección para asociar módulos.</p>
                            {/* Formulario sin lección asociada */}
                            <CreateModules lessonId={0} />
                        </div>
                    )}
                </div>
            )}

            {/* Botones de navegación */}
            <div className="flex justify-between mt-8">
                <button
                    className="p-2 bg-gray-300 rounded disabled:opacity-50"
                    disabled={currentStep === 1}
                    onClick={() => handleStepChange(currentStep - 1)}
                >
                    Anterior
                </button>
                <button
                    className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    disabled={currentStep === 3}
                    onClick={() => handleStepChange(currentStep + 1)}
                >
                    Siguiente
                </button>
            </div>
        </AuthenticatedLayout>
    );
};

export default MainPage;
