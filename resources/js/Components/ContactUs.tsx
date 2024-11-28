import React, { useState } from 'react';
import axios from 'axios';
import { showNotification } from '../app';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Realizar la solicitud POST
            await axios.post('/contact', {
                name,
                email,
                message,
            });

            // Si la solicitud es exitosa, limpiar el formulario y mostrar notificación de éxito
            showNotification('success', 'Comentario enviado con éxito');
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            // Mostrar notificación de error si la solicitud falla
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
