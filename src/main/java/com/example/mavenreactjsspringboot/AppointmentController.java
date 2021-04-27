package com.example.mavenreactjsspringboot;

import com.example.mavenreactjsspringboot.errorhandling.ResourceNotFoundException;
import com.example.mavenreactjsspringboot.models.Appointment;
import com.example.mavenreactjsspringboot.repository.AppointmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AppointmentController {

    private final Logger logger = LoggerFactory.getLogger(AppointmentController.class);
    private AppointmentRepository appointmentRepository;

    public AppointmentController(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        logger.info("Appointments called");
        return ResponseEntity.ok().body(appointmentRepository.findAll());
    }

    @GetMapping("/{id}")
    public Appointment getSingleAppointment(@PathVariable Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));
    }

    @GetMapping("/physicians/{id}")
    public List<Appointment> getPhysicianAppointment(@PathVariable Long id) {
        logger.info(String.format("Getting appointments for EditPhysician %s", id));
        return appointmentRepository.findByPhysicianId(id);
    }

    @PostMapping
    public Appointment createAppointment(@Valid @RequestBody Appointment appointment) {
        logger.info("Appointment create called");
        String note = appointment.getNote();
        if (note.isEmpty()) {
            logger.debug("Note is empty and shouldn't be");
//            throw new ResourceNotFoundException()
        }
        logger.info(String.format("Appointment creation with %s", appointment.toString()));
        return appointmentRepository.save(appointment);
    }

    @PutMapping("/{id}/cancel")
    public Optional<Appointment> cancelAppointment(@PathVariable Long id) {
        logger.info("Appointment cancellation called");
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));
        appointment.setStatus("cancelled");
        appointmentRepository.save(appointment);
        return appointmentRepository.findById(id);
    }

    /*@PostMapping("/appointments")
    private ResponseEntity<Appointment> createAppointment(Appointment appointment) {
//        Appointment appointment1 = new Appointment(appointment.getNote(), appointment.getRoom());
        Appointment newAppointment = appointmentRepository.save(appointment);
        if (newAppointment != null) {
            return ResponseEntity.ok().body(newAppointment);
        }
        return new ResponseEntity<Appointment>.noContent();
    }*/

}
