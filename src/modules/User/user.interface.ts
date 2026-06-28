export interface User {
    name: string;
    email: string;
    password: string;
    role: UserRole,
    profilePhoto?: string;
}

enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}

