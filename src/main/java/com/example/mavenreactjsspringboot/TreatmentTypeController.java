package com.example.mavenreactjsspringboot;

import com.example.mavenreactjsspringboot.models.TreatmentType;
import com.example.mavenreactjsspringboot.repository.TreatmentTypeRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/treatment-types")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TreatmentTypeController {

    private TreatmentTypeRepository treatmentTypeRepository;

    public TreatmentTypeController(TreatmentTypeRepository treatmentTypeRepository) {
        this.treatmentTypeRepository = treatmentTypeRepository;
    }

    @GetMapping
    public List<TreatmentType> getAll() {
        return treatmentTypeRepository.findAll();
    }

    @PostMapping
    public TreatmentType save(@Valid @RequestBody TreatmentType treatmentType) {
        return this.treatmentTypeRepository.save(treatmentType);
    }

}
