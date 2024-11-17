// resources/js/Pages/Dashboard.tsx
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout' // Asegúrate de importar AuthenticatedLayout
import { User, Course } from '@/types'; // Asegúrate de que las interfaces estén importadas
import CourseList from '../Components/CourseList'; // Asegúrate de que la ruta sea correcta

interface DashboardProps {
    auth: {
        user: User; // Usa la interfaz User aquí
    };
    courses: Course[]; // Asegúrate de que `Course` esté definido correctamente
}

export default function Dashboard({ auth, courses }: DashboardProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div>
                <h2>Mis Cursos sisiisi</h2>
                <CourseList courses={courses} />
            </div>
        </AuthenticatedLayout>
    );
}