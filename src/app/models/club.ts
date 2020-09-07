export interface ClubI {
    id?: string;
    nombre?: string;
    descripcion?: string;
    telefono?: string;
    direccion?: string;
    email?: string;
    delegado?: string;
    entrenador?: string;
    imageUrl?: string
}

// agregar campos 
//      telefono, dirección, email
// el campo descripción no es necesario
// Tiene más de un delegado y entrenador.
//      Cómo voy a manejar eso?
//      Agrega complejidad al sistema
//      Si no puedo manejar algo tan sencillo estoy en problemas
