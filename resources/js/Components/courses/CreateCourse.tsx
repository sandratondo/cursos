import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { showNotification } from '@/app';
import { User } from '@/types';

interface CreateCourseProps {
    auth: {
        user: User;
    };
}

const CreateCourse: React.FC<CreateCourseProps> = ({ auth }) => {
    const user = auth.user;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        is_free: false,
        image: null as File | null,
        objetivo: '',
        duracion: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [dragActive, setDragActive] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? !!checked : value,
        });
    };
    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({ ...formData, image: e.target.files[0] });
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
            setFormData({ ...formData, image: e.dataTransfer.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
    
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('is_free', formData.is_free ? '1' : '0'); // Envía como '1' o '0'
        if (formData.image) {
            data.append('image', formData.image);
        }
        data.append('objetivo', formData.objetivo);
        data.append('duracion', formData.duracion);
    
        try {
            const response = await axios.post('/courses', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            showNotification('success', response.data.message);
            console.log(response.data);
        } catch (error: any) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                showNotification('error', error.response?.data?.message || 'Ocurrió un error inesperado');
            }
        }
    };
    

    return (
        <div>
            <Head title="Crear Curso" />
            <h1>Crear Curso</h1>
            <div id="notification" style={{display: 'none'}}></div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    {errors.title && <div>{errors.title}</div>}
                </div>
                <div>
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    {errors.description && <div>{errors.description}</div>}
                </div>
                <div>
                    <label htmlFor="price">Precio</label>
                    <input
                        type="text"
                        id="price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                    {errors.price && <div>{errors.price}</div>}
                </div>
                <div>
                    <label htmlFor="is_free">Gratis</label>
                    <input
                        type="checkbox"
                        id="is_free"
                        checked={formData.is_free}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="objetivo">Objetivo</label>
                    <input
                        type="text"
                        id="objetivo"
                        value={formData.objetivo}
                        onChange={handleInputChange}
                    />
                    {errors.objetivo && <div>{errors.objetivo}</div>}
                </div>
                <div>
                    <label htmlFor="duracion">Duración</label>
                    <input
                        type="text"
                        id="duracion"
                        value={formData.duracion}
                        onChange={handleInputChange}
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
                        {formData.image ? (
                            <p>Imagen seleccionada: {formData.image.name}</p>
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
