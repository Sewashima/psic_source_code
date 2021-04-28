package com.example.mavenreactjsspringboot;

import com.example.mavenreactjsspringboot.errorhandling.ResourceNotFoundException;
import com.example.mavenreactjsspringboot.models.Expertise;
import com.example.mavenreactjsspringboot.repository.ExpertiseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/expertise")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ExpertiseController {

    public final Logger log = LoggerFactory.getLogger(ExpertiseController.class);
    private ExpertiseRepository expertiseRepository;

    public ExpertiseController(ExpertiseRepository expertiseRepository) {
        this.expertiseRepository = expertiseRepository;
    }

    @GetMapping
    public ResponseEntity<Iterable<Expertise>> getAll() {
        log.info("Called rooms now...");
        return ResponseEntity.ok().body(expertiseRepository.findAll());
    }

    @GetMapping("/{id}")
    public Expertise getRoomById(@PathVariable Long id) {
        log.info("This is some test, ok?");
        return expertiseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RoomById", "id", id));
    }

    @PostMapping
    public Expertise create(@Valid @RequestBody Expertise expertiseDto) {
        log.info("physician body" + expertiseDto);
        return expertiseRepository.save(expertiseDto);
    }
}
