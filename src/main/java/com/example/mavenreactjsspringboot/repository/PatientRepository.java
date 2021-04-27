package com.example.mavenreactjsspringboot.repository;

import com.example.mavenreactjsspringboot.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
