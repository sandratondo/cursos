@extends('layouts.app')

@section('content')

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
    <!-- Sidebar con las lecciones -->
    <div class="bg-gray-100 p-6 rounded-lg">
        <div id="logo" class="logo mb-4">
            <img src="data:image/png;base64," alt="Logo" class="w-24 h-24 mx-auto">
        </div>

        <p class="text-blue-500 hover:text-blue-700 text-center mb-4">
            <a href="#">Volver al Portal de Estudiante</a>
        </p>

        <h2 class="text-xl font-semibold text-center mb-4">{{ $course->title }}</h2>

        <div class="text-center mb-2">16% completado</div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
            <div class="bg-blue-500 h-2.5 rounded-full" style="width: 16%;" id="progress-bar-inner"></div>
        </div>

        <!-- Dropdown de lecciones -->
        @foreach($course->lessons as $lesson)
        <div class="mb-4">
            <div class="flex justify-between items-center cursor-pointer p-4 bg-white rounded-lg shadow-md" onclick="toggleContent('lesson-{{ $lesson->id }}')">
                <h4 class="font-semibold">{{ $lesson->title }}</h4>
                <div class="toggle-chevron">
                    <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>

            <!-- Contenido de la lección (oculto inicialmente) -->
            <div id="lesson-{{ $lesson->id }}" class="hidden content-list bg-gray-50 p-4 rounded-lg">
                <p>{{ $lesson->description }}</p>
                <div class="mt-2 text-sm text-gray-500">Orden: {{ $lesson->order }}</div>

                <!-- Mostrar los módulos dentro de la lección -->
                <div class="mt-4">
                    <h5 class="font-semibold mb-2">Módulos:</h5>
                    @foreach($lesson->modules as $module)
                    <div class="p-2 bg-gray-100 mb-2 rounded">
                        <p><strong>{{ $module->title }}</strong> ({{ $module->type }})</p>
                        <p>{{ $module->description }}</p>

                        @if($module->type == 'video')
                            <button onclick="showContent('{{ $module->url }}', '{{ $module->title }}', 'video', {{ $lesson->id }})" class="text-blue-500 hover:text-blue-700">Ver video</button>
                        @elseif($module->type == 'article')
                            <button onclick="showContent('{{ $module->url }}', '{{ $module->title }}', 'article', {{ $lesson->id }})" class="text-blue-500 hover:text-blue-700">Leer artículo</button>
                        @elseif($module->type == 'quiz')
                            <button onclick="showContent('{{ $module->url }}', '{{ $module->title }}', 'quiz', {{ $lesson->id }})" class="text-blue-500 hover:text-blue-700">Tomar el quiz</button>
                        @elseif($module->type == 'assignment')
                            <button onclick="showContent('{{ $module->url }}', '{{ $module->title }}', 'assignment', {{ $lesson->id }})" class="text-blue-500 hover:text-blue-700">Hacer la tarea</button>
                        @endif
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
        @endforeach
    </div>

    <!-- Contenido del curso principal -->
    <div class="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
        <div id="main-content">
            <h3 class="text-2xl font-semibold mb-4">Contenido Principal</h3>
            <p>Selecciona una lección para ver su contenido aquí.</p>
        </div>

        <div id="main-content-box-comments">
            <div id="notification" style="display: none;"></div>
            <!-- Caja de comentarios fija -->
            <div class="mt-4">
                <form id="comment-form" enctype="multipart/form-data" onsubmit="event.preventDefault(); postComment(activeLessonId);" class="mb-4">
                    @csrf
                    <input type="hidden" name="lesson_id" value="">
                    <textarea id="comment-textarea" name="content" placeholder="Escribe tu comentario" required class="w-full p-3 border border-gray-300 h-[120px] resize-none" style="border-radius: 10px 10px 0 0;"></textarea>
                    
                    <!-- emojis-->
                    <!-- Contenedor de la lista de emojis -->
                    <div id="emoji-picker" class="border border-gray-300s hidden max-h-40 overflow-y-auto p-2" style="max-height: 150px;">
                        <span class="emoji" style="cursor: pointer; margin: 5px;" onclick="addEmoji('😀')">😀</span>
                        <span class="emoji" style="cursor: pointer; margin: 5px;" onclick="addEmoji('😂')">😂</span>
                        <span class="emoji" style="cursor: pointer; margin: 5px;" onclick="addEmoji('😍')">😍</span>
                        <span class="emoji" style="cursor: pointer; margin: 5px;" onclick="addEmoji('😎')">😎</span>
                        <!-- más emojis -->
                    </div>
                    
                    <!-- Zona de arrastrar y soltar archivos -->
                    <div id="dropzone" class="border border-dashed border-gray-300 rounded-none bg-gray-100 p-4 hidden" style="border-radius: 0;">
                        <p class="text-gray-500">Arrastra tu archivo aquí o haz clic para seleccionar</p>
                        <input type="file" id="file-input" name="image" accept="image/*" class="hidden">
                        <!-- Previsualización de la imagen -->
                        <div id="preview-container" style="display: none;">
                            <img id="image-preview" src="" alt="Vista previa" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;box-shadow: 1px 1px 5px #cccccc;">
                        </div>
                    </div>

                    <!-- Caja de enviar comentarios fija -->
                    <div class="flex items-center justify-between p-3 border border-t-0 rounded-b-md" style="border-radius: 0 0 10px 10px;box-shadow: 0px 1px 10px -1px #d4d4d4;border-top: none !important;">
                        <div class="flex items-center space-x-4">
                            <button type="button" id="toggle-file-upload" class="text-gray-300 light-hover">
                                <i class="fa-solid fa-paperclip text-[1.4em]" style="stroke-width: 1; stroke: #fff;"></i>
                            </button>
                            <button type="button" id="emoji-button" class="text-gray-300 light-hover">
                                <i class="fa-regular fa-face-smile text-[1.4em]"></i>
                            </button>
                        </div>

                        <button type="submit" class="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors duration-300 ease-in-out">
                            <i class="fa-regular fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
            </div>

            <div>
            <h2 id="comments-header" class="text-xl font-semibold my-4 hidden">
                Comentarios
            </h2>
            </div>

            <div id="comments-list"></div>
            <div id="load-more-comments" style="display: none;">Cargar más comentarios</div>
            <div id="pagination-container" class="flex justify-center mt-4"></div>
        </div>        
    </div>
