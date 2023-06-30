// components/TarjetaNoticia.tsx
import {
  DescripcionTarjetaNoticia,
  FechaTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  BotonLectura,
} from "./styled";
import { INoticiasNormalizadas } from "./Noticias copy";

interface TarjetaNoticiaProps {
  noticia: INoticiasNormalizadas;
  onVerMasClick: (noticia: INoticiasNormalizadas) => void;
}

const TarjetaNoticia: React.FC<TarjetaNoticiaProps> = ({
  noticia,
  onVerMasClick,
}) => {
  return (
    <div>
    <ImagenTarjetaNoticia src={noticia.imagen} />
    <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
    <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
    <DescripcionTarjetaNoticia>
      {noticia.descripcionCorta}
    </DescripcionTarjetaNoticia>
    <BotonLectura onClick={() => onVerMasClick(noticia)}>
      Ver más
    </BotonLectura>
  </div>
  );
};

export default TarjetaNoticia;
