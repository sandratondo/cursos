import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Course } from '@/types';

interface CreateLessonProps {
    course: Course;
}

const CreateLesson: React.FC<CreateLessonProps> = ({ course }) => {
    const { data, setData, post, errors } = useForm({
        title: '',
        description: '',
        order: 0,
        video_blob: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.name as any, e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('video_blob', e.target.files?.[0] || null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('lessons.store', course.id));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Título</label>
                <input
                    type="text"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                />
                {errors.title && <div>{errors.title}</div>}
            </div>

            <div>
                <label htmlFor="description">Descripción</label>
                <textarea
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                />
                {errors.description && <div>{errors.description}</div>}
            </div>

            <div>
                <label htmlFor="order">Orden</label>
                <input
                    type="number"
                    name="order"
                    value={data.order}
                    onChange={handleChange}
                />
                {errors.order && <div>{errors.order}</div>}
            </div>

            <div>
                <label htmlFor="video_blob">Video</label>
                <input
                    type="file"
                    name="video_blob"
                    onChange={handleFileChange}
                />
                {errors.video_blob && <div>{errors.video_blob}</div>}
            </div>

            <button type="submit">Crear Lección</button>
        </form>
    );
};

export default CreateLesson;