</div>
@endsection

<script>

    document.addEventListener('DOMContentLoaded', function() {
        // Función para agregar el emoji al textarea
        function addEmoji(emoji) {
            const textarea = document.getElementById('comment-textarea');
            textarea.value += emoji; // Añade el emoji al contenido del textarea
            textarea.focus(); // Asegúrate de que el textarea tenga el foco después de agregar el emoji
        }

        // Hacer la función addEmoji disponible globalmente
        window.addEmoji = addEmoji;

        // Función para mostrar/ocultar la lista de emojis
        document.getElementById('emoji-button').addEventListener('click', function() {
            const emojiPicker = document.getElementById('emoji-picker');
            emojiPicker.classList.toggle('hidden'); // Alterna la visibilidad de la lista de emojis
        });

        // variables drop files
        const toggleFileUploadBtn = document.getElementById('toggle-file-upload');
        const dropzone = document.getElementById('dropzone');
        const fileInput = document.getElementById('file-input');
        const previewContainer = document.getElementById('preview-container');
        const imagePreview = document.getElementById('image-preview');

        // Mostrar/ocultar el dropzone al hacer clic en el ícono
        toggleFileUploadBtn.addEventListener('click', function() {
            if (dropzone.style.display === 'none' || dropzone.style.display === '') {
                dropzone.style.display = 'block';
            } else {
                dropzone.style.display = 'none';
            }
        });

        // Manejar el evento de arrastrar archivos sobre el dropzone
        dropzone.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add('dragover');
        });

        // Manejar el evento de dejar de arrastrar archivos
        dropzone.addEventListener('dragleave', function(e) {
            dropzone.classList.remove('dragover');
        });

        // Manejar cuando se suelta el archivo
        dropzone.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove('dragover');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files; // Asignar el archivo arrastrado al input file
                showPreview(fileInput.files[0]);
            }
        });

        // Hacer clic en el dropzone también abre el selector de archivos
        dropzone.addEventListener('click', function() {
            fileInput.click();
        });

        // Sincronizar los archivos seleccionados con el dropzone
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                showPreview(fileInput.files[0]);
            }
        });

        // Función para mostrar la vista previa de la imagen
        function showPreview(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                previewContainer.style.display = 'block'; // Mostrar la previsualización
            };
            reader.readAsDataURL(file); // Leer el archivo como una URL de datos
        }
    });


    let activeLessonId = null; // Guarda el ID de la lección activa

    // Función para mostrar/ocultar el contenido de la lección
    function toggleContent(id) {
        const content = document.getElementById(id);
        content.classList.toggle('hidden');  // Toggle entre mostrar/ocultar
        activeLessonId = content.classList.contains('hidden') ? null : id; // Actualiza el ID de la lección activa
    }

    function showContent(url, title, type, lessonId) {
    const contentDiv = document.getElementById('main-content');
    activeLessonId = lessonId; // Guarda el ID de la lección activa

    // Resetea el contenido antes de cargar nuevo
    contentDiv.innerHTML = '';

    let content = '';

    // Genera el contenido basado en el tipo de módulo
    if (type === 'video') {
        // Construye la URL del video correctamente
        const videoName = url.split('/').pop().split('.').shift(); // Extrae el nombre del video sin extensión
        const videoUrl = `/storage/videos/output_${videoName}_hls/output_${videoName}.m3u8`;

        // Obtener la IP del usuario
        const userIp = '<?= request()->ip() ?>'; // Insertamos la IP del usuario desde Laravel

        content = `<h3 class="text-2xl font-semibold mb-4">${title}</h3>
                <div class="relative w-full flex items-center justify-center bg-black" style="height:80vh;">
                    <video id="my-video" class="video-js h-full object-cover" controls preload="auto" width="640" height="264" data-setup="{}">
                        <source src="${videoUrl}" type="application/x-mpegURL">
                        Your browser does not support the video tag.
                    </video>
                    <div id="watermark" class="watermark absolute text-white text-opacity-75 bg-black bg-opacity-10 px-2 py-1 rounded">
                        Copyright IP: ${userIp}
                    </div>
                </div>`;
    } else if (type === 'article') {
        content = `<h3 class="text-2xl font-semibold mb-4">${title}</h3>
                <iframe src="${url}" class="w-full h-96" frameborder="0"></iframe>`;
    } else if (type === 'quiz' || type === 'assignment') {
        content = `<h3 class="text-2xl font-semibold mb-4">${title}</h3>
                <iframe src="${url}" class="w-full h-96" frameborder="0"></iframe>`;
    }

    // Inserta el contenido en el contenedor principal
    contentDiv.innerHTML = content;

    // Inicializa Video.js
    videojs('my-video', {
        controls: true,
        autoplay: false,
        preload: 'auto',
        // Deshabilitar el botón de descarga
        controlBar: {
            downloadToggle: false, // Desactiva el botón de descarga
        }
    });

    // Agrega esto después de inicializar el reproductor
    const videoElement = document.getElementById('my-video');
    videoElement.oncontextmenu = function() {
        return false; // Desactiva el menú contextual
    };

    // Ahora muestra el formulario de comentarios
    const commentForm = document.getElementById('main-content-box-comments');
    commentForm.style.display = 'block'; // Mostrar el formulario

    // Asegurarse de que el campo `lesson_id` esté actualizado
    document.querySelector('input[name="lesson_id"]').value = lessonId;

    // Llama a la función que carga los comentarios del módulo
    loadComments(lessonId);

    // Llama a la función para posicionar la marca de agua de forma aleatoria cada 20 segundos
    positionWatermarkRandomly();
    setInterval(positionWatermarkRandomly, 20000); // 20000 ms = 20 segundos
}

