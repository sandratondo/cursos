// resources/js/Components/CourseList.tsx
import { Course } from '@/types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/app.css'; // Ruta relativa correcta
import '../../sass/app.scss';
interface CourseListProps {
    courses: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
    return (
        <div className="row">
            {courses.map(course => (
                <div className="col-md-4" key={course.id}>
                    <div className="card mb-4">
                        <img src={course.image_url ?? 'https://via.placeholder.com/150'} className="card-img-top" alt={course.title} />
                        <div className="card-body">
                            <h5 className="card-title">{course.title}</h5>
                            <p className="card-text">{course.description}</p>
                            <p className="card-text">{course.is_free ? 'Gratis' : '$' + course.price}</p>
                            <a href="#" className="btn btn-primary">Ver más</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}


