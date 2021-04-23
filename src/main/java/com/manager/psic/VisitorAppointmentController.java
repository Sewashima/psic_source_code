package com.manager.psic;

import com.manager.psic.errorhandling.ResourceNotFoundException;
import com.manager.psic.models.VisitorAppointment;
import com.manager.psic.repository.VisitorAppointmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/visitorVisitorAppointments")
public class VisitorAppointmentController {

    private final Logger logger = LoggerFactory.getLogger(VisitorAppointmentController.class);
    private VisitorAppointmentRepository visitorAppointmentRepository;

    public VisitorAppointmentController(VisitorAppointmentRepository visitorAppointmentRepository) {
        this.visitorAppointmentRepository = visitorAppointmentRepository;
    }

    @GetMapping
    public ResponseEntity<List<VisitorAppointment>> getAllVisitorAppointments() {
        logger.info("VisitorAppointments called");
        return ResponseEntity.ok().body(visitorAppointmentRepository.findAll());
    }

    @GetMapping("/{id}")
    public VisitorAppointment getSingleVisitorAppointment(@PathVariable Long id) {
        return visitorAppointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("VisitorAppointment", "id", id));
    }

    @GetMapping("/physicians/{id}")
    public List<VisitorAppointment> getPhysicianVisitorAppointment(@PathVariable Long id) {
        logger.info(String.format("Getting visitorVisitorAppointments for EditPhysician %s", id));
        return visitorAppointmentRepository.findByPhysicianId(id);
    }

    @PostMapping
    public VisitorAppointment createVisitorAppointment(@Valid @RequestBody VisitorAppointment visitorVisitorAppointment) {
        logger.info("VisitorAppointment create called");
        String note = visitorVisitorAppointment.getNote();
        if (note.isEmpty()) {
            logger.debug("Note is empty and shouldn't be");
//            throw new ResourceNotFoundException()
        }
        logger.info(String.format("VisitorAppointment creation with %s", visitorVisitorAppointment.toString()));
        return visitorAppointmentRepository.save(visitorVisitorAppointment);
    }

    @PutMapping("/{id}/cancel")
    public Optional<VisitorAppointment> cancelVisitorAppointment(@PathVariable Long id) {
        logger.info("VisitorAppointment cancellation called");
        VisitorAppointment visitorVisitorAppointment = visitorAppointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("VisitorAppointment", "id", id));
        visitorVisitorAppointment.setStatus("cancelled");
        visitorAppointmentRepository.save(visitorVisitorAppointment);
        return visitorAppointmentRepository.findById(id);
    }

}
