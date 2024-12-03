import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentReplyBox from './CommentReplyBox';

interface Comment {
  id: number;
  content: string;
  image?: string;
  created_at_formatted: string;
  user: {
    name: string;
    avatar: string;
  };
  replies?: Comment[];
  parent_id?: number | null;
}

interface CommentListProps {
  comments: Comment[];
  totalComments: number;
  lessonId: number; // saber a qué lección pertenecen los comentarios
}

const CommentList: React.FC<CommentListProps> = ({ comments, totalComments, lessonId }) => {
  const [replyingTo, setReplyingTo] = useState<number | null>(null); //comentario al que esta respondiendo
  const [commentList, setCommentList] = useState<Comment[]>(comments);

  
  useEffect(() => {
    setCommentList(comments); // useEffect para actualizar la lista de comentarios cuando cambian las props
  }, [comments]); //array [comments] indica que el efecto se ejecutará cada vez que comments cambie.

  //para obtener comentarios
  const fetchComments = async () => {
    try {
      const response = await axios.get(`/comments/${lessonId}`);
      setCommentList(response.data.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleReplyClick = (commentId: number) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  //para manejar el envío de una respuesta
  const handleReplySubmit = () => {
    fetchComments(); //obtener los comentarios actualizados
    setReplyingTo(null); //restablece replyingTo a null para ocultar la caja de respuesta
  };

  return (
    <div className="space-y-4">
      <h2 id="comments-header" className="text-xl font-semibold my-4">
        {totalComments} Comentarios
      </h2>
      {commentList.length > 0 ? (
        commentList.map(comment => (
          <div key={comment.id} className="flex items-start space-x-4">
            <div className="profile-pic flex-shrink-0">
              <img
                src={comment.user.avatar}
                alt="Foto de perfil"
                className="rounded-full w-10 h-10 object-cover shadow-md"
              />
            </div>
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
              <p className="text-xs text-gray-500 mt-2">{comment.created_at_formatted}</p>
              <button
                onClick={() => handleReplyClick(comment.id)}
                className="text-blue-500 hover:underline text-sm"
              >
                Reply
              </button>
              {replyingTo === comment.id && (
                <CommentReplyBox parentCommentId={comment.id} onReplySubmit={handleReplySubmit} />
              )}

              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 mt-4 space-y-4">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="flex items-start space-x-4">
                      <div className="profile-pic flex-shrink-0">
                        <img
                          src={reply.user.avatar}
                          alt="Foto de perfil"
                          className="rounded-full w-8 h-8 object-cover shadow-md"
                        />
                      </div>
                      <div className="comment-reply flex-grow p-4 bg-gray-100 rounded-xl shadow-md">
                        <p className="font-semibold text-sm">{reply.user.name}</p>
                        <p>{reply.content}</p>
                        {reply.image && (
                          <a href={reply.image} target="_blank" rel="noopener noreferrer">
                            <img
                              src={reply.image}
                              alt="Imagen adjunta"
                              className="mt-2 rounded-lg max-w-xs max-h-40 object-cover cursor-pointer"
                            />
                          </a>
                        )}
                        <p className="text-xs text-gray-500 mt-2">{reply.created_at_formatted}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay comentarios aún.</p>
      )}
    </div>
  );
};

export default CommentList;
