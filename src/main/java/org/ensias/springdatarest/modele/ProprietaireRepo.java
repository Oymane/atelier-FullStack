package org.ensias.springdatarest.modele;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProprietaireRepo extends JpaRepository<Proprietaire, Long> {
}
