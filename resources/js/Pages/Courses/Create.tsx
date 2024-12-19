// resources/js/Pages/Courses/Create.tsx
import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const CreateCourse: React.FC = () => {
    const { data, setData, post, errors } = useForm({
        title: '',
        description: '',
        price: '',
        is_free: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('courses.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Crear Curso" />
            <h1>Crear Curso</h1>
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
                <button type="submit">Crear</button>
            </form>
        </AuthenticatedLayout>
    );
};

export default CreateCourse;
