<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Traits\Paginates;
use Log;

class CommentController extends Controller
{
    use Paginates;

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'content' => 'required|string',
            'image' => 'nullable|mimes:jpg,jpeg,png|max:2048',
            'parent_id' => 'nullable|exists:comments,id'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $validated['image'] = asset('storage/' . $path);
        }

        Comment::create([
            'lesson_id' => $validated['lesson_id'],
            'user_id' => auth()->id(),
            'content' => $validated['content'],
            'image' => $validated['image'] ?? null,
            'parent_id' => $validated['parent_id'] ?? null,
        ]);

        if ($request->wantsJson()) {
            return response()->json(['success' => true]);
        }

    return redirect()->back()->with('success', 'Comentario enviado con éxito');
    }

    public function getComments(Request $request, $lessonId) 
    {
        //obtine comentarios de la lección
        $query = Comment::where('lesson_id', $lessonId)
        ->with('user', 'replies') // Obtener el usuario y las respuestas
        ->orderBy('created_at', 'desc'); // Ordenar por fecha de creación

        $comments = $this->paginateQuery($query, $request); // obtener solo los comentarios de una página

        $comments->getCollection()->transform(function ($comment) {
            $comment->created_at_formatted = $comment->created_at->format('d-m-Y H:i');
            return $comment;
        });

        return response()->json($comments);
    }    

    public function reply(Request $request, $commentId)
    {
        $comment = Comment::findOrFail($commentId);

        $validated = $request->validate([
            'content' => 'required|string',
            'image' => 'nullable|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $validated['image'] = asset('storage/' . $path);
        }

        $reply = new Comment();
        $reply->lesson_id = $comment->lesson_id;
        $reply->user_id = auth()->id();
        $reply->content = $request->input('content');
        $reply->image = $validated['image'] ?? null;
        $reply->parent_id = $comment->id;
        $reply->is_answered = 1;
        $reply->created_at = now();

        $reply->save();

        // Agregar los datos del usuario y el formato de la fecha a la respuesta JSON
        $reply->load('user');
        $reply->created_at_formatted = $reply->created_at->format('d-m-Y H:i');


        return response()->json(['reply' => $reply]);
    }
}
