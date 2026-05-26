package org.ensias.springdatarest.modele;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface VoitureRepo extends JpaRepository<Voiture, Long> {

    List<Voiture> findByModele(@Param("modele") String modele);

    List<Voiture> findByCouleur(@Param("couleur") String couleur);
}
