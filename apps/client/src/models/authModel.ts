export interface Login {
    email:string,
    password:string,
}

export interface UserRegister{
    name:string,
    email:string,
    password:string
}

export interface DoctorRegister{
    name:string
    password:string
    specialties:string
    email:string
    experience:string
    price:string
    register:string
    profile:File
}