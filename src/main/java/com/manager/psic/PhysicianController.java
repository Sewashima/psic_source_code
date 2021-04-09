package com.manager.psic;

import com.manager.psic.errorhandling.ResourceNotFoundException;
import com.manager.psic.models.ConsultationTime;
import com.manager.psic.models.Expertise;
import com.manager.psic.models.Physician;
import com.manager.psic.repository.ConsultationTimeRepository;
import com.manager.psic.repository.PhysicianRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/physicians")
public class PhysicianController {

    public final Logger log = LoggerFactory.getLogger(PhysicianController.class);
    private PhysicianRepository physicianRepository;
    private ConsultationTimeRepository consultationTimeRepository;

    public PhysicianController(PhysicianRepository physicianRepository, ConsultationTimeRepository consultationTimeRepository) {
        this.physicianRepository = physicianRepository;
        this.consultationTimeRepository = consultationTimeRepository;
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
    public ResponseEntity<String[]> getAllExpertise() {
        String[] expertise = Stream.of(Expertise.values()).map(Expertise::name).toArray(String[]::new);
        log.info("expertise"+ expertise.toString());
        return ResponseEntity.ok().body(expertise);
    }

    @GetMapping("/expertise/{expertise}")
    public ResponseEntity<List<Physician>> getPhysiciansByExpertise(@PathVariable String expertise) {
        return ResponseEntity.ok().body(physicianRepository.findByExpertise(expertise));
    }

    @GetMapping("/{id}/consultation-times")
    public ResponseEntity<List<ConsultationTime>> getPhysiciansConsultationTime(@PathVariable Long id) {
        return ResponseEntity.ok().body(consultationTimeRepository.findByPhysicianId(id));
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
