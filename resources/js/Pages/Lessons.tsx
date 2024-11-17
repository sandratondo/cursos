import React, { useState, useEffect } from 'react'; 
import { PageProps } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import MainContent from '@/Components/MainContent';
import CommentBox from '@/Components/CommentBox';
import CommentList from '@/Components/CommentList';
import Pagination from '@/Components/Pagination';
import { User } from '@/types';
import axios from 'axios';

interface Module {
  title: string;
  type: 'video' | 'article' | 'quiz' | 'assignment';
  description: string;
  url: string;
}

interface Comment {
  id: number;
  content: string;
  image?: string;
  created_at_formatted: string;
  user: {
    name: string;
    avatar: string;
  };
  replies: Comment[];
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  order: number;
  modules: Module[];
  comments: Comment[];
}

interface LessonsPageProps extends PageProps {
  auth: {
    user: User;
  };
  course: {
    title: string;
    progress: number;
    lessons: Lesson[];
  };
}

const Lessons: React.FC<LessonsPageProps> = ({ auth, course }) => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalComments, setTotalComments] = useState<number>(0); // Nueva variable de estado

  useEffect(() => {
    if (selectedLessonId !== null) { // se ejecuta cada vez que cambia el selectedLessonId o currentPage
      fetchComments(selectedLessonId, currentPage);
    }
  }, [selectedLessonId, currentPage]);

  //se optiene los comentarios de una leccion y pagina
  const fetchComments = async (lessonId: number, page: number) => {
    const response = await axios.get(`/comments/${lessonId}`, { params: { page } });
    setComments(response.data.data);
    setTotalPages(response.data.last_page);
    setTotalComments(response.data.total); // Actualizar el número total de comentarios
  };

  //clic modulo establece el módulo seleccionado y la lección correspondiente.
  const handleModuleClick = (module: Module, lessonId: number) => {
    setSelectedModule(module);
    setSelectedLessonId(lessonId);
  };

  //se envia un comentario carga de nuevo lesson id y la pagina actual
  const handleCommentSubmit = async () => {
    if (selectedLessonId !== null) {
      fetchComments(selectedLessonId, currentPage);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!course || !course.lessons) {
    return (
      <AuthenticatedLayout user={auth.user}>
        <div>Cargando...</div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="flex">
        <Sidebar 
          courseTitle={course.title} 
          courseProgress={course.progress} 
          lessons={course.lessons} 
          onModuleClick={handleModuleClick} 
        />
        <div id="main-content" className="flex-grow p-4">
          <h1>{course.title}</h1>
          {selectedModule && (
            <MainContent
              url={selectedModule.url}
              title={selectedModule.title}
              type={selectedModule.type}
              lessonId={selectedLessonId}
            />
          )}
          {selectedLessonId && (
            <div>
              <CommentBox lessonId={selectedLessonId} onCommentSubmit={handleCommentSubmit} />
              <CommentList comments={comments} totalComments={totalComments} /> {/* Pasar totalComments */}
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Lessons;
