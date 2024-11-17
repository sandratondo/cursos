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
    image_url?: string; // Agregar esta línea
}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

