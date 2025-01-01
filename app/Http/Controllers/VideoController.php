<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function stream($videoName)
    {
        // Verificar si el usuario está autenticado
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Obtener la IP del usuario
        $userIp = request()->ip();

        // Construir la ruta del archivo .m3u8
        $videoPath = public_path("storage/videos/output_{$videoName}_hls/output_{$videoName}.m3u8");


        // Verificar si el archivo existe
        if (!file_exists($videoPath)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        // Leer el contenido del archivo .m3u8
        $content = file_get_contents($videoPath);

        // Insertar la marca de agua con la IP del usuario en el archivo .m3u8
        $watermarkedContent = $this->addWatermarkToM3U8($content, $userIp);

        return response($watermarkedContent, 200)
            ->header('Content-Type', 'application/vnd.apple.mpegurl');
    }

    private function addWatermarkToM3U8($content, $ip)
    {
        // Inserta una línea de comentario con la IP del usuario en el archivo .m3u8
        return "# User IP: {$ip}\n" . $content;
    }
}
