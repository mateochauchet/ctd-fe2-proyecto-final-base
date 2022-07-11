
import { FC } from 'react';
import {INoticiasNormalizadas} from './Noticias'
import { BotonLectura, DescripcionTarjetaNoticia, FechaTarjetaNoticia, ImagenTarjetaNoticia, TarjetaNoticia, TituloTarjetaNoticia } from './styled';

type NewsCardProps = {
    n:INoticiasNormalizadas;
    setModal:Function;
}

const NewsCard:FC<NewsCardProps> = ({n, setModal}:NewsCardProps) => {
  return (
    <TarjetaNoticia>
        <ImagenTarjetaNoticia src={n.imagen} />
        <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
        <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
        <DescripcionTarjetaNoticia>
          {n.descripcionCorta}
        </DescripcionTarjetaNoticia>
        <BotonLectura onClick={() => setModal(n)}>Ver más</BotonLectura>
    </TarjetaNoticia>
  )
}

export default NewsCard