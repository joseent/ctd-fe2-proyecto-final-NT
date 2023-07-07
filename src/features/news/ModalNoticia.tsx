import {
    CloseButton,
    TarjetaModal,
    ContenedorModal,
    DescripcionModal,
    ImagenModal,
    TituloModal,
    BotonSuscribir,
    CotenedorTexto,
  } from "./styled";
  import { ModalNoticiaProps } from "./noticiasInterfaces";
  import { SuscribeImage, CloseButton as Close } from "../../assets";
  
  const ModalNoticia: React.FC<ModalNoticiaProps> = ({
    noticia,
    onClose,
    onSuscribirClick,
  }) => {
    if (noticia.esPremium) {
      return (
        <ContenedorModal>
          <TarjetaModal>
            <CloseButton onClick={onClose}>
              <img src={Close} alt="close-button" />
            </CloseButton>
            <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
            <CotenedorTexto>
              <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
              <DescripcionModal>
                Suscríbete a nuestro newsletter y recibe noticias de
                nuestros personajes favoritos.
              </DescripcionModal>
              <BotonSuscribir onClick={onSuscribirClick}>Suscríbete</BotonSuscribir>
            </CotenedorTexto>
          </TarjetaModal>
        </ContenedorModal>
      );
    }
  
    return (
      <ContenedorModal>
        <TarjetaModal>
          <CloseButton onClick={onClose}>
            <img src={Close} alt="close-button" />
          </CloseButton>
          <ImagenModal src={noticia.imagen} alt="news-image" />
          <CotenedorTexto>
            <TituloModal>{noticia.titulo}</TituloModal>
            <DescripcionModal>{noticia.descripcion}</DescripcionModal>
          </CotenedorTexto>
        </TarjetaModal>
      </ContenedorModal>
    );
  };
  
  export default ModalNoticia;
  