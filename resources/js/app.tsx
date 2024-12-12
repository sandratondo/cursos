import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import CommentList from './Components/CommentList';



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Función global para mostrar notificaciones
export function showNotification(type: 'success' | 'error' | 'warning', message: string) {
    const notificationDiv = document.getElementById('notification');
    if (notificationDiv) {
        notificationDiv.className = ''; // Limpiar clases anteriores
        notificationDiv.textContent = message;

        // Añadir clase en base al tipo de notificación
        if (type === 'error') {
            notificationDiv.classList.add('error-box');
        } else if (type === 'success') {
            notificationDiv.classList.add('success-box');
        } else if (type === 'warning') {
            notificationDiv.classList.add('warning-box');
        }

        notificationDiv.style.display = 'block';
        notificationDiv.scrollIntoView({ behavior: 'smooth' });
        // Ocultar la notificación después de 5 segundos
        setTimeout(() => {
            notificationDiv.style.display = 'none';
        }, 7000);


    }
}


// Hacer la función accesible globalmente
window.showNotification = showNotification;
console.log('showNotification ha sido registrado en window');

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