function positionWatermarkRandomly() {
    const watermark = document.getElementById('watermark');
    const videoContainer = document.querySelector('.relative'); // Selecciona el contenedor del video

    // Obtiene las dimensiones del contenedor del video
    const containerWidth = videoContainer.offsetWidth;
    const containerHeight = videoContainer.offsetHeight;

    // Calcula posiciones aleatorias dentro del contenedor del video
    const randomTop = Math.floor(Math.random() * (containerHeight - watermark.offsetHeight));
    const randomLeft = Math.floor(Math.random() * (containerWidth - watermark.offsetWidth));

    // Aplica las posiciones aleatorias al watermark
    watermark.style.top = `${randomTop}px`;
    watermark.style.left = `${randomLeft}px`;
}





    function loadComments(lessonId, page = 1) {
    const commentsList = document.getElementById('comments-list');
    const commentsHeader = document.getElementById('comments-header');
    commentsList.innerHTML = '';  // Limpiar los comentarios previos

    // Solicitud AJAX para obtener los comentarios de la lección
    fetch(`/comments/${lessonId}?page=${page}`)
        .then(response => response.json())
        .then(data => {
            const commentsCount = data.total; // Usar 'total' en lugar de 'comments.length'
            if (commentsCount > 0) {
                commentsHeader.textContent = `Comentarios (${commentsCount})`;
                commentsHeader.classList.remove('hidden');
            } else {
                commentsHeader.classList.add('hidden');
            }

            let commentNumber = 1;

            data.data.forEach(comment => { // Usar 'data.data' para acceder a los comentarios paginados
                let commentHtml = generateCommentHtml(comment, commentNumber);
                commentsList.innerHTML += commentHtml;
                commentNumber++;
            });

            // Manejar la paginación (si se proporciona) 
            if (data.links && data.links.length > 0) {
                let paginationHtml = '';
                data.links.forEach(link => {
                    if (link.url) {
                        paginationHtml += `<button onclick="loadComments(${lessonId}, ${new URL(link.url).searchParams.get('page')})" class="px-2 py-1 border ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} rounded-md mx-1">${link.label}</button>`;
                    }
                });
                document.getElementById('pagination-container').innerHTML = `<div class="pagination flex justify-center my-8">${paginationHtml}</div>`; // Aumenta my-4 a my-8
            }
        })
        .catch(error => {
            console.error('Error loading comments:', error);
        });
}

