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
  user: {
    name: string;
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

  useEffect(() => {
    if (selectedLessonId !== null) {
      const lesson = course.lessons.find(lesson => lesson.id === selectedLessonId);
      if (lesson) {
        setComments(lesson.comments);
      }
    }
  }, [selectedLessonId, course.lessons]);

  const handleModuleClick = (module: Module, lessonId: number) => {
    setSelectedModule(module);
    setSelectedLessonId(lessonId);
  };

  const handleCommentSubmit = async () => {
    if (selectedLessonId !== null) {
      const response = await axios.get(`/comments/${selectedLessonId}`);
      setComments(response.data);
    }
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
              <CommentList comments={comments} />
              <Pagination />
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Lessons;
