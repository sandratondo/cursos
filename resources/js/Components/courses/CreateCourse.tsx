import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { User } from '@/types';

interface CreateCourseProps {
    auth: {
        user: User;
    };
}

const CreateCourse: React.FC<CreateCourseProps> = ({ auth }) => {
    const user = auth.user;

    const { data, setData, post, errors } = useForm({
        title: '',
        description: '',
        price: '',
        is_free: false,
        image: null as File | null,
        objetivo: '',
        duracion: '',
    });

    const [dragActive, setDragActive] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('is_free', String(data.is_free));
        formData.append('image', data.image as File);
        formData.append('objetivo', data.objetivo);
        formData.append('duracion', data.duracion);

        post(route('courses.store'), { data: formData });
    };

    return (
            <div>
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
                <div>
                    <label htmlFor="objetivo">Objetivo</label>
                    <input
                        type="text"
                        id="objetivo"
                        value={data.objetivo}
                        onChange={(e) => setData('objetivo', e.target.value)}
                    />
                    {errors.objetivo && <div>{errors.objetivo}</div>}
                </div>
                <div>
                    <label htmlFor="duracion">Duración</label>
                    <input
                        type="text"
                        id="duracion"
                        value={data.duracion}
                        onChange={(e) => setData('duracion', e.target.value)}
                    />
                    {errors.duracion && <div>{errors.duracion}</div>}
                </div>
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
                            <p>Imagen seleccionada: {(data.image as File).name}</p>
                        ) : (
                            <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una.</p>
                        )}
                    </label>
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>    
    );
};

export default CreateCourse;
