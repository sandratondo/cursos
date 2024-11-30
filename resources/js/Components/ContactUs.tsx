import React, { useState } from 'react';
import axios from 'axios';
import { showNotification } from '../app';
import { User, Course } from '../types';

interface ContactUsProps {
    user?: User;
    courses?: Course[];
}

const ContactUs: React.FC<ContactUsProps> = ({ user, courses = [] }) => {
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [message, setMessage] = useState('');
    const [courseId, setCourseId] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post('/contact', {
                name,
                email,
                message,
                course_id: courseId,
            });

            showNotification('success', 'Comentario enviado con éxito');
            setName(user ? user.name : '');
            setEmail(user ? user.email : '');
            setMessage('');
            setCourseId('');
        } catch (err) {
            showNotification('error', 'Error enviando el comentario');
            console.error(err);
        }
    };

    return (
        <div>
            <div id="notification" style={{display: 'none'}}></div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full border rounded-lg p-4"
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="w-full border rounded-lg p-4"
                />
                {courses.length > 0 && (
                    <select
                        name="course_id"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        className="w-full border rounded-lg p-4"
                    >
                        <option value="">Selecciona un curso</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.title}</option>
                        ))}
                    </select>
                )}
                <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tu mensaje"
                    className="w-full border rounded-lg p-4"
                ></textarea>
                <button
                    type="submit"
                    className="btn-primary w-full py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
