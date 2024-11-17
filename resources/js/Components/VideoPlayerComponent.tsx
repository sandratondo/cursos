import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // Asegúrate de que el CSS esté disponible

export function initializeVideoPlayer(videoElementId: string) {
    // Llama a videojs para inicializar el reproductor
    videojs(videoElementId, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        controlBar: {
            downloadToggle: false, // Desactiva el botón de descarga
        }
    });
}
