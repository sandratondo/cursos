import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateCourse from '@/Components/courses/CreateCourse';
import { User } from '@/types';

interface MainPageProps {
    auth: {
        user: User;
    };
}

const MainPage: React.FC<MainPageProps> = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Gestionar Cursos" />
            <h1>Gestionar Cursos</h1>
            <CreateCourse auth={auth} />
            {/* Aquí puedes agregar los otros componentes como CreateModules y CreateLessons */}
        </AuthenticatedLayout>
    );
};

export default MainPage;
