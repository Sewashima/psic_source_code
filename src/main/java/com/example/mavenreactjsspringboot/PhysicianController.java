package com.example.mavenreactjsspringboot;

import com.example.mavenreactjsspringboot.errorhandling.ResourceNotFoundException;
import com.example.mavenreactjsspringboot.models.ConsultationTime;
import com.example.mavenreactjsspringboot.models.Expertise;
import com.example.mavenreactjsspringboot.models.Physician;
import com.example.mavenreactjsspringboot.repository.ConsultationTimeRepository;
import com.example.mavenreactjsspringboot.repository.ExpertiseRepository;
import com.example.mavenreactjsspringboot.repository.PhysicianRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/physicians")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PhysicianController {

    public final Logger log = LoggerFactory.getLogger(PhysicianController.class);
    private PhysicianRepository physicianRepository;
    private ConsultationTimeRepository consultationTimeRepository;
    private ExpertiseRepository expertiseRepository;

    public PhysicianController(PhysicianRepository physicianRepository, ConsultationTimeRepository consultationTimeRepository, ExpertiseRepository expertiseRepository) {
        this.physicianRepository = physicianRepository;
        this.consultationTimeRepository = consultationTimeRepository;
        this.expertiseRepository = expertiseRepository;
    }

    @GetMapping
    public ResponseEntity<List<Physician>> getAllPhysicians() {
        log.info("Called physicians now...");
        return ResponseEntity.ok().body(physicianRepository.findAll());
    }

    @GetMapping("/{id}")
    public Physician getPhysicianById(@PathVariable Long id) {
        log.info("This is some test, ok?");
        return physicianRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("EditPhysician", "id", id));
    }

    @GetMapping("/expertise")
    public ResponseEntity<Iterable<Expertise>> getAllExpertise() {
//        String[] expertise = Stream.of(Expertise.values()).map(Expertise::name).toArray(String[]::new);
        Iterable<Expertise> expertiseList = expertiseRepository.findAll();
        log.info("expertise"+ expertiseList.toString());
        return ResponseEntity.ok().body(expertiseList);
    }

    @GetMapping("/expertise/{expertise}")
    public ResponseEntity<List<Physician>> getPhysiciansByExpertise(@PathVariable Long expertise) {
        return ResponseEntity.ok().body(physicianRepository.findByExpertiseId(expertise));
    }

    @GetMapping("/expertise/{id}")
    public ResponseEntity<List<Physician>> getPhysicianByExpertise(@RequestParam Long id) {
        log.info("Expertise ID: "+ id);
        return ResponseEntity.ok().body(physicianRepository.findByExpertiseId(id));
    }

    @GetMapping("/{id}/consultation-times")
    public ResponseEntity<List<ConsultationTime>> getPhysiciansConsultationTime(@PathVariable Long id) {
        return ResponseEntity.ok().body(consultationTimeRepository.findByPhysicianId(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Physician>> getPhysicianByName(@RequestParam String name) {
        log.info("name: "+ name);
        return ResponseEntity.ok().body(physicianRepository.findByNameIgnoreCase(name.toUpperCase()));
    }

    @PostMapping
    public Physician create(@Valid @RequestBody Physician physician) {
        log.info("physician body" + physician);
        return physicianRepository.save(physician);
    }

    @PatchMapping(value = "/{id}")
    public Physician update(@Valid @PathVariable Long id, @RequestBody Physician physicianDto) {
        log.info("physician update body " + physicianDto.toString());
        Optional<Physician> physician = physicianRepository.findById(id);
        if (physician.isPresent()) {
//            physicianDto.setFirstName();
//            physicianRepository.
//            return physicianRepository.save(physician);
        }
        return null;
    }

}
