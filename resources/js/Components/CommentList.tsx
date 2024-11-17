import React from 'react';

interface Comment {
  id: number;
  content: string;
  image?: string;
  created_at_formatted: string;
  user: {
    name: string;
    avatar: string;
  };
}

interface CommentListProps {
  comments?: Comment[]; // Hacemos que comments sea opcional
  totalComments: number; // Nueva propiedad para el número total de comentarios
}

const CommentList: React.FC<CommentListProps> = ({ comments = [], totalComments }) => {
  return (
    <div className="space-y-4">
      <h2 id="comments-header" className="text-xl font-semibold my-4">
        {totalComments} Comentarios
      </h2>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id} className="flex items-start space-x-4">
            {/* Foto de perfil */}
            <div className="profile-pic flex-shrink-0">
              <img
                src={comment.user.avatar}
                alt="Foto de perfil"
                className="rounded-full w-10 h-10 object-cover shadow-md"
              />
            </div>
            {/* Burbuja de comentario */}
            <div className="comment-bubble flex-grow p-4 bg-blue-100 rounded-xl shadow-md">
              <p className="font-semibold text-sm">{comment.user.name}</p>
              <p>{comment.content}</p>
              {comment.image && (
                <a href={comment.image} target="_blank" rel="noopener noreferrer">
                  <img
                    src={comment.image}
                    alt="Imagen adjunta"
                    className="mt-2 rounded-lg max-w-xs max-h-40 object-cover cursor-pointer"
                  />
                </a>
              )}
              <p className="text-xs text-gray-500 mt-2">Publicado el: {comment.created_at_formatted}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default CommentList;
