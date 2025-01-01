import React, { useState } from 'react';
import { Course } from '@/types';
import axios from 'axios';

interface InstructorDashboardProps {
    courses: Course[];
}

const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ courses }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

    const getImageUrl = (imageUrl: string | null | undefined): string => {
        if (imageUrl) {
            return `/storage/${imageUrl}`; // Asegúrate de que esto coincida con la ruta de tus imágenes en storage
        }
        return 'https://via.placeholder.com/150';
    };

    const handleDeleteClick = (course: Course) => {
        setCourseToDelete(course);
        setShowPopup(true);
    };

    const confirmDelete = async () => {
        if (courseToDelete) {
            try {
                await axios.delete(`/courses/${courseToDelete.id}`);
                // Aquí puedes manejar la actualización de la lista de cursos después de la eliminación.
                window.location.reload(); // Recargar la página para reflejar los cambios
            } catch (error) {
                console.error('Error deleting course:', error);
            } finally {
                setShowPopup(false);
                setCourseToDelete(null);
            }
        }
    };

    return (
        <div>
            <h1>Instructor Dashboard</h1>
            <div id="notification" style={{ display: 'none' }}></div>
            <div className="mb-4">
                <a href="/courses/main" className="btn btn-success">Crear Curso</a>
            </div>
            <div className="row">
                {courses.map(course => (
                    <div className="col-md-4" key={course.id}>
                        <div className="card mb-4">
                            <img src={getImageUrl(course.image_url)} className="card-img-top max-h-60 object-cover" alt={course.title} />
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.description}</p>
                                <p className="card-text">{course.is_free ? 'Gratis' : `$${course.price}`}</p>
                                <a href={`/courses/${course.id}`} className="btn btn-primary">Ver más</a>
                                <a href={`/courses/${course.id}/edit`} className="btn btn-warning ml-2">Editar</a>
                                <button onClick={() => handleDeleteClick(course)} className="btn btn-danger ml-2">Borrar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showPopup && courseToDelete && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>¿Deseas eliminar el curso {courseToDelete.title} con sus lecciones y módulos asociados?</h2>
                        <button onClick={confirmDelete} className="btn btn-danger">Confirmar</button>
                        <button onClick={() => setShowPopup(false)} className="btn btn-secondary">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstructorDashboard;