function generateCommentHtml(comment, commentNumber, marginLevel = 1) {
    let repliesHtml = '';
    if (comment.replies && comment.replies.length > 0) {
        comment.replies.forEach((reply, replyNumber) => {
            repliesHtml += generateCommentHtml(reply, `${commentNumber}.${replyNumber + 1}`, marginLevel + 1);
        });
    }

    // Determinar si mostrar el botón "Responder"
    const showReplyButton = marginLevel === 1;

    // Verificar si el usuario tiene un avatar; si no, usar una imagen por defecto
    const profilePic = comment.user.avatar ? comment.user.avatar : 'https://via.placeholder.com/50?text=Perfil';

    return `
        <div class="comment mb-4 w-full" style="${marginLevel > 1 ? 'background: none;' : ''}">
            <div class="flex items-start space-x-4 w-full" >
                <!-- Foto de perfil -->
                <div class="profile-pic flex-shrink-0">
                    <img src="${profilePic}" alt="Foto de perfil" class="rounded-full w-10 h-10 object-cover shadow-md">
                </div>
                <!-- Burbuja de comentario -->
                <div class="comment-bubble flex-grow p-4 bg-blue-100 rounded-xl shadow-md">
                    <p class="font-semibold text-sm">${comment.user.name}</p>
                    <p>${comment.content}</p>
                        ${comment.image ? `
                            <a href="${comment.image}" target="_blank" rel="noopener noreferrer">
                                <img src="${comment.image}" alt="Imagen adjunta" class="mt-2 rounded-lg max-w-xs max-h-40 object-cover cursor-pointer">
                            </a>` : ''
                        }
                    <p class="text-xs text-gray-500 mt-2">Publicado el: ${comment.created_at_formatted}</p>

                    <div class="reply-section mt-4">
                        ${showReplyButton ? `
                        <button type="button" class="text-gray-500" onclick="toggleReplyForm(${comment.id})">
                            <i class="fa-solid fa-reply"></i> Responder
                        </button>` : ''}
                        <form id="reply-form-${comment.id}" enctype="multipart/form-data" onsubmit="event.preventDefault(); postReply(${comment.id});" class="reply-form hidden mt-2">
                            @csrf
                            <textarea id="reply-textarea-${comment.id}" name="content" placeholder="Escribe tu respuesta aquí" required class="w-full p-3 border border-gray-300 h-[120px] resize-none" style="border-radius: 10px 10px 0 0;"></textarea>
                            <!-- emojis -->
                            <div id="emoji-picker-reply-${comment.id}" class="border border-gray-300 hidden max-h-40 overflow-y-auto p-2 bg-white" style="max-height: 150px;">
                                <span class="emoji" style="cursor: pointer; margin: 5px;" onclick="addEmojiReply('😀', ${comment.id})">😀</span>
                                <span class="emoji" style="cursor: pointer; margin: 5px;" onclick="addEmojiReply('😂', ${comment.id})">😂</span>
                                <span class="emoji" style="cursor: pointer; margin: 5px;" onclick="addEmojiReply('😍', ${comment.id})">😍</span>
                                <span class="emoji" style="cursor: pointer; margin: 5px;" onclick="addEmojiReply('😎', ${comment.id})">😎</span>
                            </div>
                            <!-- Zona de arrastrar y soltar archivos -->
                            <div id="dropzone-reply-${comment.id}" class="dropzone border border-dashed border-gray-300 rounded-none bg-gray-100 p-4 hidden" 
                                onclick="document.getElementById('file-input-reply-${comment.id}').click();"
                                ondragenter="handleDragEnter(event)"
                                ondragover="handleDragOver(event)"
                                ondragleave="handleDragLeave(event)"
                                ondrop="handleDrop(event, ${comment.id})">
                                <p class="text-gray-500 text-center">Arrastra tu archivo aquí o haz clic para seleccionar</p>
                                <input type="file" id="file-input-reply-${comment.id}" name="image" accept="image/*" class="hidden" onchange="previewImage(event, ${comment.id})">
                                <div id="preview-container-reply-${comment.id}" style="display: none;">
                                    <img id="image-preview-reply-${comment.id}" src="" alt="Vista previa" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; box-shadow: 1px 1px 5px #cccccc;">
                                </div>
                            </div>
                            <!-- Caja de enviar respuestas fija -->
                            <div class="flex items-center justify-between p-3 border border-t-0 rounded-b-md bg-white" style="border-radius: 0 0 10px 10px; box-shadow: 0px 1px 10px -1px #d4d4d4; border-top: none !important;">
                                <div class="flex items-center space-x-4">
                                    <button type="button" id="toggle-file-upload-reply-${comment.id}" class="text-gray-300 light-hover" onclick="toggleFileUpload(${comment.id})">
                                        <i class="fa-solid fa-paperclip text-[1.4em]" style="stroke-width: 1; stroke: #fff;"></i>
                                    </button>
                                    <button type="button" id="emoji-button-reply-${comment.id}" class="text-gray-300 light-hover" onclick="toggleEmojiPicker(${comment.id})">
                                        <i class="fa-regular fa-face-smile text-[1.4em]"></i>
                                    </button>
                                </div>
                                <button type="submit" class="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-600">
                                    <i class="fa-solid fa-paper-plane"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- Respuestas anidadas -->
            <div class="replies mt-4 ml-10">
                ${repliesHtml}
            </div>
        </div>
    `;
}



