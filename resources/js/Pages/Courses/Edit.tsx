// resources/js/Pages/Courses/Edit.tsx
import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Course } from '@/types';

interface EditCourseProps {
    course: Course;
}

const EditCourse: React.FC<EditCourseProps> = ({ course }) => {
    const { data, setData, put, errors } = useForm({
        title: course.title || '',
        description: course.description || '',
        price: course.price || '',
        is_free: course.is_free || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('courses.update', course.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Editar Curso" />
            <h1>Editar Curso</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    {errors.title && <div>{errors.title}</div>}
                </div>
                <div>
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    {errors.description && <div>{errors.description}</div>}
                </div>
                <div>
                    <label htmlFor="price">Precio</label>
                    <input
                        type="text"
                        id="price"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                    />
                    {errors.price && <div>{errors.price}</div>}
                </div>
                <div>
                    <label htmlFor="is_free">Gratis</label>
                    <input
                        type="checkbox"
                        id="is_free"
                        checked={data.is_free}
                        onChange={(e) => setData('is_free', e.target.checked)}
                    />
                    {errors.is_free && <div>{errors.is_free}</div>}
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </AuthenticatedLayout>
    );
};

export default EditCourse;
