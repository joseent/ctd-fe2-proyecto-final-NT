import { useEffect, useState } from "react";
import { obtenerNoticiasData } from "./noticiasService";
import { INoticiasNormalizadas } from "./noticiasInterfaces";
import { ContenedorNoticias, TituloNoticias, ListaNoticias } from "./styled";
import TarjetaNoticia from "./TarjetaNoticia";
import ModalNoticia from "./ModalNoticia";

////////////////////////////////////////////////////////////////////////////////////////////////////
//Se dividio el codigo en diferentes compoenentes y servicios mas especializados y reutilizables. //
//Aplicando el principio SOLID al separar responsabilidades y promover la reutilizacion del codigo//
////////////////////////////////////////////////////////////////////////////////////////////////////

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const data = await obtenerNoticiasData();
      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  const handleVerMasClick = (noticia: INoticiasNormalizadas) => {
    setModal(noticia);
  };

  const handleCloseModal = () => {
    setModal(null);
  };

  const handleSuscribirClick = () => {
    setTimeout(() => {
      alert("Suscripto!");
      setModal(null);
    }, 1000);
  };

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((noticia) => (
          <TarjetaNoticia
            key={noticia.id}
            noticia={noticia}
            onVerMasClick={handleVerMasClick}
          />
        ))}
        {modal && (
          <ModalNoticia
            noticia={modal}
            onClose={handleCloseModal}
            onSuscribirClick={handleSuscribirClick}
          />
        )}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
