package com.example.mavenreactjsspringboot.repository;

import com.example.mavenreactjsspringboot.models.TreatmentType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentTypeRepository extends JpaRepository<TreatmentType, Long> {
}