function handleDragEnter(event) {
    event.preventDefault();
    event.target.classList.add('bg-blue-200'); // Cambia el fondo cuando el archivo está sobre el área
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDragLeave(event) {
    event.preventDefault();
    event.target.classList.remove('bg-blue-200');
}

function handleDrop(event, commentId) {
    event.preventDefault();
    const dropzone = document.getElementById(`dropzone-reply-${commentId}`);
    const input = document.getElementById(`file-input-reply-${commentId}`);
    const file = event.dataTransfer.files[0];

    if (file) {
        // Simula la selección del archivo y muestra la vista previa
        input.files = event.dataTransfer.files;
        previewImage({ target: input }, commentId);
    }

    dropzone.classList.remove('bg-blue-200'); // Restablece el fondo después del "drop"
}






    function toggleReplyForm(commentId) {
        const form = document.getElementById(`reply-form-${commentId}`);
        if (form) {
            form.classList.toggle('hidden');
        } else {
            console.error(`Formulario de respuesta con ID reply-form-${commentId} no encontrado.`);
        }
    }

    function addEmojiReply(emoji, commentId) {
        const textarea = document.getElementById(`reply-textarea-${commentId}`);
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            // Insertar emoji en la posición del cursor
            textarea.value = textarea.value.substring(0, start) + emoji + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + emoji.length; // Mover el cursor después del emoji
        } else {
            console.error(`Textarea con ID reply-textarea-${commentId} no encontrado.`);
        }
    }

    function toggleFileUpload(commentId) {
        const dropzone = document.getElementById(`dropzone-reply-${commentId}`);
        if (dropzone) {
            dropzone.classList.toggle('hidden');
        } else {
            console.error(`Zona de arrastre de archivos con ID dropzone-reply-${commentId} no encontrada.`);
        }
    }

    function toggleEmojiPicker(commentId) {
        const emojiPicker = document.getElementById(`emoji-picker-reply-${commentId}`);
        if (emojiPicker) {
            emojiPicker.classList.toggle('hidden');
        } else {
            console.error(`Selector de emojis con ID emoji-picker-reply-${commentId} no encontrado.`);
        }
    }

    function postReply(commentId) { 
        const form = document.getElementById(`reply-form-${commentId}`);
        const formData = new FormData(form);

        // Comprobar si hay archivos en el FormData
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        // Validar si se ha seleccionado un archivo
        const fileInput = document.querySelector(`#reply-form-${commentId} input[type="file"]`); // Asegúrate de que el selector apunte al input correcto dentro del formulario específico
        const maxFileSize = 2 * 1024 * 1024; // 2 MB en bytes
        const allowedFileTypes = ['image/jpeg', 'image/png']; // Tipos permitidos

        // Verificar si hay un archivo y si su tipo es válido
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            if (!allowedFileTypes.includes(file.type)) {
                showNotification('error', 'Formato de archivo no admitido. Solo se permiten JPG y PNG.');
                return; // Salir de la función si el tipo no es válido
            }
            // Comprobar el tamaño del archivo
            if (file.size > maxFileSize) {
                showNotification('error', 'El tamaño del archivo excede el límite permitido de 2 MB.');
                return; // Salir de la función si el tamaño no es válido
            }
        }

        // Enviar el formulario si pasa las validaciones
        fetch(`/comments/reply/${commentId}`, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            // Validar que la respuesta sea JSON antes de convertirla
            if (!response.ok) throw new Error('Error en la respuesta del servidor.');
            return response.json();
        })
        .then(data => {
            // Recargamos la lista de comentarios después de enviar la respuesta
            const lessonId = activeLessonId; // Usa el ID de la lección activa si es necesario
            loadComments(lessonId);
            showNotification('success', 'Comentario enviado con éxito.');
        })
        .catch(error => {
            // Mostrar el mensaje de error
            showNotification('error', error.message);
        });
    }

    function previewImage(event, commentId) {
        const input = event.target;
        const previewContainer = document.getElementById(`preview-container-reply-${commentId}`);
        const imagePreview = document.getElementById(`image-preview-reply-${commentId}`);

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                previewContainer.style.display = 'block'; // Mostrar la previsualización
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            previewContainer.style.display = 'none'; // Ocultar si no hay archivo
        }
    }



    function postComment(lessonId) {
        const form = document.getElementById('comment-form');
        const imagePreviewComment = document.getElementById('image-preview');
        const previewContainerComment = document.getElementById('preview-container');
        const formData = new FormData(form);
        formData.append('lesson_id', lessonId);

        // Validar si se ha seleccionado un archivo
        const fileInput = document.querySelector('input[type="file"]'); // Asegúrate de que este selector apunte al input correcto
        const maxFileSize = 2 * 1024 * 1024; // 2 MB en bytes
        const allowedFileTypes = ['image/jpeg', 'image/png']; // Tipos permitidos

        // Verificar si hay un archivo y si su tipo es válido
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            if (!allowedFileTypes.includes(file.type)) {
                showNotification('error', 'Formato de archivo no admitido. Solo se permiten JPG y PNG.');
                return; // Salir de la función si el tipo no es válido
            }
            // Comprobar el tamaño del archivo
            if (file.size > maxFileSize) {
                showNotification('error', 'El tamaño del archivo excede el límite permitido de 2 MB.');
                return; // Salir de la función si el tamaño no es válido
            }
        }

        fetch(`/comments`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || 'Error al subir la imagen. Formato no permitido.');
                });
            }
            return response.json();
        })
        .then(data => {
            // Limpiar el formulario si se envía con éxito
            form.reset();
            imagePreviewComment.src = ''; // Limpiar la URL de la imagen
            previewContainerComment.style.display = 'none'; // Ocultar el contenedor de la previsualización
            
            // Ocultar emoji-picker y dropzone
            document.getElementById('emoji-picker').classList.add('hidden');
            document.getElementById('dropzone').style.display = 'none';

            // Recargar la lista de comentarios
            loadComments(lessonId);

            // Limpiar mensajes de error
            showNotification('success', 'Comentario enviado con éxito.');
        })
        .catch(error => {
            // Mostrar el mensaje de error
            showNotification('error', error.message);
        });
    }


</script>
