package com.manager.psic;

import com.manager.psic.models.TreatmentType;
import com.manager.psic.repository.TreatmentTypeRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/treatment-types")
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
