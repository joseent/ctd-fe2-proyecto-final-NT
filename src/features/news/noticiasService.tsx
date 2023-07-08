// services/noticiasService.ts
import { obtenerNoticias } from "./fakeRest";
import { INoticiasNormalizadas } from "./types";
import { calcularMinutos, titulo } from "./utils";

export async function obtenerNoticiasData(): Promise<INoticiasNormalizadas[]> {
  const respuesta = await obtenerNoticias();

  return respuesta.map((n) => ({
    id: n.id,
    titulo: titulo(n.titulo),
    descripcion: n.descripcion,
    fecha: `Hace ${calcularMinutos(n.fecha)} minutos`,
    esPremium: n.esPremium,
    imagen: n.imagen,
    descripcionCorta: n.descripcion.substring(0, 100),
}));
}
