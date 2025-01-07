// Components/courses/CreateModules.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface CreateModulesProps {
    lessonId: number;
}

const CreateModules: React.FC<CreateModulesProps> = ({ lessonId }) => {
    const [formData, setFormData] = useState({
        title: '',
        type: 'video',
        url: '',
        description: '',
        order: 0,
    });

    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/lessons/${lessonId}/modules`, formData);
            setMessage(response.data.message);
            setFormData({
                title: '',
                type: 'video',
                url: '',
                description: '',
                order: 0,
            });
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Error al crear el módulo');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold">Crear Módulo</h2>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-medium">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="type" className="block font-medium">Tipo</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    >
                        <option value="video">Video</option>
                        <option value="article">Artículo</option>
                        <option value="quiz">Quiz</option>
                        <option value="assignment">Tarea</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="url" className="block font-medium">URL</label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block font-medium">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="order" className="block font-medium">Orden</label>
                    <input
                        type="number"
                        id="order"
                        name="order"
                        value={formData.order}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Crear Módulo
                </button>
            </form>
        </div>
    );
};

export default CreateModules;
