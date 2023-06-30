// services/noticiasService.ts
import { obtenerNoticias } from "./fakeRest";
import { INoticiasNormalizadas } from "./noticiasInterface";

export async function obtenerNoticiasData(): Promise<INoticiasNormalizadas[]> {
  const respuesta = await obtenerNoticias();

  return respuesta.map((n) => {
    const titulo = n.titulo
      .split(" ")
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
  });
}
