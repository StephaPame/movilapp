export interface UsuarioMovil {
    uid: string;
    fechaCreacion: any; 
    nombre: string;
    apellido: string;
    foto: string;
    email: string;
    password: string;
}

export interface ElectrolineraBD {
    direccion: string;
    domingo: string;
    estado: string;
    formaspago: string;
    jueves: string;
    latitud: number;
    longitud: number;
    lunes: string;
    martes: string;
    miercoles: string;
    name: string;
    numeroconectores: string;
    referencia: string;
    sabado: string;
    tipoconector: string;
    viernes: string;
}