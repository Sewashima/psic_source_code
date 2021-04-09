package com.manager.psic;

import com.manager.psic.errorhandling.ResourceNotFoundException;
import com.manager.psic.models.Patient;
import com.manager.psic.repository.PatientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PatientController {

    public final Logger log = LoggerFactory.getLogger(PatientController.class);
    private PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients() {
        log.info("Called patients now...");
        return ResponseEntity.ok().body(patientRepository.findAll());
    }

    @GetMapping("/patients/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        log.info("This is some test, ok?");
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("EditPatient", "id", id));
    }

    @PostMapping(value = "/patients")
    public Patient create(@Valid @RequestBody Patient patient) {
        log.info("patient body" + patient);
        return patientRepository.save(patient);
    }

    @PatchMapping(value = "/patients/{id}")
    public Patient update(@Valid @PathVariable Long id, @RequestBody Patient patientDto) {
        log.info("patient update body " + patientDto.toString());
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
//            patientDto.setFirstName();
//            patientRepository.
//            return patientRepository.save(patient);
        }
        return null;
    }

}
