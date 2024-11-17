import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

interface CommentBoxProps {
  lessonId: number;
  onCommentSubmit: () => void; // Nueva prop para callback
}

const CommentBox: React.FC<CommentBoxProps> = ({ lessonId, onCommentSubmit }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFilePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const addEmoji = (emoji: string) => {
    setContent(content + emoji);
    setEmojiPickerVisible(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('lesson_id', lessonId.toString());
    formData.append('content', content);
    if (file) {
      formData.append('image', file);
    }

    try {
      const response = await axios.post('/comments/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Comentario enviado:', response.data);
      setContent('');
      setFile(null);
      setFilePreview(null);
      onCommentSubmit(); // Llamar al callback para actualizar los comentarios
    } catch (error) {
      console.error('Error enviando el comentario:', error);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          id="comment-textarea"
          name="content"
          placeholder="Escribe tu comentario"
          required
          value={content}
          onChange={handleContentChange}
          className="w-full p-3 border border-gray-300 h-[120px] resize-none"
          style={{ borderRadius: '10px 10px 0 0' }}
        />

        {emojiPickerVisible && (
          <div className="border border-gray-300 max-h-40 overflow-y-auto p-2">
            <span className="emoji" style={{ cursor: 'pointer', margin: '5px' }} onClick={() => addEmoji('😀')}>😀</span>
            <span className="emoji" style={{ cursor: 'pointer', margin: '5px' }} onClick={() => addEmoji('😂')}>😂</span>
            <span className="emoji" style={{ cursor: 'pointer', margin: '5px' }} onClick={() => addEmoji('😍')}>😍</span>
            <span className="emoji" style={{ cursor: 'pointer', margin: '5px' }} onClick={() => addEmoji('😎')}>😎</span>
          </div>
        )}

        <div className="border border-dashed border-gray-300 rounded-none bg-gray-100 p-4">
          <p className="text-gray-500">Arrastra tu archivo aquí o haz clic para seleccionar</p>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          {filePreview && (
            <div>
              <img src={filePreview} alt="Vista previa" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', boxShadow: '1px 1px 5px #cccccc' }} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-3 border border-t-0 rounded-b-md" style={{ borderRadius: '0 0 10px 10px', boxShadow: '0px 1px 10px -1px #d4d4d4', borderTop: 'none !important' }}>
          <div className="flex items-center space-x-4">
            <button type="button" onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()} className="text-gray-300 light-hover">
              <i className="fa-solid fa-paperclip text-[1.4em]" style={{ strokeWidth: 1, stroke: '#fff' }}></i>
            </button>
            <button type="button" onClick={() => setEmojiPickerVisible(!emojiPickerVisible)} className="text-gray-300 light-hover">
              <i className="fa-regular fa-face-smile text-[1.4em]"></i>
            </button>
          </div>

          <button type="submit" className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors duration-300 ease-in-out">
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentBox;
