import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Course, Lesson, User } from '@/types';
import ContactUs from '@/Components/ContactUs';
interface CoursePageProps {
    course: Course & { lessons: Lesson[] };
    isEnrolled: boolean;
    user: User;
}

export default function CoursesLanding({ course, isEnrolled, user }: CoursePageProps) {
    const [activeSection, setActiveSection] = useState<string>('intro');

    const handleEnroll = () => {
        //pasarela pagos aqui
        console.log('Inscribirse al curso', course.id);
    };

    const handleAccess = () => {
        // Redirigir al usuario al curso
        window.location.href = `/courses/${course.id}/lessons`;
    };

    const toggleSection = (section: string) => {
        setActiveSection(section);
    };

    return (
        <AuthenticatedLayout user={user}>
            <div className="container mx-auto py-8 px-4">
                <Head title={course.title} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-8 rounded-lg">
                    {/* Columna Izquierda */}
                    <div className="md:col-span-2 space-y-6 order-1 md:order-2">
                        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                        <p className="text-lg text-gray-700">{course.description}</p>

                        <div className="flex space-x-6 justify-center bg-gray-100 p-4 rounded-md mt-6">
                            <button
                                onClick={() => toggleSection('intro')}
                                className="btn-nav py-2 px-4 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-100 transition duration-300"
                            >
                                Introducción
                            </button>
                            <button
                                onClick={() => toggleSection('temario')}
                                className="btn-nav py-2 px-4 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-100 transition duration-300"
                            >
                                Temario
                            </button>
                            <button
                                onClick={() => toggleSection('dudas')}
                                className="btn-nav py-2 px-4 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-100 transition duration-300"
                            >
                                Dudas
                            </button>
                        </div>

                        {/* Secciones */}
                        <section id="intro" className={`section-container ${activeSection === 'intro' ? 'block' : 'hidden'}`}>
                            <h2 className="text-xl font-semibold">¿Qué aprenderás?</h2>
                            <ul className="list-disc ml-5 space-y-2">
                                <li>Plataformas de Inversión: TradeStation y TradingView</li>
                                <li>Introducción al Stock Market</li>
                                <li>Análisis Fundamental</li>
                            </ul>
                        </section>

                        <section id="temario" className={`section-container ${activeSection === 'temario' ? 'block' : 'hidden'}`}>
                            <h2 className="text-xl font-semibold">Temario</h2>
                            {course.lessons.map((lesson) => (
                                <div key={lesson.id} className="border-b pb-4 mb-4">
                                    <h3 className="text-lg font-semibold">{lesson.title}</h3>
                                    <p className="text-gray-600">{lesson.description}</p>
                                </div>
                            ))}
                        </section>

                                        {/* Formulario de Dudas */}
                        <section id="dudas" className={`mt-8 section-container ${activeSection === 'dudas' ? 'block' : 'hidden'}`}>
                            <h2 className="text-xl font-semibold">Contacta con nosotros</h2>
                                <ContactUs user={user} courses={[course]}/>
                        </section>
                    </div>

                    {/* Columna Derecha */}
                    <div className="md:col-span-1 space-y-4 order-2 md:order-1">
                        <img
                            src="https://import.cdn.thinkific.com/675734/Ct0jaXHfRyaBhFUCuXHF_abacusexperience%20new%202023%20big%20copy%202.jpg"
                            alt="Course"
                            className="w-full rounded-lg shadow-lg"
                        />


                        {isEnrolled ? (
                            <button onClick={handleAccess} className="btn-primary w-full py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
                                Acceder al Curso
                            </button>
                        ) : (
                            <div>
                                <p className="text-lg font-bold">
                                    Precio: {(course.price && course.price > 0) ? `$${course.price.toFixed(2)}` : 'Gratis'}
                                </p>
                                <button onClick={handleEnroll} className="btn-primary w-full py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
                                    Inscribirse ahora
                                </button>
                            </div>
                        )}

                        <div className="p-4 bg-white border rounded-lg shadow-md">
                            <p className="font-semibold">Duración:</p>
                            <p>80 horas</p>
                            <p className="font-semibold">Módulos:</p>
                            <p>{course.lessons.length} Módulos</p>
                        </div>

                    </div>
                </div>


            </div>
        </AuthenticatedLayout>
    );
}
