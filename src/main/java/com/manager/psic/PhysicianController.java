package com.manager.psic;

import com.manager.psic.errorhandling.ResourceNotFoundException;
import com.manager.psic.models.Physician;
import com.manager.psic.repository.PhysicianRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PhysicianController {

    public final Logger log = LoggerFactory.getLogger(PhysicianController.class);
    private PhysicianRepository physicianRepository;

    public PhysicianController(PhysicianRepository physicianRepository) {
        this.physicianRepository = physicianRepository;
    }

    @GetMapping("/physicians")
    public ResponseEntity<List<Physician>> getAllPhysicians() {
        log.info("Called physicians now...");
        return ResponseEntity.ok().body(physicianRepository.findAll());
    }

    @GetMapping("/physicians/{id}")
    public Physician getPhysicianById(@PathVariable Long id) {
        log.info("This is some test, ok?");
        return physicianRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("EditPhysician", "id", id));
    }

    @PostMapping(value = "/physicians")
    public Physician create(@Valid @RequestBody Physician physician) {
        log.info("physician body" + physician);
        return physicianRepository.save(physician);
    }

    @PatchMapping(value = "/physicians/{id}")
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
