export interface UserUpdateData {
    name?: string;
    email?: string;
    phone?: string | number;
    address?: string;
}

export interface IUserProfile {
    _id: string;
    name: string;
    email: string;
    phone?: string | number;
    address?: string;
    role?: string;
}
