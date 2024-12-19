// resources/js/Components/Instructor/InstructorDashboard.tsx
import React from 'react';
import { Course } from '@/types';


interface InstructorDashboardProps {
    courses: Course[];
}

const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ courses }) => {
    return (
        <div>
            <h1>Instructor Dashboard</h1>
            <div className="mb-4">
                <a href="/courses/create" className="btn btn-success">Crear Curso</a>
            </div>
            <div className="row">
                {courses.map(course => (
                    <div className="col-md-4" key={course.id}>
                        <div className="card mb-4">
                            <img src={course.image_url ?? 'https://via.placeholder.com/150'} className="card-img-top" alt={course.title} />
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.description}</p>
                                <p className="card-text">{course.is_free ? 'Gratis' : `$${course.price}`}</p>
                                <a href={`/courses/${course.id}`} className="btn btn-primary">Ver más</a>
                                <a href={`/courses/${course.id}/edit`} className="btn btn-warning ml-2">Editar</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorDashboard;