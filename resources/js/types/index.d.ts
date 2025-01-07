export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: string;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    is_free: boolean;
    price: number | null;
    expires_at: string | null;
    video_blob: string | null;
    created_at: string;
    updated_at: string;
    user_id: number; // Asegúrate de incluir user_id si es necesario
    image_url?: string; 
    objetivo: string; 
    duracion: number | null;
}

export interface Lesson {
    id: number; // bigint(20), UNSIGNED
    course_id: number; // bigint(20), UNSIGNED
    title: string; // varchar(255)
    description?: string | null; // text, NULL permitido
    order: number; // int(11), valor predeterminado 0
    video_blob?: Blob | null; // blob, NULL permitido
    created_at?: string | null; // timestamp, NULL permitido
    updated_at?: string | null; // timestamp, NULL permitido
}

export interface Module {
    id: number;
    lesson_id: number;
    title: string;
    type: 'video' | 'article' | 'quiz' | 'assignment';
    url?: string | null;
    description?: string | null;
    order: number;
    created_at?: string | null;
    updated_at?: string | null;
}


export interface Enrollment {
    id: number; // bigint(20), UNSIGNED
    user_id: number; // bigint(20), UNSIGNED
    course_id: number; // bigint(20), UNSIGNED
    enrollment_date: string; // timestamp, valor predeterminado: current_timestamp()
    status: 'in_progress' | 'completed' | 'expired'; // enum, valores posibles
    created_at?: string | null; // timestamp, NULL permitido
    updated_at?: string | null; // timestamp, NULL permitido
}

export interface Comment {
    id: number; // bigint(20), UNSIGNED
    lesson_id: number; // bigint(20), UNSIGNED
    user_id: number; // bigint(20), UNSIGNED
    content: string; // texto del comentario
    image?: Blob | null; // imagen opcional
    is_answered: boolean; // campo para marcar si el comentario ha sido respondido
    created_at?: string | null; // timestamp opcional
    updated_at?: string | null; // timestamp opcional
    parent_id?: number | null; // relación opcional con el comentario padre (nullable)
}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

