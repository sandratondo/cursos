import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Course, User } from '@/types';

interface EditCourseProps {
    auth: {
        user: User;
    };
    course: Course;
}

const EditCourse: React.FC<EditCourseProps> = ({ course, auth }) => {
    const user = auth.user;

    const { data, setData, post, errors } = useForm({
        title: course.title || '',
        description: course.description || '',
        price: course.price || '',
        is_free: course.is_free || false,
        image: null as File | null,
        objetivo: course.objetivo || '',
        duracion: course.duracion || '',
        expires_at: course.expires_at || '',
    });

    const [dragActive, setDragActive] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price.toString());
        formData.append('is_free', data.is_free ? '1' : '0');
        formData.append('objetivo', data.objetivo);
        formData.append('duracion', data.duracion.toString());
        formData.append('expires_at', data.expires_at);
        formData.append('_method', 'PUT'); // Esto es crucial para una solicitud PUT
        if (data.image) {
            formData.append('image', data.image);
        }

        post(route('courses.update', course.id), {
            data: formData,
            onSuccess: () => console.log('Course updated successfully'),
            onError: (errors) => console.log(errors),
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('image', e.target.files[0]);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setData('image', e.dataTransfer.files[0]);
        }
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Editar Curso" />
            <div className="container my-10 py-8 px-4 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Editar Curso</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.title && <div className="text-red-600 text-sm">{errors.title}</div>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                        <input
                            type="text"
                            id="price"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.price && <div className="text-red-600 text-sm">{errors.price}</div>}
                    </div>
                    <div>
                        <label htmlFor="is_free" className="block text-sm font-medium text-gray-700">Gratis</label>
                        <input
                            type="checkbox"
                            id="is_free"
                            checked={data.is_free}
                            onChange={(e) => setData('is_free', e.target.checked)}
                            className="mt-1 block"
                        />
                        {errors.is_free && <div className="text-red-600 text-sm">{errors.is_free}</div>}
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen</label>
                        <div
                            className={`mt-2 p-4 border-2 ${dragActive ? 'border-blue-500' : 'border-gray-300'} rounded-md`}
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                id="image"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label htmlFor="image" className="cursor-pointer">
                                {data.image ? (
                                    <p>{data.image.name}</p>
                                ) : (
                                    <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una.</p>
                                )}
                            </label>
                        </div>
                        {errors.image && <div className="text-red-600 text-sm">{errors.image}</div>}
                    </div>
                    <div>
                        <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700">Objetivo</label>
                        <textarea
                            id="objetivo"
                            value={data.objetivo}
                            onChange={(e) => setData('objetivo', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.objetivo && <div className="text-red-600 text-sm">{errors.objetivo}</div>}
                    </div>
                    <div>
                        <label htmlFor="duracion" className="block text-sm font-medium text-gray-700">Duración</label>
                        <input
                            type="number"
                            id="duracion"
                            value={data.duracion}
                            onChange={(e) => setData('duracion', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.duracion && <div className="text-red-600 text-sm">{errors.duracion}</div>}
                    </div>
                    <div>
                        <label htmlFor="expires_at" className="block text-sm font-medium text-gray-700">Fecha de Expiración</label>
                        <input
                            type="datetime-local"
                            id="expires_at"
                            value={data.expires_at}
                            onChange={(e) => setData('expires_at', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.expires_at && <div className="text-red-600 text-sm">{errors.expires_at}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Creado el</label>
                        <p>{new Date(course.created_at).toLocaleString()}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Última actualización</label>
                        <p>{new Date(course.updated_at).toLocaleString()}</p>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Actualizar
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditCourse;
