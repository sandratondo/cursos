// resources/js/Components/CommentReplyBox.tsx
import React, { useState } from 'react';

interface CommentReplyBoxProps {
  parentId: number;
  onReply: (parentId: number, content: string) => void;
}

const CommentReplyBox: React.FC<CommentReplyBoxProps> = ({ parentId, onReply }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReply(parentId, content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu respuesta..."
        rows={3}
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2">
        Responder
      </button>
    </form>
  );
};

export default CommentReplyBox;
