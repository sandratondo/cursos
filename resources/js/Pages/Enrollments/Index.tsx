import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout'; // Ajusta la ruta según sea necesario
import { User } from '@/types'; // Asegúrate de importar la interfaz User

interface Course {
  id: number;
  title: string;
  description: string;
  image_url?: string;
}

interface Enrollment {
  id: number;
  course: Course;
  created_at: string;
  status: 'in_progress' | 'completed' | 'expired';
}

interface EnrollmentsProps {
  auth: {
    user: User; // Usa la interfaz User aquí
  };
  enrollments: Enrollment[];
}

const Index: React.FC<EnrollmentsProps> = ({ auth, enrollments }) => {
  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="container mx-auto mt-4">
        <h1 className="text-3xl font-bold mb-6">Mis Inscripciones</h1>
        
        {enrollments.length === 0 ? (
          <p className="text-gray-700 text-lg">No estás inscrito en ningún curso actualmente.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img 
                  src={enrollment.course.image_url || 'https://via.placeholder.com/150'} 
                  className="w-full h-48 object-cover" 
                  alt={enrollment.course.title} 
                />
                <div className="p-4">
                  <h5 className="text-lg font-bold mb-2">{enrollment.course.title}</h5>
                  <p className="text-gray-700 mb-3">{enrollment.course.description}</p>
                  <p className="text-gray-600 text-sm mb-1">
                    <strong>Fecha de inscripción:</strong> {new Date(enrollment.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>Estado:</strong> 
                    {enrollment.status === 'in_progress' && <span className="text-blue-500">En progreso</span>}
                    {enrollment.status === 'completed' && <span className="text-green-500">Completado</span>}
                    {enrollment.status === 'expired' && <span className="text-red-500">Expirado</span>}
                  </p>
                  
                  <Link href={`/courses/${enrollment.course.id}/lessons`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Ver curso
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
