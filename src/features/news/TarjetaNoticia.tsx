// components/TarjetaNoticia.tsx
import {
  DescripcionTarjetaNoticia,
  FechaTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  BotonLectura,
  TarjetaNoticia,
} from "./styled";
import { INoticiasNormalizadas } from "./noticiasInterface";

interface TarjetaNoticiaProps {
  noticia: INoticiasNormalizadas;
  onVerMasClick: (noticia: INoticiasNormalizadas) => void;
}

const TarjetaNoticiaComp: React.FC<TarjetaNoticiaProps> = ({
  noticia,
  onVerMasClick,
}) => {
  return (
    <TarjetaNoticia>
    <ImagenTarjetaNoticia src={noticia.imagen} />
    <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
    <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
    <DescripcionTarjetaNoticia>
      {noticia.descripcionCorta}
    </DescripcionTarjetaNoticia>
    <BotonLectura onClick={() => onVerMasClick(noticia)}>
      Ver más
    </BotonLectura>
  </TarjetaNoticia>
  );
};

export default TarjetaNoticiaComp;
