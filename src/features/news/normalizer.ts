import { INoticias } from "./fakeRest";





export const normalizer = (data:INoticias[]) => {
    return (

        data.map(n => {
            const titulo = n.titulo.split(" ")
            .map((str) => {
              return str.charAt(0).toUpperCase() + str.slice(1);
            })
            .join(" ");
    
            const ahora = new Date();
            const minutosTranscurridos = Math.floor(
              (ahora.getTime() - n.fecha.getTime()) / 60000
            );
            return {
              id: n.id,
              titulo,
              descripcion: n.descripcion,
              fecha: `Hace ${minutosTranscurridos} minutos`,
              esPremium: n.esPremium,
              imagen: n.imagen,
              descripcionCorta: n.descripcion.substring(0, 100),
            };
        })
    )
}


