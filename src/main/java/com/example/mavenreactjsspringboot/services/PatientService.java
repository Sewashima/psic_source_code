package com.example.mavenreactjsspringboot.services;

import com.example.mavenreactjsspringboot.models.Patient;
import com.example.mavenreactjsspringboot.repository.PatientRepository;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    private PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient save(Patient patient) {
        return patientRepository.save(patient);
    }

}
