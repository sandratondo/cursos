// resources/js/Components/Sidebar.tsx
import React, { useState } from 'react';

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

interface SidebarProps {
  courseTitle: string;
  courseProgress: number;
  lessons: Lesson[];
  onModuleClick: (module: Module, lessonId: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ courseTitle, courseProgress, lessons, onModuleClick }) => {
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  const toggleContent = (id: number) => {
    setActiveLessonId(activeLessonId === id ? null : id);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg w-80">
      <div id="logo" className="logo mb-4">
        <img src="data:image/png;base64," alt="Logo" className="w-24 h-24 mx-auto" />
      </div>

      <p className="text-blue-500 hover:text-blue-700 text-center mb-4">
        <a href="#">Volver al Portal de Estudiante</a>
      </p>

      <h2 className="text-xl font-semibold text-center mb-4">{courseTitle}</h2>

      <div className="text-center mb-2">{courseProgress}% completado</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${courseProgress}%` }} id="progress-bar-inner"></div>
      </div>

      {lessons.map((lesson) => (
        <div key={lesson.id} className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer p-4 bg-white rounded-lg shadow-md"
            onClick={() => toggleContent(lesson.id)}
          >
            <h4 className="font-semibold">{lesson.title}</h4>
            <div className="toggle-chevron">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <div id={`lesson-${lesson.id}`} className={`content-list bg-gray-50 p-4 rounded-lg ${activeLessonId === lesson.id ? '' : 'hidden'}`}>
            <p>{lesson.description}</p>
            <div className="mt-2 text-sm text-gray-500">Orden: {lesson.order}</div>

            <div className="mt-4">
              <h5 className="font-semibold mb-2">Módulos:</h5>
              {lesson.modules.map((module, index) => (
                <div key={index} className="p-2 bg-gray-100 mb-2 rounded">
                  <p><strong>{module.title}</strong> ({module.type})</p>
                  <p>{module.description}</p>
                  <button
                    onClick={() => onModuleClick(module, lesson.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {module.type === 'video' && 'Ver video'}
                    {module.type === 'article' && 'Leer artículo'}
                    {module.type === 'quiz' && 'Tomar el quiz'}
                    {module.type === 'assignment' && 'Hacer la tarea'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
