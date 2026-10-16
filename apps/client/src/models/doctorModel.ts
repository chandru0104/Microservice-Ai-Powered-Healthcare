export interface IDoctorUpdatePayload {
    name: string;
    email: string;
    specialties: string;
    experience: string;
    price: string | number;
    place: string;
    profile?: File | string | Blob | null;
    [key: string]: any;
}

export interface IDoctorItem {
    _id: string;
    name: string;
    email: string;
    specialties: string;
    experience: string;
    price: number | string;
    place: string;
    register?: string;
    about?: string;
    profile?: string;
    [key: string]: any;
}
