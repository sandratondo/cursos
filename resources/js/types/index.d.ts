export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
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


export interface Enrollment {
    id: number; // bigint(20), UNSIGNED
    user_id: number; // bigint(20), UNSIGNED
    course_id: number; // bigint(20), UNSIGNED
    enrollment_date: string; // timestamp, valor predeterminado: current_timestamp()
    status: 'in_progress' | 'completed' | 'expired'; // enum, valores posibles
    created_at?: string | null; // timestamp, NULL permitido
    updated_at?: string | null; // timestamp, NULL permitido
}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

