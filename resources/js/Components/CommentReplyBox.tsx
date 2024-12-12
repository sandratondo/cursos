import React, { useState, FormEvent, ChangeEvent, DragEvent } from 'react';
import axios from 'axios';
import { showNotification } from '../app';

interface CommentReplyBoxProps {
  parentCommentId: number;
  onReplySubmit: (newComment: any) => void;
}

const CommentReplyBox: React.FC<CommentReplyBoxProps> = ({ parentCommentId, onReplySubmit }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [dropAreaVisible, setDropAreaVisible] = useState(false);

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFilePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleFileDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
      setFilePreview(URL.createObjectURL(event.dataTransfer.files[0]));
    }
  };

  const addEmoji = (emoji: string) => {
    setContent(content + emoji);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    formData.append('parent_id', parentCommentId.toString());
    if (file) {
      formData.append('image', file);
    }

    try {
      const response = await axios.post(`/comments/reply/${parentCommentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Respuesta enviada:', response.data);
      setContent('');
      setFile(null);
      setFilePreview(null);
      setDropAreaVisible(false);
      onReplySubmit(response.data); // Llamar al callback para actualizar las respuestas
      showNotification('success', 'Respuesta enviada con éxito');
    } catch (error) {
      console.error('Error enviando la respuesta:', error);
      showNotification('error', 'Error enviando la respuesta');
    }
  };

  return (
    <div className="comment-reply-box mt-4 p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Escribe tu respuesta"
          required
          value={content}
          onChange={handleContentChange}
          className="w-full p-3 border border-gray-300 rounded-t-lg h-[120px] resize-none"
          style={{ borderRadius: '10px 10px 0 0', marginBottom: '-10px'}}
        />
        
        {/* Emoji Picker */}
        {emojiPickerVisible && (
          <div className="border border-gray-300 max-h-40 overflow-y-auto p-2 bg-white">
            <span className="emoji cursor-pointer" onClick={() => addEmoji('😀')}>😀</span>
            <span className="emoji cursor-pointer" onClick={() => addEmoji('😂')}>😂</span>
            <span className="emoji cursor-pointer" onClick={() => addEmoji('😍')}>😍</span>
            <span className="emoji cursor-pointer" onClick={() => addEmoji('😎')}>😎</span>
          </div>
        )}

        {/* File Drop Area */}
        {dropAreaVisible && (
          <div
            className="border border-dashed border-gray-300 p-4 bg-gray-100"
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
          >
            <p className="text-gray-500 text-center">Arrastra tu archivo aquí o haz clic para seleccionar</p>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            {filePreview && (
              <div className="mt-2">
                <img src={filePreview} alt="Vista previa" className="w-24 h-24 object-cover rounded-md" />
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between p-3 bg-white border-t-0 rounded-b-md shadow-md">
          <div className="flex items-center space-x-4">
            <button type="button" onClick={() => setDropAreaVisible(!dropAreaVisible)} className="text-gray-300">
              <i className="fa-solid fa-paperclip text-[1.4em]" />
            </button>
            <button type="button" onClick={() => setEmojiPickerVisible(!emojiPickerVisible)} className="text-gray-300">
              <i className="fa-regular fa-face-smile text-[1.4em]" />
            </button>
          </div>

          <button type="submit" className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors duration-300 ease-in-out">
            <i className="fa-regular fa-paper-plane" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentReplyBox;






