import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS  } from "./constants";
import { BioContainer, BioDescription, BioImage, BioNombre, Button, ContenedorBotones } from "./styles";
import styles from "./styles.module.css";

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

    
  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <Button
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        isActive={bioActiva.id === nombre}
        className={
          bioActiva.id === nombre
            ? styles.botonBioActivo
            : styles.botonBioInactivo
        }
      >
        {nombre}
      </Button>
    ));
  };

  return (
    <BioContainer className={styles.bioContainer}>
      <ContenedorBotones className={styles.contenedorBotones}>{crearBotones()}</ContenedorBotones>
      <div>
        <div>
          <BioImage
            src={bioActiva.image}
            alt={bioActiva.nombre}
            className={styles.bioImagen}
          />
        </div>
        <div>
          <BioNombre className={styles.bioNombre}>{bioActiva.nombre}</BioNombre>
          <BioDescription className={styles.bioDescripcion}>{bioActiva.descripcion}</BioDescription>
        </div>
      </div>
    </BioContainer>
  );
};

export default Bio;
