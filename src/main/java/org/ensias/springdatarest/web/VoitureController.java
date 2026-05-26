package org.ensias.springdatarest.web;

import org.ensias.springdatarest.modele.Voiture;
import org.ensias.springdatarest.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    @GetMapping("/voitures")
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }

    @GetMapping("/voitures/{id}")
    public Voiture getVoiture(@PathVariable Long id) {
        return voitureRepo.findById(id).orElse(null);
    }

    @PostMapping("/voitures")
    public Voiture addVoiture(@RequestBody Voiture voiture) {
        return voitureRepo.save(voiture);
    }

    @PutMapping("/voitures/{id}")
    public Voiture updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture) {
        voiture.setId(id);
        return voitureRepo.save(voiture);
    }

    @DeleteMapping("/voitures/{id}")
    public String deleteVoiture(@PathVariable Long id) {
        voitureRepo.deleteById(id);
        return "{\"deleted\": true}";
    }
}
