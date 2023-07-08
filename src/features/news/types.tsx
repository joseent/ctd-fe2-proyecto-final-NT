export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

export interface ModalNoticiaProps {
  noticia: INoticiasNormalizadas;
  onClose: () => void;
  onSuscribirClick: () => void;
}

export interface TarjetaNoticiaProps {
  noticia: INoticiasNormalizadas;
  onVerMasClick: (noticia: INoticiasNormalizadas) => void;
}