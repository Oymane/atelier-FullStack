package org.ensias.springdatarest.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Voiture {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NonNull
    private String marque;

    @NonNull
    private String modele;

    @NonNull
    private String couleur;

    @NonNull
    private String immatricule;

    @NonNull
    private Integer annee;

    @NonNull
    private Integer prix;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "proprietaire")
    @JsonIgnore
    private Proprietaire proprietaire;
}
